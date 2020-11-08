import React, { useState, useEffect } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient'
import images from '../config/images';
import bip39 from 'react-native-bip39'
import CryptoJS, { enc } from "react-native-crypto-js";
import {UpdateDeviceStore, ReadDeviceStore, getPublicKey} from '../libs/utils'
import Cache from '../utils/cache'
import API from '../service/api'
import RNSimData from 'react-native-sim-data'
import { PermissionsAndroid } from 'react-native';

AntDesign.loadFont()
const myCenterImage = require('../../assets/first.png');
const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
var extHeight = (screenHeight - 650) / 15

function makeSalt(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const GenerateWallet = (props) => {
    const option = props.option;
    const [pin, setPin] = useState("");
    const [confirm_pin, setConfirmPin] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const requestPhonePermission = async () => {
        try {
          const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
            {
              'title': 'READ_PHONE_STATE Permission',
              'message': 'READ_PHONE_STATE needs access to your device ' +
                    'so you can take device imei.'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {            
            const phonenumber =  RNSimData.getTelephoneNumber() //'+31-6-233787929'  // get phone number;
            setPhoneNumber(phonenumber);            
          } else {
            Alert.alert("App permission denied!")
          }
        } catch (err) {
          console.warn(err)
        }
    }

    const chck = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
    if (chck  === true) {        
        const phonenumber =  RNSimData.getTelephoneNumber() //'+31-6-233787929'  // get phone number;
        setPhoneNumber(phonenumber);
    } else {
      requestPhonePermission();
    }



    const clickNext = async () => {
        if (option === "create"){
            if (pin !== confirm_pin) {
                alert('pins do not match.');
                return;
            }            
            
            const passphrase = await bip39.generateMnemonic(); 
            console.log('passphrase', passphrase);
            //const wallet = bip39.mnemonicToEntropy(passphrase);
            var seed = await bip39.mnemonicToSeedHex(passphrase)         
            var salt = makeSalt(64);
            const publickey = getPublicKey(seed);       
            console.log(JSON.stringify(data));
            let phone = phonenumber? phonenumber : RNSimData.getTelephoneNumber() //'+31-6-233787929'  // get phone number;
            
            const qrcode = {
                publickey:  publickey,
                salt: salt
            }
            const qrcode_string = JSON.stringify(qrcode);
            const data = {
                id: phone,
                pin: pin,
                wallet: seed,
                publickey: publickey,
                salt: salt,
                qrcode_string
            }            
            
            API.oracleGetAirdrop(phone, publickey, salt, function (error, response){                    
                console.log('-------  oracleGetAirdrop ------------');                    
                console.log(error, response);
                if (error == null){
                    data.contract = response.contract
                    data.Circle = response.Circle                    
                    data.newUTXO = response.addressOfUTXO
                    //data.satoshi = response.satoshiAliceLeft
                    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), pin).toString();
                    UpdateDeviceStore(encrypted, function(err, data){
                        console.log(err, data);
                        Cache.data = data;                                 
                        Actions.Nav({ pin: pin });
                    })                    
                } else {
                    alert(`oracleGetAirdrop error: ${error.error}`)
                }
            })
        } else {
            ReadDeviceStore(function(err, data){
                console.log(err, data);
                if (err == null){
                    var decrypted = CryptoJS.AES.decrypt(data, pin).toString(CryptoJS.enc.Utf8);                    
                    decrypted_json = JSON.parse(decrypted);       
                    Cache.data = decrypted_json;
                    console.log(decrypted_json);                    
                    Actions.Nav({ pin: pin });                              
                } else {
                    alert('Incorrect pin! Please sign up first!');
                    return;
                }                
            })
        }               
        // const s = bitcore.HDPrivateKey.fromSeed(seed, "regtest");
        // console.log(s);
        // const d = s.derive("m/0'/0/0");
        // const publickey = d.publicKey;

        // console.log('publickey', publickey.toString('hex'));        
        // const address = bitcore.Address(publickey, "regtest").toString();
        // console.log('address', address);
        //
    }

    return (
        <LinearGradient
            colors={['#ED1C24', '#1B1464']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Image source={option === 'create' ? images.userKey: images.group} style={[styles.group, option === 'create' && { width: screenWidth/1.96}]} />
            
            <View style={styles.btnGroup}>
                <TextInput style={styles.textInput} value={pin} onChangeText={text => setPin(text)} secureTextEntry={true} placeholder="ENTER PIN" keyboardType='numeric' />
                {option === 'create' && <TextInput style={styles.textInput} value={confirm_pin} onChangeText={text => setConfirmPin(text)} secureTextEntry={true} placeholder="CONFIRM PIN" keyboardType='numeric' />}
                
                <TouchableOpacity onPress={() => clickNext()} style={styles.button}>
                    <Text style={styles.title}>{option === 'create' ? 'Generate' : 'Login'}</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.bottom}>
                <TouchableOpacity onPress={() => clickNext()} style={styles.icon}>
                    <AntDesign name="caretright" size={40 + extHeight} color="white" />
                </TouchableOpacity>
            </View> */}
        </LinearGradient>)
}

export default GenerateWallet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%'
    },
    textInput: {
        backgroundColor: 'white',
        marginTop: 20,
        width: '90%',
        borderRadius: 12,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    button: {
        backgroundColor: 'white',
        marginTop: 16,
        width: '38%',
        padding: 7,
        borderRadius: 18,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color: '#828282',
        textTransform: 'uppercase'
    },
    description: {
        fontSize: 30,
        padding: 10,
        color: "red",
        textAlign: 'center',
        marginVertical: 20 + extHeight
    },
    normalText: {
        fontSize: 20,
        color: "white",
        textAlign: 'center',
        marginVertical: 20 + extHeight
    },
    passpharse: {
        fontSize: 20,
        padding: 10,
        backgroundColor: "black",
        color: "white",
        textAlign: 'center',
        marginVertical: 20 + extHeight
    },
    image: {
        width: '100%',
        height: 220 + 4 * extHeight,
        resizeMode: 'contain',
        marginVertical: 30
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 45 + extHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 15,
        paddingHorizontal: 10
    },
    icon: {
        width: 45 + extHeight,
        height: 45 + extHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    group: {
        width: screenWidth/2.2,
        height: screenWidth/1.76,
        marginTop: 30,
    },
    btnGroup: {
        width: '100%',
        alignItems: 'center',
        height: screenWidth/1.7, 
    }
})