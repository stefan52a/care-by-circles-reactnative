import React from 'react'

import { TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import Ionicon from 'react-native-vector-icons/Ionicons'
Ionicon.loadFont()
const {width: screenWidth, height: screenHeight} = Dimensions.get("window")
var extHeight = (screenHeight-650)/15

const CheckBox = ({ value, onPress }) => {

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {value ? <Ionicon name="md-checkmark" color="green" size={30} /> : null}
        </TouchableOpacity>
    )
}

export default CheckBox;

const styles = StyleSheet.create({
    container:{
        width: 35 + extHeight/3,
        height: 35 + extHeight/3,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        alignItems:'center',
        justifyContent:'center'
    }
})