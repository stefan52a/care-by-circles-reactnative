import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import images from '../config/images';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');

const Main = () => {
    return (
        <LinearGradient
            colors={['#ED1C24', '#1B1464']}
            style={styles.container}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Text style={styles.normalText}>{'Do you need assistance with COVID?'}</Text>
            <Text style={styles.normalText}>{'If Yes, press the HELP button.'}</Text>
            <View style={styles.main}>
                <Image source={images.button} style={styles.image} />
                <TouchableOpacity style={styles.helpTextContainer} onPress={()=>{Actions.TimeLeft({ name: "Do I" })}}>
                    <Text style={styles.helpText}>{'HELP'}</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    helpTextContainer: {
        position: 'absolute',
    },
    helpText: {
        fontSize: 18,
        color: "white",
        textAlign: 'center',
    },
    normalText: {
        fontSize: 15,
        color: "white",
        textAlign: 'center',
    },
    image: {
        width: width + 10,
        height: width + 10,
        resizeMode: 'contain',
        opacity: 0.8
    },
})