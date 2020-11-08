import RNFS from 'react-native-fs';
import bitcoinjs from 'react-native-bitcoinjs-lib'
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

module.exports = {
    ReadDeviceStore,
    UpdateDeviceStore,
    getPublicKey
}