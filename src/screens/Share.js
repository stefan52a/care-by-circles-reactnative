/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Share from 'react-native-share';

import imgs from '../config/imagesBase64';

const ShareScreen = () => {

  const shareSingleImage = async () => {
    const shareOptions = {
      title: 'Share file',
      url: imgs.image1,
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
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native Share Example!</Text>
      <View style={styles.optionsRow}>

        <View style={styles.button}>
          <Button onPress={shareSingleImage} title="Share Single Image" />
        </View>
  
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    borderBottomColor: '#151313',
    borderBottomWidth: 1,
    marginRight: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  resultTitle: {
    marginTop: 20,
    fontSize: 20,
  },
  result: {
    fontSize: 14,
    margin: 10,
  },
  optionsRow: {
    justifyContent: 'space-between',
  },
  withInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default ShareScreen;