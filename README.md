# Care By Circles Oracle

Android & iOS client, WIP

See https://CareByCircles.Com

[![Promo Care By Circles](READMEImages/CareByCircles.gif)](https://youtu.be/YczwK4v-uJ0)

Smartphone client for CirclesOracle.

## Current status ##

WIP:

![Android Care By Circles](READMEImages/android202011b.gif)

Care by Circles, social inclusion.

Circles are tribes with a maximum of 150 (Dunbar's number) people each.

Under the hood it uses Bitcoin blockchain principles for consensus and Oracle contracts with Partially Signed Bitcoin Transactions (PSBT).

For more information see the server "Care by Circles Oracle" https://github.com/stefan52a/care-by-circles-oracle.

## How to run ##

Once:
````
npm install -g react-native-cli
npm i
./node_modules/.bin/rn-nodeify --hack --install
````
Every time e.g. when debugging:
````
react-native run-android
````
after the app has started, press ctrl-M to call the debugger, or send from your PC:
````
adb shell input keyevent 82
````
For further debugging assistance see https://reactnative.dev/docs/debugging, and also see https://developers.google.com/web/tools/chrome-devtools/remote-debugging/
