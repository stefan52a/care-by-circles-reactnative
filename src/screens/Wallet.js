import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');
const string = 'Circles are tribes with a maximum of 150 people.';

const Wallet = () => {
    return (
        <LinearGradient
            colors={['#ED1C24', '#1B1464']}
            style={styles.container}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
              <QRCode
                size={180}
                value={string}
              />
            <Text style={styles.normalText}>{string}</Text>

        </LinearGradient> 
    )
}

export default Wallet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: width / 4,
        paddingHorizontal: 20
    },
    main: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    normalText: {
        fontSize: 20,
        color: "white",
        textAlign: 'center',
        marginTop: 20
    },
    image: {
        width: width + 10,
        height: width + 10,
        resizeMode: 'contain',
        opacity: 0.8
    },
})