import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TextInput, PermissionsAndroid, Modal, ScrollView, TouchableOpacity } from 'react-native'
import images from '../config/images';
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Contacts from 'react-native-contacts';
import Cache from '../utils/cache';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import bitcoin from 'react-native-bitcoinjs-lib';
import bitcore from 'bitcore-lib-react-native';
import bitcoinlib from 'bitcoinjs-lib'
import { UpdateDeviceStore, getFinalScripts2 } from '../libs/utils'
import API from '../service/api'

const { width } = Dimensions.get('window');

const Contact = () => {

    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [scan, setScan] = useState(false);
    const [pubkey, setPubkey] = useState('');
    const [salt, setSalt] = useState('');

    useEffect(() => {
        console.log("icd------", Cache.data.id)

        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.',
                'buttonPositive': 'Please accept bare mortal'
            }
        )
            .then(Contacts.getAll().then(contacts => {
                console.log('contacts', contacts);
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
    const OnScanQrCode = (value) => {
        console.log("OnScanQrCode----", value)
        const data = JSON.parse(value);
        setPubkey(data.publickey);
        setSalt(data.salt);
        setPhoneNumber(data.phone);
        setScan(false);
    }

    const onConfirm = () => {
        const cacheData = Cache.data;
        const contract = cacheData.contract;
        const circleId = cacheData.circle;
        const AliceId = cacheData.id;
        const saltAlice = cacheData.salt;
        const pubkeyInUTXO = cacheData.publickey;
        const addressOfUTXO = cacheData.newUTXO;
        const AliceNewPubkey = cacheData.publickey;
        const BobId = phoneNumber;//selectedUser?.phoneNumbers[0]?.number;
        const saltBob = salt;
        const BobPubkey = pubkey;
        console.log("oraclePleaseSignTx-----", AliceId, saltAlice, AliceNewPubkey, circleId, addressOfUTXO, pubkeyInUTXO, BobPubkey, BobId, saltBob, contract)
        console.log("end-------")
        API.oraclePleaseSignTx(AliceId, saltAlice, AliceNewPubkey, circleId, addressOfUTXO, pubkeyInUTXO, BobPubkey, BobId, saltBob, contract, function (error, response) {
            console.log("oraclePleaseSignTx-------", error, response);
            if (error === null) {
                //sign in
                const s = bitcore.HDPrivateKey.fromSeed(cacheData.wallet, "regtest");
                const psbt_from_oracle_to_sigin = bitcoinlib.Psbt.fromBase64(response.psbtBaseText, { network: "regtest" });
                psbt_from_oracle_to_sigin.signAllInputs(s);
                psbt_from_oracle_to_sigin.combine(bitcoin.Psbt.fromBase64(response.psbtSignedByOracleBaseText, { network: "regtest" }));
                psbt_from_oracle_to_sigin.finalizeInput(0, getFinalScripts2)
                //const psbt_from_oracle_to_sigin = bitcoin.Psbt.fromBase64(response.psbtBaseText, {network: "regtest"});
                //psbt_from_oracle_to_sigin.signAllInputs(s);
                //psbt_from_oracle_to_sigin.combine(bitcoin.Psbt.fromBase64(response.psbtSignedByOracleBaseText, {network:"regtest"}));
                //psbt_from_oracle_to_sigin.finalizeInput(0,  ???);

                //brodcast
                API.broadcastToRegtest(psbt_from_oracle_to_sigin, function (error1, response1) {
                    console.log(error1, response1);
                    if (error1 === null) {
                        cacheData.newUTXO = response1.addressofUTXO;
                        Cache.data = cacheData;
                        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(cacheData), cacheData.pin).toString();
                        UpdateDeviceStore(encrypted, function (err, updateddata) {
                            console.log(err, data);
                            setModal(false);
                            setSelectedUser(null)
                            Alert('Successfully added!')
                        })
                    }
                });
                //Actions.Seven();
            } else {
                alert(error);
            }
        });
    }

    if (scan) {
        return (
            <View style={{ flex: 1, marginTop: -50, backgroundColor: '#000' }}>
                <QRCodeScanner
                    onRead={(e) => OnScanQrCode(e.data)}
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
            <View style={{
                flex: 1,
                paddingHorizontal: 20,
                paddingVertical: 30,
                alignItems: "center",
            }}>
                <Text style={{
                    fontSize: 32,
                    color: "#ffffff",
                    fontWeight: "600",
                    paddingBottom: 8
                }}>Join</Text>
                <View style={styles.lineContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lineTitle}>Name:
                    </Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: "row" }}>
                        <TextInput style={styles.lineInput}
                            value={selectedUser?.displayName}
                            placeholder={'Name'} />
                        <TouchableOpacity style={styles.lineButton}
                            onPress={() => { setModal(true) }}>
                            {/* <Text style={styles.lineButtonText}>Contact</Text> */}
                            <Image source={images.contact} style={styles.lineButtonImage} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.lineContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lineTitle}>Phone:
                    </Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: "row" }}>
                        <TextInput style={styles.lineInput}
                            value={phoneNumber}//selectedUser?.phoneNumbers[0]?.number}
                            placeholder={'Phone'} />
                    </View>
                </View>
                <View style={styles.lineContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lineTitle}>PubKey:
                    </Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: "row" }}>
                        <TextInput style={styles.lineInput}
                            editable={false}
                            value={pubkey}
                            placeholder={'PubKey'} />
                        <TouchableOpacity style={styles.lineButton}
                            onPress={() => { setScan(true) }}>
                            <Image source={images.scan} style={styles.lineButtonImage} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.lineContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lineTitle}>Salt:
                    </Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: "row" }}>
                        <TextInput style={styles.lineInput}
                            value={salt}
                            editable={false}
                            placeholder={'Salt'} />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {/* <View style={{ width: "100%", flexDirection: "row" }}> */}
                    {/* <TouchableOpacity
                        onPress={() => { setScan(true) }}
                        style={styles.mainButton}>
                        <Text style={styles.mainButtonText}>Scan</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => onConfirm()}
                        style={styles.main}>
                        <Image source={images.button} style={styles.image} />
                        <Text style={styles.helpText}>{'JOIN'}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={() => { onConfirm() }}
                        style={styles.mainButton}>
                        <Text style={styles.mainButtonText}>Join</Text>
                    </TouchableOpacity> */}
                </View>
            </View>

            {/* <View style={{ position: 'relative' }}>
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
            </ScrollView> */}
            <View style={{ height: 76 }} />
            {modal && <ConfirmModal
                salt={salt}
                pubkey={pubkey}
                user={selectedUser}
                users={users}
                onConfirm={() => onConfirm()}
                setSelectedUser={(item) => setSelectedUser(item)}
                onClose={() => { setModal(false); setSelectedUser(null) }}
                setModal={(visible) => setModal(visible)}
                onScan={() => setScan(true)} />}
        </LinearGradient>
    }
}


function ConfirmModal(props) {
    const { users, setSelectedUser, setModal, user, onClose, onConfirm, onScan, pubkey, salt } = props;
    return (
        <Modal
            transparent
            onRequestClose={() => { }}
            visible={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        {
                            users.map((item, index) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedUser(item)
                                        setModal(false)
                                    }}
                                    key={index}
                                    style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>{item.displayName}</Text>
                                </TouchableOpacity>
                            ))
                        }
                        {/* <View style={styles.modalHeader}>
                        <Text style={{ color: '#fff' }}>Confirm</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 12, width: '90%' }}>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <View style={{ flex: 1 }}>
                                <Text>Name:</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text>{user?.displayName}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <View style={{ flex: 1 }}>
                                <Text>Phone:</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text>{user?.phoneNumbers[0]?.number}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text>PubKey:</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput style={styles.modalInput} placeholder={'PubKey'} value={pubkey} />
                                <TouchableOpacity onPress={() => onScan()} style={styles.scanBtn}>
                                    <Text style={styles.buttonText}>Scan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text>Salt:</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput style={styles.modalInput} placeholder={'Salt'} value={salt} />
                            </View>
                        </View>

                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => onConfirm()} style={styles.button}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onClose(false)} style={[styles.button, { backgroundColor: '#DD4F43' }]}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View> */}
                    </ScrollView>
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
        // height: 150,
        backgroundColor: "rgba(0, 0, 0,0.5)",
        alignItems: "center",
        justifyContent: "center"
    },
    modalContent: {
        width: width - 50,
        height: 300,
        borderRadius: 12,
        shadowColor: "black",
        // alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        backgroundColor: "#fff",
        padding: 15
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
    // main: {
    //     margin: 7,
    //     marginTop: 20,
    //     width: width / 3.6,
    //     alignItems: 'center'
    // },
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
    // image: {
    //     width: width / 3.8,
    //     height: width / 3.8,
    //     borderRadius: width / 7.6,
    //     resizeMode: 'contain',
    // },
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
    },
    lineContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    lineTitle: {
        fontSize: 18,
        color: "#ffffff",
    },
    lineInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingHorizontal: 14,
        fontSize: 16
    },
    lineButton: {
        height: 40,
        width: 40,
        // backgroundColor: '#FFF',
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        // paddingHorizontal: 10,
        marginLeft: 8,
        elevation: 4
    },
    lineButtonText: {
        fontSize: 16,
        color: '#333'
    },
    lineButtonImage: {
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    mainButton: {
        marginHorizontal: 5,
        flex: 1,
        height: 50,
        borderRadius: 100,
        backgroundColor: "#fff",
        elevation: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    mainButtonText: {
        fontSize: 24,
        fontWeight: "600",
        color: "#333"
    },
    modalButton: {
        width: "100%",
        height: 40,
        backgroundColor: "#238CFD",
        borderRadius: 20,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
    },


    main: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpText: {
        position: 'absolute',
        fontSize: 18,
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