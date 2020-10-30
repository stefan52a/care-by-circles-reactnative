import React, { useState } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient'
import images from '../config/images';

AntDesign.loadFont()
const myCenterImage = require('../../assets/first.png');
const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
var extHeight = (screenHeight - 650) / 15

const SignInUp = () => {
    const importWallet = () => {
        Actions.GenerateWallet({ option: 'import' });
    }

    const createWallet = () => {
        Actions.GenerateWallet({ option: 'create' });
    }

    return (
        <LinearGradient
            colors={['#ED1C24', '#1B1464']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.horizontal}>
                <Image source={images.group} style={styles.group} />
                <Image source={images.group} style={styles.group} />
            </View>
            <Image source={images.group} style={styles.group} />
            <TouchableOpacity onPress={() => importWallet()} style={[styles.button, { marginTop: 40 }]}>
                <Text style={styles.title}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => createWallet()} style={styles.button}>
                <Text style={styles.title}>Create New</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default SignInUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%'
    },
    horizontal: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color: '#828282',
        textTransform: 'uppercase'
    },
    button: {
        width: '90%',
        marginTop: 20,
        padding: 5,
        height: 50,
        backgroundColor: '#eeeeee',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    group: {
        width: 58,
        height: 72,
        marginTop: 30,
    }
})