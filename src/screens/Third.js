import React from 'react';

import { styles, extHeight } from '../components/screen';
import { View, Image, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import ScalableText from 'react-native-text';

AntDesign.loadFont()
const myCenterImage = require('../../assets/third.png');

const Third = () => {

    return (
        <View style={styles.container}>
            <ScalableText style={styles.title1}>  How it works  </ScalableText>
            <ScalableText style={styles.title2}>  Step 2.  </ScalableText>
            <ScalableText style={styles.normalText}>Do you have Corona? {"\n"}Then press the red button!</ScalableText>
            <Image source={myCenterImage} style={styles.imageCircle} />
            <ScalableText style={styles.normalText}>Your anonymous identifiers will be published.</ScalableText>
            <ScalableText style={styles.normalText}></ScalableText>
            <ScalableText style={styles.normalText}>This way all people who have been in (close) contact with you will be notified.</ScalableText>
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

