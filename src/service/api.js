import {
    AsyncStorage,
    Platform,
    Alert
} from 'react-native';
import * as async from 'async';

const backendURL = 'https://carebycircle.com/api/';
//const API_KEY = "CARECIRCLE_API_KEY_1.0";
module.exports = {
    GiveTxIdToOracle(id, txId, instanceCircles, cb) {
        Cache.currentBackend_URL = backendURL;
        this.baseApi('GiveTxIdToOracle', 'POST', { id, txId, instanceCircles, contract }, cb);
    },
    oraclePleaseSignTx(id, circleId, pubkeyInUTXO, newPubkeyId, pubkeyNewId, newId, contract, cb) {
        Cache.currentBackend_URL = backendURL;
        this.baseApi('oraclePleaseSignTx', 'POST', { id, circleId, pubkeyInUTXO, newPubkeyId, pubkeyNewId, newId, contract }, cb);
    },
    oracleGetAirdrop(id, pubkey, cb) {
        Cache.currentBackend_URL = backendURL;
        this.baseApi('oracleGetAirdrop', 'POST', { id:id, pubkey:pubkey }, cb);
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
}
