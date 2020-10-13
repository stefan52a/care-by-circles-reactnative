import React, { useState } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity,Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
AntDesign.loadFont()
const myCenterImage = require('../../assets/first.png');
const {width: screenWidth, height: screenHeight} = Dimensions.get("window")
var extHeight = (screenHeight-650)/15

const SignInUp = () => {
    const importWallet = () => {
        Actions.GenerateWallet({option: 'import'});
    }

    const createWallet = () => {
        Actions.GenerateWallet({option: 'create'});
    }

    return (
        <View style={styles.container}>             
                <Image source={myCenterImage} style={styles.image} />               
                <TouchableOpacity onPress={() => importWallet()} style={styles.button}>
                    <Text  style={styles.title}>Login</Text>
                </TouchableOpacity>                        
                <TouchableOpacity onPress={() => createWallet()} style={styles.button}>
                    <Text style={styles.title}>Create New</Text>
                </TouchableOpacity>            
        </View> 
    )
}

export default SignInUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#62A6DB',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {        
        fontSize: 25,         
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    button: {
        width: '90%',    
        marginTop: 20,
        padding: 5,   
        height: 50, 
        backgroundColor: '#eeeeee',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: 220+4*extHeight,
        resizeMode: 'contain',
        marginVertical: 30
    }
})