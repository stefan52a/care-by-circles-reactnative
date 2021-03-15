import { observer } from 'mobx-react';
import React from 'react';
import { Text, View } from 'react-native';

import MainStore from '../store/MainStore'
import Dialog, { FadeAnimation } from 'react-native-popup-dialog'

const DisplayNotification = observer(() => {
    // we display notification in alert box with title and body
    console.log("mainstore----1", MainStore.visible)
    return (
        <Dialog
            dialogAnimation={new FadeAnimation()}
            onTouchOutside={() => {
                MainStore.notifications = [];
                MainStore.visible = false;
            }}
            dialogStyle={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                position: "absolute",
                backgroundColor: "#FFFFFF",
                top: 0,
                left: 0,
                padding: 10,
                paddingBottom: 0,
            }}
            visible={MainStore.visible}
        >
            {MainStore.notifications.map((item, i) => {
                console.log("mainstore----1", item.title, item.body)
                return (
                    <View style={{
                        width: "100%",
                        paddingHorizontal: 26,
                        paddingVertical: 5,
                        borderWidth: 1,
                        borderColor: "#C1C1C1",
                        marginBottom: 10,
                        borderRadius: 5
                    }}>
                        <Text style={{
                            textAlign: "left",
                            color: "#333333",
                            fontSize: 15,
                            fontWeight: "bold",
                            marginBottom: 5
                        }}>
                            {item.title}
                        </Text>
                        <Text style={{
                            textAlign: "left",
                            color: "#333333",
                            fontSize: 13,
                        }}>
                            {item.body}
                        </Text>
                    </View>
                )
            })}
        </Dialog >
    )
})

export default DisplayNotification;

