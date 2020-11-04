import React, { useState } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient'
import images from '../config/images';

AntDesign.loadFont()
const myCenterImage = require('../../assets/first.png');
const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
var extHeight = (screenHeight - 650) / 15
const GenerateWallet = (props) => {
    const option = props.option;
    const [pin, setPin] = useState("");
    const [confirm_pin, setConfirmPin] = useState("");

    const clickNext = () => {
        if (pin !== confirm_pin) {
            alert('pin is not match.');
            return;
        }
        Actions.Seed({ pin: pin });
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
                
                <TouchableOpacity onPress={() => {Actions.Nav()}} style={styles.button}>
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