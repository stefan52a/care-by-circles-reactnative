import React from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
AntDesign.loadFont()
const myCenterImage = require('../../assets/second.png');
const {width: screenWidth, height: screenHeight} = Dimensions.get("window")
var extHeight = (screenHeight-650)/15

const Second = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title1}>How it works</Text>
            <Text style={styles.title2}>Step 1.</Text>
            <Text style={styles.normalText}>Anonymous messages are exchanged with nearby phones.</Text>
            <Image source={myCenterImage} style={styles.image} />
            <Text style={styles.normalText}>Messages keep track of whom you have been in contact with by anonymous identifiers.</Text>
            <Text style={styles.normalText}>These messages will stay only on your own phone</Text>
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => Actions.pop()} style={styles.icon}>
                    <AntDesign name="caretleft" size={40+extHeight} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.Third()} style={styles.icon}>
                    <AntDesign name="caretright" size={40+extHeight} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Second;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#62A6DB',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title1: {
        fontSize: 36 + extHeight /3,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 25 + 3 * extHeight
    },
    title2: {
        fontSize: 32 + extHeight /3,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20 + extHeight
    },
    normalText: {
        width:'80%',
        fontSize: 16 + extHeight /3,
        color: "white",
        textAlign: 'center',
        marginTop: 30 + extHeight
    },
    image: {
        width: '100%',
        height: 90 + extHeight,
        resizeMode: 'contain',
        marginTop: 40 + extHeight*2,
        marginBottom: extHeight*2,
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 45 + extHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:10,
        marginBottom: 15
    },
    icon: {
        width: 45 + extHeight,
        height:45 + extHeight,
        alignItems:'center',
        justifyContent:'center',
    }
})