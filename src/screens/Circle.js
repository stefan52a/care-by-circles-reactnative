import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import images from '../config/images';
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import Share from 'react-native-share';
import imgs from '../config/imagesBase64';

const { width } = Dimensions.get('window');
const users = ['Jack', 'Rob', 'Sam', 'Mike', 'Esko', 'Taura']

const Circle = () => {
    const shareSingleImage = async () => {
        const shareOptions = {
          title: 'Share file',
          message: 'Hello. This is test message.',
        //   url: imgs.image1,
          failOnCancel: false,
        };
    
        try {
          const ShareResponse = await Share.open(shareOptions);
          console.log('result =>', ShareResponse);
        } catch (error) {
          console.log('Error =>', error);
        }
      };
    return (
        <LinearGradient
            colors={['#ED1C24', '#1B1464']}
            style={styles.container}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.header}>
                <Image source={images.users} style={{ width: 37, height: 30 }} />
                <Text>My Circle</Text>
                <Text>4/150</Text>
            </View>
            <ScrollView>
                <View style={styles.contact}>
                    {
                        users.map((item, index) =>
                            <View key={index} style={styles.main}>
                                <View>
                                    <View style={styles.item}>
                                        <Image source={images.user} style={styles.image} />
                                    </View>
                                    <Text numberOfLines={1} style={{ textAlign: 'center', color: '#fff', marginTop: 3 }}>{item}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.btn} onPress={shareSingleImage}>
                                        <Text style={{ color: 'grey', fontSize: 16, color: '#4f4f4f' }}>Reach Out</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => Actions.TimeLeft({ name: item })} style={styles.btn}>
                                        <Text style={{ color: 'grey', fontSize: 16, color: '#4f4f4f' }}>Vote</Text>
                                    </TouchableOpacity>
                                </View>                                
                            </View>)
                    }
                </View>

            </ScrollView>
            <View style={{ height: 76 }} />

        </LinearGradient>
    )
}

export default Circle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        padding: 16,
        marginTop: 20,
        width: width - 20,
        marginLeft: - 20,
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(88, 15, 15, 0.3)',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 4.8,
        height: width / 4.8,
        backgroundColor: '#fff',
        borderRadius: width / 8
    },
    contact: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    normalText: {
        fontSize: 15,
        color: "white",
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        height: 40,
        paddingHorizontal: 12,
        backgroundColor: '#FFF',
        width: width,
        marginTop: 30,
        marginBottom: 8,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        width: width / 4.8,
        height: width / 4.8,
        borderRadius: width / 9.6,
        resizeMode: 'contain',
    },
    switch: {
        width: 60,
        height: 60,
    },
    btn: {
        margin: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginTop: 2,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    icon: {
        position: 'absolute',
        right: 16,
        bottom: 20
    }
})