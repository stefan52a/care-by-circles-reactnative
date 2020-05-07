import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
AntDesign.loadFont()
const {width: screenWidth, height: screenHeight} = Dimensions.get("window")
var extHeight = (screenHeight-650)/15

const Seven = () => {


    return (
        <View style={styles.container}>
            <Text style={styles.title}>You have been in contact with Corona</Text>
    <Text style={styles.normalText}>April 12, 2020 {"\n"}Contact duration: 61 min</Text>
            <Text style={styles.normalText}>April 10, 2020 {"\n"}Contact duration: 61 min</Text>
            <Text style={styles.alertText}>Click here for more information on what you can do.</Text>
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => Actions.pop()} style={styles.icon}>
                    <AntDesign name="caretleft" size={40+extHeight} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Seven;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#62A6DB',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 36 + extHeight /3,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 25 + 3 * extHeight,
        marginBottom: 50
    },  
    normalText: {
        width:'80%',
        fontSize: 20,
        color: "white",
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 40
    },
    alertText: {
        width:'90%',
        fontSize: 20 + extHeight /3,
        color: "red",
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 150+9*extHeight
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