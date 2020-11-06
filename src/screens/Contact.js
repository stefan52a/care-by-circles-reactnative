import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TextInput, PermissionsAndroid, Modal, ScrollView, TouchableOpacity } from 'react-native'
import images from '../config/images';
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Contacts from 'react-native-contacts';
import Cache from '../utils/cache';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const { width } = Dimensions.get('window');

const Contact = () => {

    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [scan, setScan] = useState(false);
    const [pubkey, setPubkey] = useState();

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
                // console.log(contacts);
                setUsers(contacts);
            }))
    }, [Contacts, PermissionsAndroid]);
    // console.log('cache', Cache.data);

    // onSuccess = e => {
    //     console.log('+++++++++++++++', e);

    //     // Linking.openURL(e.data).catch(err =>
    //     //   console.error('An error occured', err)
    //     // );
    //   };

    if(scan){
        return(
        <View style={{ flex: 1, marginTop: -50, backgroundColor: '#000'}}>
            <QRCodeScanner
            onRead={(e)=>{setPubkey(e.rawData); setScan(false); }}
            flashMode={RNCamera.Constants.FlashMode.torch}
        />
        </View>)
    } else {
        return <LinearGradient
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
                                <TouchableOpacity style={styles.btn} onPress={()=>{setSelectedUser(item); setModal(true)}}>
                                    <Text style={{ color: 'grey' }}>Add</Text>
                                </TouchableOpacity>
                            </View>)
                    }
                </View>

            </ScrollView>
            <View style={{ height: 76 }} />
            {modal && <ConfirmModal pubkey={pubkey} user={selectedUser} onClose={()=>{ setModal(false);setSelectedUser(null)}} onScan={()=>setScan(true)}/>}
        </LinearGradient>
    }
}


function ConfirmModal(props) {
    const { user, onClose, onScan, pubkey } = props;
    return (
        <Modal
            transparent
            onRequestClose={() => { }}
            visible={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={{ color: '#fff'}}>Confirm</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 12, width: '90%'}}>
                        <View style={{ flexDirection: 'row', marginTop: 8}}>
                            <View style={{ flex: 1}}>
                                <Text>Name:</Text>
                            </View>
                            <View style={{ flex: 3}}>
                                <Text>{user?.displayName}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 8}}>
                            <View style={{ flex: 1}}>
                                <Text>Phone:</Text>
                            </View>
                            <View style={{ flex: 3}}>
                                <Text>{user?.phoneNumbers[0]?.number}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center'}}>
                            <View style={{ flex: 1}}>
                                <Text>PubKey:</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                                <TextInput style={styles.modalInput} placeholder={'Search'} value={pubkey}/>
                                <TouchableOpacity onPress={()=>onScan()} style={styles.scanBtn}>
                                    <Text style={styles.buttonText}>Scan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => { Actions.Seven(); onClose(false); }} style={styles.button}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onClose(false)} style={[styles.button, { backgroundColor: '#DD4F43'}]}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default Contact;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0,0.5)",
        alignItems: "center",
        justifyContent: "center"
    },
    modalContent: {
        width: width-50,
        height: 200,
        borderRadius: 12,
        shadowColor: "black",
        alignItems: "center",
        // justifyContent: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        backgroundColor: "#fff"
    },
    modalHeader: {
        borderTopEndRadius: 12,
        borderTopLeftRadius: 12,
        width: '100%',
        height: 30,
        backgroundColor: '#925841',
        alignItems: "center",
        justifyContent: "center"
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
        borderRadius: width / 7.6,
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
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 12
    },
    button: {
        backgroundColor: '#00B5EE',
        height: 25,
        width: 100,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12
    },
    buttonText: {
        color: '#fff'
    },
    modalInput: {
        width: '60%',
        borderWidth: 1,
        borderColor: 'grey',
        height: 30,
        padding: 0,
        paddingHorizontal: 7
    },
    scanBtn: {
        backgroundColor: '#CC7832',
        height: 30,
        width: 50,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8
        // marginTop: 12
    }
})