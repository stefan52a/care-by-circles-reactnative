import React from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
AntDesign.loadFont()
const myCenterImage = require('../../assets/third.png');
const {width: screenWidth, height: screenHeight} = Dimensions.get("window")
var extHeight = (screenHeight-650)/15

const Third = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title1}>How it works</Text>
            <Text style={styles.title2}>Step 2.</Text>
            <Text style={styles.normalText1}>Do you have Corona? {"\n"}Then press the red button!</Text>
            <Image source={myCenterImage} style={styles.image} />
            <Text style={styles.normalText1}>Your anonymous identifiers will be published.</Text>
            <Text style={styles.normalText2}>This way all people who have been in (close) contact with you will be notified.</Text>
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => Actions.pop()} style={styles.icon}>
                    <AntDesign name="caretleft" size={40+extHeight} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.Fourth()} style={styles.icon}>
                    <AntDesign name="caretright" size={40+extHeight} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Third;

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
        marginTop: 10 + extHeight
    },
    normalText1: {
        width:'75%',
        fontSize: 16 + extHeight /3,
        color: "white",
        textAlign: 'center',
        marginTop: 20 + extHeight*2
    },
    normalText2: {
        width:'75%',
        fontSize: 16 + extHeight /3,
        color: "white",
        textAlign: 'center',
        marginTop: 20
    },
    image: {
        width: '100%',
        height: 200 + 5*extHeight,
        resizeMode: 'contain',
        marginTop: 12,
        marginBottom: 0
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
        paddingHorizontal: 10,
        marginBottom: 15
    },
    icon: {
        width: 45 + extHeight,
        height:45 + extHeight,
        alignItems:'center',
        justifyContent:'center',
    }
})