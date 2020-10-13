import React, { useState } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity,Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
AntDesign.loadFont()
const myCenterImage = require('../../assets/first.png');
const {width: screenWidth, height: screenHeight} = Dimensions.get("window")
var extHeight = (screenHeight-650)/15
import Mnemonic from '../libs/mnemonic'
import RNFS from 'react-native-fs';
import CryptoJS from "react-native-crypto-js";
const Seed = (props) => {
    const {pin} = props    
    const m  = new Mnemonic(128);
    var p  = m.toWords().toString().replace(/,/gi, " ");    
    var encrypted = CryptoJS.AES.encrypt(p, 'carecircle_encrypt_secret_key').toString();
    console.log('encrypted', encrypted);
    var path = RNFS.DocumentDirectoryPath + '/carewallet.keystore';
    RNFS.writeFile(path, encrypted , 'utf8')
    .then((success) => {
        console.log('FILE WRITTEN!', success);
    })
    .catch((err) => {
        console.log(err.message);
    });

    return (
        <View style={styles.container}>            
            <Text style={styles.title}>New wallet passphrase</Text>
            <Text style={styles.normalText}>
                A passpharse has been created for you and is visible in the black box below.
                This passpharse lets you access your wallet and the funds it contains
            </Text>            
            <Text style={styles.passpharse}>{p}</Text>
            <Text style={styles.description}>
                Your passphrase will be stored in device with encrypting.
            </Text>
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => Actions.First({passphrase: p})} style={styles.icon}>
                    <AntDesign name="caretright" size={40+extHeight} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Seed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#62A6DB',
        alignItems: 'center'        
    },
    title: {
        fontSize: 50,
        padding: 20,
        color: 'white',        
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
        // fontWeight: 'bold'
    },
    description: {
        fontSize: 30,        
        padding:10,
        color: "red",
        textAlign: 'center',
        marginVertical: 20+extHeight
    },    
    normalText: {
        fontSize: 20,        
        color: "white",
        textAlign: 'center',
        marginVertical: 20+extHeight
    },
    passpharse: {
        fontSize: 20,
        padding:10,
        backgroundColor: "black",
        color: "white",
        textAlign: 'center',
        marginVertical: 20+extHeight
    },
    image: {
        width: '100%',
        height: 220+4*extHeight,
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
        paddingHorizontal:10
    },
    icon: {
        width: 45 + extHeight,
        height: 45 + extHeight,
        alignItems: 'center',
        justifyContent: 'center',
    }
})