import React, { useState } from 'react';

import { View, TouchableOpacity } from 'react-native'
import { styles, extHeight } from '../components/screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import CheckBox from '../components/checkbox';
import ScalableText from 'react-native-text';
AntDesign.loadFont()
const myCenterImage = require('../../assets/fourth.png');


const Five = () => {

    const [value1, setValue1] = useState(false)
    const [value2, setValue2] = useState(false)
    const [value3, setValue3] = useState(false)

    return (
        <View style={styles.container}>
            <ScalableText style={styles.title1}>  Add People  </ScalableText>
            <ScalableText style={styles.normalText}>Now select people to add to your trust Circle.</ScalableText>
            <View style={styles.content}>
                <View style={styles.checkboxContent}>
                    <ScalableText style={styles.checkText}>Stefan Verhagen</ScalableText>
                    <CheckBox onPress={() => setValue1(!value1)} value={value1} />
                </View>
                <View style={styles.checkboxContent}>
                    <ScalableText style={styles.checkText}>Jasper van Heugten</ScalableText>
                    <CheckBox onPress={() => setValue2(!value2)} value={value2} />
                </View>
                <View style={styles.checkboxContent}>
                    <ScalableText style={styles.checkText}>Tom Verhagen</ScalableText>
                    <CheckBox onPress={() => setValue3(!value3)} value={value3} />
                </View>
            </View>
            <View style={styles.bottom2}>
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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#62A6DB',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         padding: 15
//     },
//     title: {
//         fontSize: 36 + extHeight /3,
//         color: 'white',
//         textAlign: 'center',
//         fontWeight: 'bold',
//         marginTop: 25 + 3 * extHeight
//     },
//     normalText: {
//         width: '80%',
//         fontSize: 16 + extHeight /3,
//         color: "white",
//         textAlign: 'center',
//         marginVertical: 25 + 2 * extHeight
//     },
//     checkText:{
//         fontSize: 24 + extHeight / 3,
//         color: "#505050",
//         textAlign: 'center',
//     },
//     bottom2: {
//         width: '100%',
//         height: 45 + extHeight,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 10
//     },
//     icon: {
//         width: 45 + extHeight,
//         height: 45 + extHeight,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     content:{
//         flex:1,
//         backgroundColor:'white',
//         width: '100%',
//         marginVertical: 20
//     },
//     checkboxContent:{
//         paddingHorizontal: 20,
//         backgroundColor:'#E5E5E5',
//         height: 65 + extHeight,
//         marginVertical: 10,
//         marginHorizontal: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 5
//     }
// })