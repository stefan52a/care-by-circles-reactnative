import React, { useState } from 'react';

import { View, TouchableOpacity } from 'react-native'
import { styles, extHeight } from '../components/screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import AlertModal from '../components/AlertModal';
import ScalableText from 'react-native-text';
AntDesign.loadFont()
const myCenterImage = require('../../assets/fourth.png');

const Six = () => {

    const [value, setValue] = useState(false)
    const [visible, setVisible] = useState(false)

    return (
        <View style={styles.container}>
            <ScalableText style={styles.title1}>  Warn  </ScalableText>
            <ScalableText style={styles.normalText}>Do you have Corona? {"\n"}Then press the red button!</ScalableText>
            <TouchableOpacity onPress={() => setVisible(true)} style={styles.outerButton}>
                    <View style={styles.innerButton} />
                </TouchableOpacity>
                <ScalableText style={styles.normalText}></ScalableText>
            <ScalableText style={styles.normalText}>If the majority of voters within your trust Circle agree, only then your anonymous identifiers will be published.</ScalableText>
            <ScalableText style={styles.normalText}></ScalableText>
            <ScalableText style={styles.normalText}>This way all people who have been in (close) contact with you will be notified.</ScalableText>
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => Actions.pop()} style={styles.icon}>
                    <AntDesign name="caretleft" size={40+extHeight} color="white" />
                </TouchableOpacity>
            </View>
            <AlertModal
                message={"Are you sure?\nYou have corona and you want to report this anonymously?"}
                visible={visible}       
                onClose={() => setVisible(false)}
            />
        </View>
    )
}

export default Six;

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
//         width:'90%',
//         fontSize: 16 + extHeight / 3,
//         color: "white",
//         textAlign: 'center',
//         marginTop: 35 + extHeight
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
//     outerButton: {
//         width: 200 + 2 * extHeight,
//         height: 200 + 2 * extHeight,
//         borderRadius: 100 + extHeight,
//         borderWidth: 5,
//         borderColor:  '#F24663',
//         alignItems: 'center',
//         justifyContent: 'center',
//         shadowColor: 'black',
//         shadowOffset: { width: 2, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 5,
//         marginTop: 25 + 2 * extHeight,
//     },
//     innerButton: {
//         width: 172 + 2 * extHeight,
//         height: 172 + 2 * extHeight,
//         borderColor: '#F24663',
//         borderRadius: 86 + extHeight,
//         borderWidth: 5,
//         backgroundColor: 'rgba(244,89,115,0.68)',
//     },
//     icon: {
//         width: 45 + extHeight,
//         height:45 + extHeight,
//         alignItems:'center',
//         justifyContent:'center',
//     }
// })