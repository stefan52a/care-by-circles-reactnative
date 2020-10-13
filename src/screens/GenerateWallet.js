import React, { useState } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity,Dimensions, TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
AntDesign.loadFont()
const myCenterImage = require('../../assets/first.png');
const {width: screenWidth, height: screenHeight} = Dimensions.get("window")
var extHeight = (screenHeight-650)/15
const GenerateWallet = (props) => {    
    const option = props.option;
    const [pin, setPin] = useState("");
    const [confirm_pin, setConfirmPin] = useState("");

    const clickNext = () => {
        if (pin !== confirm_pin) {
            alert('pin is not match.');
            return;
        }
        Actions.Seed({pin: pin});
    }

    if (option === 'create'){
        return (
            <View style={styles.container}>            
                <Text style={styles.title}>Generate Wallet</Text>     
                <TextInput style={styles.textInput} value={pin} onChangeText={text => setPin(text)} secureTextEntry={true} placeholder="Type pin code here" keyboardType = 'numeric'/>
                <TextInput style={styles.textInput} value={confirm_pin} onChangeText={text => setConfirmPin(text)} secureTextEntry={true} placeholder="Confirm pin code" keyboardType = 'numeric'/>                                    
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={() => clickNext()} style={styles.icon}>
                        <AntDesign name="caretright" size={40+extHeight} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>            
                <Text style={styles.title}>Import Wallet</Text>     
                <TextInput style={styles.textInput} value={pin} onChangeText={text => setPin(text)} secureTextEntry={true} placeholder="Type pin code here" keyboardType = 'numeric'/>                
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={() => clickNext()} style={styles.icon}>
                        <AntDesign name="caretright" size={40+extHeight} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default GenerateWallet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#62A6DB',
        alignItems: 'center'        
    },
    textInput: {
        backgroundColor: 'white',    
        marginTop: 20,    
        width: '90%'        
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