import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const { width, height } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 300;
const isIPhoneX = Platform.OS === 'ios' && (SCREEN_WIDTH >= 812 || SCREEN_HEIGHT >= 812)

export function p(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export const Const = {
  width,
  height,
  isIPhoneX,
  ToolbarHeight: Platform.OS === 'android' ? 0 : isIPhoneX ? 44 : 22,
  HeaderHeight: 50
}