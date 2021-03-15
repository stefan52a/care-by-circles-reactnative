import React from 'react';
import { View, Modal, } from 'react-native';
import i from '../commons/i';
import LottieView from 'lottie-react-native';

export function CLoading() {

  return (
      <Modal
        visible={true}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={i.indicatorContainer}>
          <View style={i.indicator}>
            <LottieView source={require('./reload.json')} autoPlay loop />
          </View>
        </View>
      </Modal>
  )

}

