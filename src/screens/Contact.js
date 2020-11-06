import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TextInput, PermissionsAndroid } from 'react-native'
import images from '../config/images';
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Contacts from 'react-native-contacts';
import { ScrollView } from 'react-native-gesture-handler';
import Cache from '../utils/cache'
const { width } = Dimensions.get('window');

const Contact = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.',
                'buttonPositive': 'Please accept bare mortal'
            }
        )
            .then(Contacts.getAll().then(contacts => {
                console.log(contacts);
                setUsers(contacts);
            }))
    });
    console.log('cache', Cache.data);
    return (
        <LinearGradient
            colors={['#ED1C24', '#1B1464']}
            style={styles.container}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={{ position: 'relative' }}>
                <TextInput style={styles.input} placeholder={'Search'} />
                <AntDesign name="search1" size={21} color="grey" style={styles.icon} />
            </View>
            <ScrollView>
                <View style={styles.contact}>
                    {
                        users.map((item, index) =>
                            <View key={index} style={styles.main}>
                                <View style={styles.item}>
                                    <Image source={item.thumbnailPath === '' ? images.user : { uri: item.thumbnailPath }} style={styles.image} />
                                </View>
                                <Text numberOfLines={1} style={{ textAlign: 'center', color: '#fff', marginTop: 3 }}>{item.displayName}</Text>
                                <View style={styles.btn}>
                                    <Text style={{ color: 'grey' }}>Add</Text>
                                </View>
                            </View>)
                    }
                </View>

            </ScrollView>
            <View style={{ height: 76 }} />

        </LinearGradient>
    )
}

export default Contact;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        margin: 7,
        marginTop: 20,
        width: width / 3.6,
        alignItems: 'center'
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 3.8,
        height: width / 3.8,
        // backgroundColor: '#fff',
        borderRadius: width / 8
    },
    contact: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    normalText: {
        fontSize: 15,
        color: "white",
        textAlign: 'center',
    },
    input: {
        height: 50,
        paddingHorizontal: 12,
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: width / 1.1,
        marginTop: 30,
        marginBottom: 8
    },
    image: {
        width: width / 3.8,
        height: width / 3.8,
        borderRadius: width/7.6,
        resizeMode: 'contain',
    },
    btn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 21,
        marginTop: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 5,
        alignSelf: 'center'
    },
    icon: {
        position: 'absolute',
        right: 16,
        bottom: 20
    }
})