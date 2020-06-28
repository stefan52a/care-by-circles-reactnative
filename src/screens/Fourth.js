import React, { useState } from 'react';

import { styles, extHeight } from '../components/screen';
import { View, Image, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import ScalableText from 'react-native-text';

AntDesign.loadFont()
const myCenterImage = require('../../assets/fourth.png');

const Fourth = () => {

    return (
        <View style={styles.container}>
            <ScalableText style={styles.title1}>  How it works  </ScalableText>
            <ScalableText style={styles.title2}>  Step 3. (optional)</ScalableText>
            <ScalableText style={styles.normalText}>Select people to add to your trust Circle</ScalableText>
            <ScalableText style={styles.normalText}></ScalableText>
            <Image source={myCenterImage} style={styles.imageCircle} />
            <ScalableText style={styles.normalText}></ScalableText>
            <ScalableText style={styles.normalText}>Only within your trust Circle you get to know the person’s id</ScalableText>
            <ScalableText style={styles.normalText}></ScalableText>
            <ScalableText style={styles.normalText}>This way we give and take care</ScalableText>
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => Actions.pop()} style={styles.icon}>
                    <AntDesign name="caretleft" size={40+extHeight} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.Five()} style={styles.icon}>
                    <AntDesign name="caretright" size={40+extHeight} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Fourth;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#62A6DB',
//         alignItems: 'center',
//         justifyContent: 'flex-start'
//     },
//     title1: {
//         fontSize: 36 + extHeight /3,
//         color: 'white',
//         textAlign: 'center',
//         fontWeight: 'bold',
//         marginTop: 25 + 3 * extHeight
//     },
//     titleOption: {
//         fontWeight: 'normal'
//     },
//     title2: {
//         fontSize: 32 + extHeight /3,
//         color: 'white',
//         textAlign: 'center',
//         fontWeight: 'bold',
//         marginTop: 15 + extHeight
//     },    
//     normalText: {
//         width:'80%',
//         fontSize: 16 + extHeight /3,
//         color: "white",
//         textAlign: 'center',
//         marginTop: 25 + 2 * extHeight
//     },
//     image: {
//         width: '100%',
//         height: 200 + 2 * extHeight,
//         resizeMode: 'contain',
//         marginTop: 25 + 2 * extHeight,
//         marginBottom: 0
//     },
//     bottom: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         width: '100%',
//         height: 45 + extHeight,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 10,
//         marginBottom: 15
//     },
//     icon: {
//         width: 45 + extHeight,
//         height:45 + extHeight,
//         alignItems:'center',
//         justifyContent:'center',
//     }
// })