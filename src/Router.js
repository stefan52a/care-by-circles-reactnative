import React, { useState, useEffect } from 'react'

import {
    StyleSheet,
    View
} from 'react-native'

import {
    Scene,
    Router,
    Stack
} from 'react-native-router-flux'

import First from './screens/First';
import Second from './screens/Second';
import Third from './screens/Third';
import Fourth from './screens/Fourth';
import Five from './screens/Five';
import Six from './screens/Six';
import Seven from './screens/Seven';
import Seed from './screens/Seed';
import Home from './screens/Home';
import SignInUp from './screens/SignInUp';
import GenerateWallet from './screens/GenerateWallet'
import Main from './screens/Main';
import AppNavigator from './AppNavigator';
import Wallet from './screens/Wallet';
import TimeLeft from './screens/TimeLeft';

import firebase from "react-native-firebase";
import { Actions } from 'react-native-router-flux';
import DisplayNotification from './components/NotificationModal'
import MainStore from './store/MainStore'

let notificationData = [];
let fcmManagerTopic;

const Root = () => {

    const [token, setToken] = useState(0);
    const [showAlarmModal, setShowAlarmModal] = useState(false);

    useEffect(() => {
        // async function fetchData() {
        //     const token = await UtilService.getLocalStringData(STORE_KEY_AUTH_TOKEN);
        //     const user = await UtilService.getLocalStringData(STORE_AUTH_USER);
        //     console.log('******** token 1************', token)

        //     if (token) {
        //         Cache.currentUser = JSON.parse(user);
        //         Cache.token = token;
        //         console.log('******** token ************', token)
        //     }

        //     setToken(token || "");
        // }
        // fetchData();


        notificationData = [];
        checkPermission();
        createNotificationListeners();


    }, [])

    //Check if permission given
    const checkPermission = async () => {

        // fcmManagerTopic = await AsyncStorage.getItem("FCM_MANAGER_TOKEN");
        fcmManagerTopic = "testCarebycircle"
        const enabled = await firebase.messaging().hasPermission()
        if (enabled) {

            firebase.messaging()
                .subscribeToTopic(fcmManagerTopic)
                .then(() => console.log('Subscribed to topic!'));

        } else {
            requestPermission()
        }
    }

    //Request permission if not granted
    const requestPermission = async () => {
        try {
            await firebase.messaging().requestPermission()
            // getToken()

            firebase.messaging()
                .subscribeToTopic(fcmManagerTopic)
                .then(() => console.log('Subscribed to topic!'));

        } catch (error) {
            console.log("permission rejected")
        }
    }

    //Store Firebase token
    const getToken = async () => {
        let fcmToken = null;

        try {
            fcmToken = await AsyncStorage.getItem("fcmToken");
            console.log("fcmToken: ", fcmToken)
        } catch (e) {
            console.log(
                "error trying to fetch fcm token (it likely does not exist)",
                e
            )
        }

        if (!fcmToken) {
            console.log("fcm token is null")

            try {
                fcmToken = await firebase.messaging().getToken()
            } catch (e) { }

            if (fcmToken) {
                console.log("fcm token is no longer null", fcmToken)
                try {
                    console.log("current fcm token", fcmToken)
                    await AsyncStorage.setItem("fcmToken", fcmToken)
                } catch (e) {
                    console.log("could not save fcm token to async storage", e)
                }
            }
        }
    }

    const createNotificationListeners = async () => {
        console.log("createNotificationListeners start");
        //Message received while app in foreground
        let notificationListener = firebase
            .notifications()
            .onNotification(notification => {
                console.log("received_notification_message--1-before")
                MainStore.visible = true;
                MainStore.push({
                    title: notification.title,
                    body: notification.body
                });
            });

        //Data Only Message
        let messageListener = firebase.messaging().onMessage(message => {
            console.log("received_notification_message--2-before")
            MainStore.visible = true;
            MainStore.push({
                title: message.data.title,
                body: message.data.msg
            });
        })
    }


    return (
        <View style={styles.container}>
            <DisplayNotification />
            <Router >
                <Stack key="root" hideNavBar>
                    <Scene key="Nav" component={AppNavigator} initial={false} />
                    <Scene key="Main" component={Main} />
                    <Scene key="Home" component={Home} />
                    <Scene key="SignInUp" component={SignInUp} initial={true} />
                    <Scene key="GenerateWallet" component={GenerateWallet} />
                    <Scene key="Seed" component={Seed} />
                    <Scene key="First" component={First} />
                    <Scene key="Second" component={Second} />
                    <Scene key="Third" component={Third} />
                    <Scene key="Fourth" component={Fourth} />
                    <Scene key="Five" component={Five} />
                    <Scene key="Six" component={Six} />
                    <Scene key="Seven" component={Seven} />
                    <Scene key="TimeLeft" component={TimeLeft} />
                </Stack>
            </Router>
        </View>
    )
}

export default Root;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})