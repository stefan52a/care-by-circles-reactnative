import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import images from '../config/images';
import LinearGradient from 'react-native-linear-gradient'
import { ceil } from 'react-native-reanimated';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');

const TimeLeft = (props) => {
    const [like, setLike] = useState(22);
    const [unlike, setUnlike] = useState(10);
    const { name } = props.navigation.state.params;
    return (
        <LinearGradient
            colors={['#ED1C24', '#1B1464']}
            style={styles.container}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <TouchableOpacity style={styles.backBtn} onPress={()=>Actions.pop()}>
                <Text style={{ color: 'grey'}}>Back</Text>
            </TouchableOpacity>
            <ImageBackground source={images.bigBtn} style={styles.image}>
                <Image source={images.user} style={styles.user} />
                <Text style={styles.helpText}>{'Does ' + name + ' have\n Corona Virus?'}</Text>
            </ImageBackground>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                <TouchableOpacity onPress={() => setLike(like + 1)}>
                    <View style={styles.btn}>
                        <Image source={images.upThumb} style={styles.thumb} />
                    </View>
                    <Text style={{ alignSelf: 'center', color: '#fff' }}>{like}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setUnlike(unlike + 1)}>
                    <View style={styles.btn}>
                        <Image source={images.downThumb} style={styles.thumb} />
                    </View>
                    <Text style={{ alignSelf: 'center', color: '#fff' }}>{unlike}</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ color: '#fff', marginBottom: 8, fontSize: 17 }}>Time Left</Text>
            <ImageBackground source={images.timeIcon} style={styles.time}>
                <Text style={{ fontWeight: '600', fontSize: 36, color: '#fff' }}>{24}</Text>
            </ImageBackground>
            <Text style={{ color: '#fff', fontSize: 17, marginTop: 6}}>{'MINUTES'}</Text>

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
        color: "grey",
        textAlign: 'center',
    },
    normalText: {
        fontSize: 15,
        color: "white",
        textAlign: 'center',
    },
    image: {
        width: 216,
        height: 216,
        borderRadius: 108,
        marginTop: -10,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    user: {
        width: 104,
        height: 110,
    },
    thumb: {
        width: 40,
        height: 42,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 69,
        height: 69,
        borderRadius: 40,
        backgroundColor: '#FFF',
        elevation: 0.3
    },
    time: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backBtn: {
        margin: 12,
        width: 75,
        height: 36,
        borderRadius: 22,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start'
    }
})