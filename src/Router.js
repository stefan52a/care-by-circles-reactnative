import React from 'react'

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

const Root = () => {

    return (
        <View style={styles.container}>
            <Router >
                <Stack key="root" hideNavBar>
                    <Scene key="Nav" component={AppNavigator} initial={false}/>
                    <Scene key="Main" component={Main} />
                    <Scene key="Home" component={Home}/>
                    <Scene key="SignInUp" component={SignInUp} initial={true}/>
                    <Scene key="GenerateWallet" component={GenerateWallet}/>
                    <Scene key="Seed" component={Seed} />                    
                    <Scene key="First" component={First} />
                    <Scene key="Second" component={Second} />
                    <Scene key="Third" component={Third}/>
                    <Scene key="Fourth" component={Fourth}/>
                    <Scene key="Five" component={Five}/>
                    <Scene key="Six" component={Six}/>
                    <Scene key="Seven" component={Seven}/>
                    <Scene key="TimeLeft" component={TimeLeft}/>
                </Stack>
            </Router>
        </View>
    )
}

export default Root;

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})