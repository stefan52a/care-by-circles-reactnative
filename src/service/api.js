import {
    AsyncStorage,
    Platform,
    Alert
} from 'react-native';
import * as async from 'async';
import Cache from '../utils/cache'

const backendURL = 'https://carebycircle.com/api/';
//const API_KEY = "CARECIRCLE_API_KEY_1.0";
module.exports = {
    GiveTxIdToOracle(id, txId, instanceCircles, cb) {
        Cache.currentBackend_URL = backendURL;
        this.baseApi('GiveTxIdToOracle', 'POST', { id, txId, instanceCircles, contract }, cb);
    },
    oraclePleaseSignTx(AliceId, saltAlice, AliceNewPubkey, circleId, addressofUTXO, pubkeyInUTXO, BobPubkey, BobId, saltBob, contract, cb) {
        Cache.currentBackend_URL = backendURL;
        this.baseApi('oraclePleaseSignTx', 'POST', { AliceId, saltAlice, pubkeyInUTXO, circleId, addressofUTXO, AliceNewPubkey, BobPubkey, BobId, saltBob, contract}, cb);
    },
    broadcastToRegtest(psbtToBroadcast, cb) {
        Cache.currentBackend_URL = backendURL;
        this.baseApi('broadcastToRegtest', 'POST', { psbtToBroadcast }, cb);
    },
    oracleGetAirdrop(id, pubkey, salt, cb) {
        Cache.currentBackend_URL = backendURL;
        this.baseApi('oracleGetAirdrop', 'POST', { AliceId:id, AlicePubkey:pubkey, saltAlice: salt }, cb);
    },
    async baseApi(sub_url, method, json_data, cb) {
        try {
            let request = {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
            }
            if (method == 'POST' || method == 'PUT') {
                //json_data['api_key'] = API_KEY;
                request['body'] = JSON.stringify(json_data);
            }

            let response = await fetch(Cache.currentBackend_URL + sub_url, request);
            let responseJson = await response.json();
            console.log('responseJson', responseJson);
            if (response.status == 200) {
                if (responseJson.error !== "none"){
                  cb(responseJson.error, responseJson)
                } else {
                  cb(null, responseJson);
                }
            } else {
                cb(responseJson);
            }
        } catch (error) {
            cb(error)
        }
    }
}
