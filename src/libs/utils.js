import RNFS from 'react-native-fs';
import bitcoin from 'bitcoinjs-lib'
import bitcore from 'bitcore-lib-react-native'

function getPublicKey(seed){
    const s = bitcore.HDPrivateKey.fromSeed(seed, "regtest");
    console.log(s);
    const d = s.derive("m/0'/0/0");
    const publickey = d.publicKey;
    return publickey.toString('hex')
}

async function ReadDeviceStore(callback){
    var path = RNFS.DocumentDirectoryPath + '/carewallet.keystore';
    RNFS.readFile(path, 'utf8')
    .then((success) => {
        console.log('FILE READ!', success);
        callback(null, success);
    })
    .catch((err) => {
        console.log(err.message);
        callback(err);
    });
}

async function UpdateDeviceStore(data, callback){
    var path = RNFS.DocumentDirectoryPath + '/carewallet.keystore';
    RNFS.writeFile(path, data, 'utf8')
    .then((success) => {
        console.log('FILE WRITTEN!', success);
        callback(null, success);
    })
    .catch((err) => {
        console.log(err.message);
        callback(err);
    });
}

const getFinalScripts2 = (
    inputIndex,//: number,
    input,//: PsbtInput,
    script,//: Buffer,
    isSegwit,//: boolean,
    isP2SH,//: boolean,
    isP2WSH,//: boolean,
) => {
    // Step 1: Check to make sure the meaningful script matches what you expect.
    const decompiled = bitcoin.script.decompile(script);
    // Checking if first OP is OP_IF... should do better check in production!
    // You may even want to check the public keys in the script against a
    // whitelist depending on the circumstances!!!
    // You also want to check the contents of the input to see if you have enough
    // info to actually construct the scriptSig and Witnesses.
    if (!decompiled || decompiled[0] !== bitcoin.opcodes.OP_IF) {
        throw new Error(`Can not finalize input #${inputIndex} not starting with OP_IF`);
    }
    // Step 2: Create final scripts
    let payment = {
        network: regtest,
        output: script,
        // This logic should be more strict and make sure the pubkeys in the
        // meaningful script are the ones signing in the PSBT etc.
        input: bitcoin.script.compile([
            bitcoin.opcodes.OP_0,// because of the famous multisig bug
            input.partialSig[0].signature,
            input.partialSig[1].signature,
            bitcoin.opcodes.OP_TRUE,
        ]),
    };
    if (isP2WSH && isSegwit)
        payment = bitcoin.payments.p2wsh({
            network: regtest,
            redeem: payment,
        });
    if (isP2SH)
        payment = bitcoin.payments.p2sh({
            network: regtest,
            redeem: payment,
        });
    // console.log ("lockc: bitcoin.script.toASM(decompiled) \nunlock:  bitcoin.script.toASM(bitcoin.script.decompile(payment.redeem.input)) \nuse https://github.com/crm416/script")
    function witnessStackToScriptWitness(witness) {
        let buffer = Buffer.allocUnsafe(0);

        function writeSlice(slice) {
            buffer = Buffer.concat([buffer, Buffer.from(slice)]);
        }

        function writeVarInt(i) {
            const currentLen = buffer.length;
            const varintLen = varuint.encodingLength(i);

            buffer = Buffer.concat([buffer, Buffer.allocUnsafe(varintLen)]);
            varuint.encode(i, buffer, currentLen);
        }

        function writeVarSlice(slice) {
            writeVarInt(slice.length);
            writeSlice(slice);
        }

        function writeVector(vector) {
            writeVarInt(vector.length);
            vector.forEach(writeVarSlice);
        }

        writeVector(witness);

        return buffer;
    }

    return {
        finalScriptSig: payment.input,
        finalScriptWitness:
            payment.witness && payment.witness.length > 0
                ? witnessStackToScriptWitness(payment.witness)
                : undefined,
    };
}

module.exports = {
    ReadDeviceStore,
    UpdateDeviceStore,
    getPublicKey,
    getFinalScripts2
}