import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('window');

const Notification = () => {
    return (
        <LinearGradient
            colors={['#ED1C24', '#1B1464']}
            style={styles.container}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Text style={styles.normalText}>{'Notification'}</Text>
        </LinearGradient> 
    )
}

export default Notification;

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
    helpText: {
        position: 'absolute',
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