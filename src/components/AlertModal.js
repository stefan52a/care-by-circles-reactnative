import React from 'react'
import {
    Modal
} from 'react-native'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

const AlertModal = (props) => {

    return (
        <Modal
            transparent
            onRequestClose={() => { }}
            visible={props.visible}
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.text}>{props.message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => {Actions.Seven(); props.onClose(false);}} style={styles.button}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.onClose(false)} style={styles.button}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AlertModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        borderRadius: 5,
        backgroundColor: 'rgb(230, 150, 150)',
        height: 180,
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent:'space-between'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width:'100%',
        marginTop:15,
    },
    button: {
        backgroundColor: 'white',
        height: 40,
        width: 100,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    }
})