import React, { useState } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity,Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
AntDesign.loadFont()
const myCenterImage = require('../../assets/first.png');
const {width: screenWidth, height: screenHeight} = Dimensions.get("window")
var extHeight = (screenHeight-650)/15
import Mnemonic from '../libs/mnemonic'
import bitcore from 'bitcore-lib-react-native'
import API from '../service/api'
const First = (props) => {
    const {passphrase} = props        
    const wallet = Mnemonic.fromWords(passphrase.trim().split(" ")).toHex();
    const network = bitcore.Networks['mainnet'];
    const s = bitcore.HDPrivateKey.fromSeed(wallet, network);
    const d = s.derive("m/0'/0/0"+0);
    const address = bitcore.Address(d.publicKey, network).toString();
    API.oracleGetAirdrop('+31-6-233797929', d.publicKey, function(err, data){        
        if (err){
            console.log(err);
            return;
        } else {
            console.log(data);
        }
    })
    return (
        <View style={styles.container}>
            <Image source={myCenterImage} style={styles.image} />
            <Text style={styles.title}>Your address</Text>
            <Text style={styles.normalText}>{address}</Text>
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => Actions.Second()} style={styles.icon}>
                    <AntDesign name="caretright" size={40+extHeight} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default First;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#62A6DB',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 50,
        color: '#F45973',
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
        // fontWeight: 'bold'
    },
    normalText: {
        fontSize: 20,
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