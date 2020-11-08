import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import QRCode from 'react-native-qrcode-svg';
import Cache from '../utils/cache'
const { width } = Dimensions.get('window');


const Wallet = () => {
    console.log(Cache.data)    
    const publickey = Cache.data.publickey? Cache.data.publickey: '02bd63694cd5a1baac7e543e2a2da2127587e1eaef8ff37b4b7fda1144ec254a22';
    const qrcode_string = Cache.data.qrcode_string;
    return (
        <LinearGradient
            colors={['#ED1C24', '#1B1464']}
            style={styles.container}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
              <QRCode
                size={180}
                value={qrcode_string}
              />
            <Text style={styles.normalText}>{publickey}</Text>

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