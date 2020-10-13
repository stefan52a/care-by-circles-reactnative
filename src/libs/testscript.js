import bitcoin from 'react-native-bitcoinjs-lib'
import bip68 from 'bip68';
import broadcastTx from './cpwallet'
export const inhertianceContract = (contract) => {
    const { days, ownerPrivateKeyWIF, heirPrivateKeyWIF, networkChoice, addressType } = contract;
    // shortcuts
    const network = bitcoin.networks[networkChoice];
    const op = bitcoin.opcodes;
    const encode = bitcoin.script.number.encode;
  
    // get key pair object from WIF private keys
    const ownerKeys = bitcoin.ECPair.fromWIF(ownerPrivateKeyWIF, network);
    const heirKeys = bitcoin.ECPair.fromWIF(heirPrivateKeyWIF, network);
  
    const relLockTime = bip68.encode({
      // must be multiple of 512 seconds (see BIP68)
      seconds: Math.floor(days * 24 * 60 * 60 / 512) * 512
    });
  
    // create contract logic
    // witness script and redeem script same declaration
    /* eslint-disable */
    const script = bitcoin.script.compile([
  
      op.OP_IF, // spender submits TRUE (owner branch)
  
        // check submitted signature vs this public key
        // if a match, puts TRUE on top of stack, otherwise FALSE
      ownerKeys.publicKey, op.OP_CHECKSIG,
  
      op.OP_ELSE, // spender submits FALSE (heir branch)
  
        // abort if still locked, returns locktime
        encode(relLockTime), op.OP_CHECKSEQUENCEVERIFY,
        // clear locktime from stack
        op.OP_DROP,
        // check submitted signature vs this public key
        // if a match, puts TRUE on top of stack, otherwise FALSE
        heirKeys.publicKey, op.OP_CHECKSIG,
  
      op.OP_ENDIF
  
      // if TRUE on top of stack, tx is valid, otherwise fails
    ]);
    /* eslint-enable */
  
    // calculate the p2wsh & p2sh address from this time version of script
    const p2wsh = bitcoin.payments.p2wsh({
      redeem: {
        output: script,
        network
      },
      network
    });
  
    const p2sh = bitcoin.payments.p2sh({
      redeem: {
        output: script,
        network
      },
      network
    });
  
    const backupP2WSH = {
      contract: 'inheritance timer',
      addressType: addressType,
      networkChoice: networkChoice,
      contractSummary: 'IF <ownerPublicKey> CHECKSIG ELSE <relativeLockTime> CHECKSEQUENCEVERIFY DROP <heirPublicKey> CHECKSIG ENDIF',
      ownerPrivateKeyWIF: ownerPrivateKeyWIF,
      heirPrivateKeyWIF: heirPrivateKeyWIF,
      witnessScriptHex: script.toString('hex'),
      witnessScriptHash: bitcoin.crypto.sha256(script).toString('hex'),
      relativeLockTime: relLockTime.toString(),
      currentDate: new Date().toString(),
      daysAfterConfirmForUnlock: days,
      address: p2wsh.address
    };
  
    const backupP2SH = {
      contract: 'inheritance timer',
      network: networkChoice,
      addressType: addressType,
      contractSummary: 'IF <ownerPublicKey> CHECKSIG ELSE <relativeLockTime> CHECKSEQUENCEVERIFY DROP <heirPublicKey> CHECKSIG ENDIF',
      ownerPrivateKeyWIF: ownerPrivateKeyWIF,
      heirPrivateKeyWIF: heirPrivateKeyWIF,
      redeemScriptHex: script.toString('hex'),
      redeemScriptHash: bitcoin.crypto.sha256(script).toString('hex'),
      relativeLockTime: relLockTime.toString(),
      currentDate: new Date().toString(),
      daysAfterConfirmForUnlock: days,
      address: p2sh.address
    };
  
    if (addressType === 'p2wsh') {
      return backupP2WSH;
    } else if (addressType === 'p2sh') {
      return backupP2SH;
    } else {
      return undefined;
    }
};


export const sendTx = (backup) => {
    const op = bitcoin.opcodes; // abreviation for op codes
    const network = bitcoin.networks[contract.networkChoice]; // network choice
    const hashType = bitcoin.Transaction.SIGHASH_ALL; // regular signature, signs all

    const ownerKeys = bitcoin.ECPair.fromWIF(backup.ownerPrivateKeyWIF, network);
    const scriptHex = contract.scriptHex;
    const spending = contract.spending; // to include or not the spending utxo

    // amounts conversions to satoshi
    const satToAmount = Math.floor(parseFloat(backup.toAmount) * 1e8);
    const satChangeAmount = Math.floor(parseFloat(backup.changeAmount) * 1e8);

    // redeemScript is referenced as a hash in an unspent p2sh output (scriptPubKey)
    // and requires to provide it to run the script now
    // have to provide redeemScript (p2sh) or witnessScript (p2wsh) to spend
    const redeemScript = Buffer.from(scriptHex, 'hex');
    const witnessScript = redeemScript; // for now no difference

    // get current time
    // const now = Math.floor(Date.now() / 1000);
    // console.log('Current time data:', now);

    // start tx assemble
    const buildTx = new bitcoin.TransactionBuilder(network);

    // adding contract's chosen unspent output for input
    Object.keys(contract.selectedUTXO).forEach(utxo => {
      const txid = utxo.split('-')[0];
      const vout = utxo.split('-')[1];

      // buffer is written as little endian so reverse the hex
      buildTx.addInput(
        Buffer.from(txid.match(/../g).reverse().join(''), 'hex'),
        parseInt(vout, 10),
        0xfffffffe
      );
    });

    // adding desired destination output if spending selected
    if (spending && (satToAmount !== 0)) {
      buildTx.addOutput(backup.toAddress, satToAmount);
    }
    // adding change output (if user allowed the change output)
    if (contract.change) {
      buildTx.addOutput(backup.changeAddress, satChangeAmount);
    }

    // pre-build tx so it can be signed
    const tx = buildTx.buildIncomplete();

    // for each output have to submit all necessary information
    // schnorr soft fork later would possibly allow signing once
    tx.ins.forEach((input, index) => {
      // index is the index of this specific input (existing utxo) in this transaction
      const txid = input.hash.toString('hex').match(/../g).reverse().join(''); // this is this input's txid
      const vout = input.index.toString(); // this is this input's vout

      // segwit requires input amount so have to match this input's
      // txid-vout to key inside selected inputs to find value
      const satFromAmount = Math.floor(
        parseFloat(contract.selectedUTXO[txid + '-' + vout]) * 1e8
      );

      // hash the tx so you can sign - p2wsh version (+ requires coin value of input signed)
      const hashForSigWitness = tx.hashForWitnessV0(index, witnessScript, satFromAmount, hashType);
      // and p2sh version
      const hashForSig = tx.hashForSignature(index, redeemScript, hashType);

      // create the signatures for above tx hashes - p2wsh version
      const ownerSigWitness = bitcoin.script.signature.encode(
        ownerKeys.sign(hashForSigWitness),
        hashType
      );
      // and p2sh version
      const ownerSig = bitcoin.script.signature.encode(
        ownerKeys.sign(hashForSig),
        hashType
      );

      // generate scriptSigs = input stack (like signatures) + the redeemScript
      // scriptSig provides data to the locked output's scriptPubKey
      // scriptSig ~ witness and redeemScript ~ witnessScript
      // witness = initial witness stack (variables) + witnessScript
      // stack fed reverse with bottom item ending up on top of received stack

      // p2wsh version
      const witnessStackOwnerBranch = bitcoin.payments.p2wsh({
        redeem: {
          input: bitcoin.script.compile([
            ownerSigWitness, // submitting sig for comparison w/ pub key
            op.OP_TRUE // submit TRUE so it selects first branch of IF statement
          ]),
          output: witnessScript
        },
        network
      }).witness;

      // p2sh version
      const scriptStackOwnerBranch = bitcoin.payments.p2sh({
        redeem: {
          input: bitcoin.script.compile([
            ownerSig, // submitting sig for comparison w/ pub key
            op.OP_TRUE // submit TRUE so it selects first branch of IF statement
          ]),
          output: redeemScript
        }
      }).input;

      // adding the scriptSig or witness stack to the transaction
      if (contract.addressType === 'p2wsh') {
        tx.setWitness(index, witnessStackOwnerBranch);
      } else if (contract.addressType === 'p2sh') {
        tx.setInputScript(index, scriptStackOwnerBranch);
      } else {
        throw new Error('my errors: source address type unknown');
      }

    })
    const { network } = backup;
    broadcastTx(network, tx.hex(), function(response){
        console.log('response:', response);
    });   
}


const contract = {
    "contract": "inheritance timer",
    "addressType": "p2wsh",
    "networkChoice": "testnet",
    "contractSummary": "IF <ownerPublicKey> CHECKSIG ELSE <relativeLockTime> CHECKSEQUENCEVERIFY DROP <heirPublicKey> CHECKSIG ENDIF",
    "ownerPrivateKeyWIF": "cRSPWnRdRoK5YJge1U3iTHqXVG8Yanhh3W3iZ2h2JkzJjAoEbUHp",
    "heirPrivateKeyWIF": "cPrzyRgVmXhDyWQsjowAgf6GBXDLGq991r71WQZEBDS5mredugWm",
    "witnessScriptHex": "632103c7020bc465e4b6ee4d7ef1c80b227d9eb18d4772271f9f2168196db6dea2e504ac67034b0340b2752102fdc1dc64d126b1b0d9ea0c53c7f73e7c11920ad29fd43e015511fc76d4cd532bac68",
    "witnessScriptHash": "e8980678ddb61cc388ae1400843c98f0a31a7b9c6c6c369f58918fa77d9a2718",
    "relativeLockTime": "4195147",
    "currentDate": "Tue Oct 13 2020 17:32:08 GMT+0800 (China Standard Time)",
    "daysAfterConfirmForUnlock": "5",
    "address": "tb1qazvqv7xakcwv8z9wzsqgg0yc7z3357uud3krd86cjx86wlv6yuvqvj9vpk"
}

const backup = inhertianceContract(contract);
sendTx(backup);
