import React, { useState } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import CheckBox from '../components/checkbox';
AntDesign.loadFont()
const myCenterImage = require('../../assets/fourth.png');
const {width: screenWidth, height: screenHeight} = Dimensions.get("window")
var extHeight = (screenHeight-650)/15

const Five = () => {

    const [value1, setValue1] = useState(false)
    const [value2, setValue2] = useState(false)
    const [value3, setValue3] = useState(false)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add People</Text>
            <Text style={styles.normalText}>Now select people to add to your trust Circle.</Text>
            <View style={styles.content}>
                <View style={styles.checkboxContent}>
                    <Text style={styles.checkText}>Stefan Verhagen</Text>
                    <CheckBox onPress={() => setValue1(!value1)} value={value1} />
                </View>
                <View style={styles.checkboxContent}>
                    <Text style={styles.checkText}>Jasper van Heugten</Text>
                    <CheckBox onPress={() => setValue2(!value2)} value={value2} />
                </View>
                <View style={styles.checkboxContent}>
                    <Text style={styles.checkText}>Tom Verhagen</Text>
                    <CheckBox onPress={() => setValue3(!value3)} value={value3} />
                </View>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => Actions.pop()} style={styles.icon}>
                    <AntDesign name="caretleft" size={40+extHeight} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.Six()} style={styles.icon}>
                    <AntDesign name="caretright" size={40+extHeight} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Five;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#62A6DB',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 15
    },
    title: {
        fontSize: 36 + extHeight /3,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 25 + 3 * extHeight
    },
    normalText: {
        width: '80%',
        fontSize: 16 + extHeight /3,
        color: "white",
        textAlign: 'center',
        marginVertical: 25 + 2 * extHeight
    },
    checkText:{
        fontSize: 24 + extHeight / 3,
        color: "#505050",
        textAlign: 'center',
    },
    bottom: {
        width: '100%',
        height: 45 + extHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    icon: {
        width: 45 + extHeight,
        height: 45 + extHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        flex:1,
        backgroundColor:'white',
        width: '100%',
        marginVertical: 20
    },
    checkboxContent:{
        paddingHorizontal: 20,
        backgroundColor:'#E5E5E5',
        height: 65 + extHeight,
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    }
})