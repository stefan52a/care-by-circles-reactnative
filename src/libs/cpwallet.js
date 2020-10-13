import bitcoinjs from 'react-native-bitcoinjs-lib'
import bitcore from 'bitcore-lib-react-native'
const TIME_OUT = 10000;

const WALLET_SERVER_INFO = {
    mainnet: {
        host: 'public.coindaddy.io',
        port: 4001,                 
        user: 'rpc',                
        pass: '1234',               
        ssl: true,
        api_host: 'xchain.io',
        api_ssl: true
    },
    testnet: {
        host: 'public.coindaddy.io',
        port: 14001,                
        user: 'rpc',                
        pass: '1234',               
        ssl: true,
        api_host: 'testnet.xchain.io',
        api_ssl: true
    }
}

function getXChainAPI( network ){
    var name = (network==2||network=='testnet') ? 'testnet' : 'mainnet',
        o    = WALLET_SERVER_INFO[name],
        url  = ((o.api_ssl) ? 'https' : 'http') + '://' + o.api_host;
    return url;
}

async function baseApi(url, method, json_data, auth, cb) {
    try {        
        let request = {
                method: 'POST',
                headers: {                    
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Authorization': 'Basic ' + auth, 
                },
        }
        if (method == 'POST' || method == 'PUT') {
            json_data['api_key'] = API_KEY;
            request['body'] = JSON.stringify(json_data);
        }

        let response = await fetch(url, request);
        let responseJson = await response.json();

        if (response.status == 200) {
            if (responseJson.status == 'failed'){
              cb(responseJson.message, responseJson)
            } else {
              cb(null, responseJson);
            }
        } else {
            cb(responseJson.message);
        }
    } catch (error) {
        cb(error)
    }
}

function cpRequest(network, data, callback){
    var net  = (network=='testnet') ? 'testnet' : 'mainnet',
        info = WALLET_SERVER_INFO[net],
        url  = ((info.ssl) ? 'https' : 'http') + '://' + info.host + ':' + info.port + '/api/',
        auth = $.base64.btoa(info.user + ':' + info.pass);

    return baseApi(url, "POST", data, auth, callback)
}

function createSend(network, source, destination, memo, memo_is_hex, asset, quantity, fee, callback){    
    var data = {
       method: "create_send",
       params: {
            source: source,
            destination: destination,
            asset: asset,
            quantity: parseInt(quantity),
            allow_unconfirmed_inputs: true,
            fee: parseInt(fee)
        },
        jsonrpc: "2.0",
        id: 0
    };
    if(memo)
        data.params.memo = memo;
    if(memo_is_hex)
        data.params.memo_is_hex = true;
    cpRequest(network, data, function(o){
        if(typeof callback === 'function')
            callback(o);
    });
}

function createMultiSend(network, source, destination, memo, memo_is_hex, asset, quantity, fee, txid, callback){
    // console.log('createMultiSend=',network, source, destination, memo, memo_is_hex, asset, quantity, fee, p2sh_pretx_txid);
    var data = {
       method: "create_send",
       params: {
            source: source,
            destination: destination,
            asset: asset,
            quantity: quantity,
            memo: memo,
            memo_is_hex: memo_is_hex,
            fee: parseInt(fee),
            allow_unconfirmed_inputs: true,
            encoding: "p2sh"
        },
        jsonrpc: "2.0",
        id: 0
    };
    if(txid)
        data.params.p2sh_pretx_txid = txid;
    cpRequest(network, data, function(o){
        if(typeof callback === 'function')
            callback(o);
    });
}

// Handle creating issuance transaction
function createIssuance(network, source, asset, quantity, divisible, description, destination, fee, callback){
    // console.log('createIssuance=', network, source, asset, quantity, divisible, description, destination, fee, callback);
    var data = {
       method: "create_issuance",
       params: {
            source: source,
            asset: asset,
            quantity: parseInt(quantity),
            divisible: (divisible) ? 1 : 0,
            description:  (description) ? description : null,
            transfer_destination: (destination) ? destination : null,
            fee: parseInt(fee),
            allow_unconfirmed_inputs: true
        },
        jsonrpc: "2.0",
        id: 0
    };
    cpRequest(network, data, function(o){
        if(typeof callback === 'function')
            callback(o);
    });
}

// Handle creating broadcast transaction
function createBroadcast(network, source, text, value, feed_fee, timestamp, fee, callback){
    // console.log('createBroadcast=', network, source, text, value, feed_fee, timestamp, fee, callback);
    var data = {
       method: "create_broadcast",
       params: {
            source: source,
            text: text,
            value: value,
            fee_fraction: feed_fee,
            timestamp: timestamp,
            fee: parseInt(fee),
            allow_unconfirmed_inputs: true
        },
        jsonrpc: "2.0",
        id: 0
    };
    cpRequest(network, data, function(o){
        if(typeof callback === 'function')
            callback(o);
    });
}

function signTransaction(network, source, destination, unsignedTx, callback){
    var net      = (network=='testnet') ? 'testnet' : 'mainnet', 
    netName  = (network=='testnet') ? 'testnet' : 'livenet', // bitcore
    callback = (typeof callback === 'function') ? callback : false,
    privKey  = getPrivateKey(net, source);
    // Set the appropriate network and get key
    NETWORK   = bc.Networks[netName];
    //var cwKey = new CWPrivateKey(privKey);
    const priv = bitcore.PrivateKey(privKey, NETWORK);
    
    // Convert destination to array if not already
    if(typeof(destination)==='string')
        destination = [destination];
    // Callback to processes response from signRawTransaction()
    var cb = function(e, signedTx){
        if(e)
            console.log('error =',e);
        if(callback)
            callback(signedTx);
    }
    // Check if any of the addresses are bech32
    var sourceIsBech32 = isBech32(source);
    var hasDestBech32  = destination.reduce((p, x) => p || isBech32(x), false);
    var hasAnyBech32   = hasDestBech32 || sourceIsBech32;
    // Handle signing bech32 addresses
    if(hasAnyBech32){
        // Use bitcoinjs implementation
        var tx      = bitcoinjs.Transaction.fromHex(unsignedTx),
            netName = (net=='testnet') ? 'testnet' : 'bitcoin', // bitcoinjs
            network = bitcoinjs.networks[netName],
            txb     = new bitcoinjs.TransactionBuilder(network),
            keypair = bitcoinjs.ECPair.fromWIF(priv.toWIF(), network);
        // Callback to modify transaction after we get a list of UTXOs back
        var utxoCb = function(data){
            var utxoMap = {};
            data.forEach(utxo => {
                utxoMap[utxo.txId] = utxo;
            });
            if(sourceIsBech32){
                var input = bitcoinjs.payments.p2wpkh({ pubkey: keypair.publicKey, network: network });
            } else {
                var input = bitcoinjs.payments.p2pkh({ pubkey: keypair.publicKey, network: network });
            }
            // Handle adding inputs
            for(var i=0; i < tx.ins.length; i++){
                // We get reversed tx hashes somehow after parsing
                var txhash = tx.ins[i].hash.reverse().toString('hex');
                var prev = utxoMap[txhash];
                txb.addInput(tx.ins[i].hash.toString('hex'), prev.vout, null, input.output);
            }
            // Handle adding outputs
            for(var i=0; i < tx.outs.length; i++){
                var txout = tx.outs[i];
                txb.addOutput(txout.script, txout.value);
            }
            // var signedHex = txb.build().toHex();
            // console.log('signedHex before=',signedHex);                
            // Loop through the inputs and sign
            for (var i=0; i < tx.ins.length; i++) {
                var txhash = tx.ins[i].hash.toString('hex');
                if(txhash in utxoMap){
                    var prev = utxoMap[txhash];
                    var redeemScript = undefined;
                    /*if (hasDestBech32) {
                    redeemScript =  // Future support for P2WSH
                    }*/
                    // Math.floor is less than ideal in this scenario, we need to get the raw satoshi value in the utxo map
                    txb.sign(i, keypair, null, null, prev.value, redeemScript);
                } else {
                    // Throw error that we couldn't sign tx
                    console.log("Failed to sign transaction: " + "Incomplete SegWit inputs");
                    return;
                }
            }
            var signedHex = txb.build().toHex();
            cb(null, signedHex);
        }
        // Get list of utxo
        getUTXOs(net, source, utxoCb);
    } else {
        // Sign using bitcore
        bitcore.signRawTransaction(unsignedTx, priv, cb);
    }
}

// Handle getting a list of raw UTXOs for a given address
function getUTXOs(network, address, callback){
    var utxos = [];
    // Make call to indexd to get list of UTXOs
    const XCHAIN_API = getXChainAPI(network);
    baseApi(XCHAIN_API +  '/api/utxos/' + address, 'get', {}, callback);
}

function broadcastTx(network, signedTx, callback){
    var net  = (network=='testnet') ? 'BTCTEST' : 'BTC',
        host = (network=='testnet') ? 'testnet.xchain.io' : 'xchain.io';
    // First try to broadcast using the XChain API

    baseApi('https://' + host +  '/api/send_tx', {tx_hex: signedTx}, '', function(data) {
        if(o.responseJSON.tx_hash){
            var txid = o.responseJSON.tx_hash;
            if(callback)
                callback(null, txid);
            if(txid)
                console.log('Broadcasted transaction hash=',txid);
        } else {
            // If the request to XChain API failed, fallback to chain.so API
            baseApi('https://chain.so/api/v2/send_tx/' + net, "POST", { 
                tx_hex: signedTx 
            }, function(o) {
                if(o.responseJSON.data && o.responseJSON.data.txid){
                    var txid = o.responseJSON.data.txid;
                    if(callback)
                        callback(null, txid);
                    if(txid)
                        console.log('Broadcast transaction tx_hash=',txid);
                } else {
                    callback('Error while trying to broadcast signed transaction');                    
                }
            })          
        }
    })   
}

module.exports = {
    cpRequest,    
    broadcastTx,
    signTransaction,
    createBroadcast,
    createIssuance,
    createMultiSend,
    createSend
}