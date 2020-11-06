import React from 'react';

import { styles, extHeight } from '../components/screen';
import { View, Image, TouchableOpacity } from 'react-native';
import ScalableText from 'react-native-text';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
AntDesign.loadFont()
const myCenterImage = require('../../assets/second.png');

const Second = () => {

    return (
        <View style={ styles.container }>
            <ScalableText style={styles.title1}>  How it works  </ScalableText>
            <ScalableText style={styles.title2}>  Step 1.  </ScalableText>
            <ScalableText style={styles.normalText}>Anonymous messages are exchanged with nearby phones.</ScalableText>
            <Image source={myCenterImage} style={styles.image} />
            <ScalableText style={styles.normalText}></ScalableText>
            <ScalableText style={styles.normalText}>Messages keep track of with whom you have been in contact using anonymous identifiers.</ScalableText>
            <ScalableText style={styles.normalText}></ScalableText>
            <ScalableText style={styles.normalText}>These messages will stay only on your own phone</ScalableText>
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
