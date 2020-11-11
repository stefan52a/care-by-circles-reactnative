import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, Dimensions } from 'react-native'
import images from '../config/images';
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('window');

const TimeLeft = (props) => {
    const {name} = props.navigation.state.params;
    return (
        <LinearGradient
            colors={['#ED1C24', '#1B1464']}
            style={styles.container}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <ImageBackground source={images.bigBtn} style={styles.image}>
                <Image source={images.user} style={styles.user} />
                <Text style={styles.helpText}>{'Does ' + name +' have\n Corona Virus?'}</Text>
            </ImageBackground>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                <View>
                    <View style={[styles.btn, {backgroundColor: '#2bb063'}]}>
                        <Image source={images.upThumb} style={styles.thumb} />
                    </View>   
                    <Text style={{ alignSelf: 'center', color: '#fff'}}>22</Text>
                </View>
                <View>
                <View style={[styles.btn, {backgroundColor: '#eb5b5b'}]}>
                        <Image source={images.downThumb} style={styles.thumb} />
                    </View>
                    <Text style={{ alignSelf: 'center', color: '#fff'}}>10</Text>
                </View>
            </View>
            <Text style={{ color: '#fff', marginBottom: 8}}>Time Left</Text>
            <View style={styles.btn}>
                <Text style={{fontWeight: '600', fontSize: 18, marginTop: 10}}>{'00:45'}</Text>
                <Text>{'mins'}</Text>    
            </View>
        </LinearGradient> 
    )
}

export default TimeLeft;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    helpText: {
        marginTop: 10,
        fontSize: 15,
        color: "white",
        textAlign: 'center',
    },
    normalText: {
        fontSize: 15,
        color: "white",
        textAlign: 'center',
    },
    image: {
        width: width/1.7,
        height: width/1.7,
        marginTop: -10,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center'
    },
    user: {
        width: width/4,
        height: width/4,
    },
    thumb: {
        width: 40,
        height: 42,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFC1F9',
        borderColor: '#fff',
        borderWidth: 1,
        elevation:0.3
    }
})