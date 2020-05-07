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

const Root = () => {

    return (
        <View style={styles.container}>
            <Router >
                <Stack key="root" hideNavBar>
                    <Scene key="First" component={First}/>
                    <Scene key="Second" component={Second}/>
                    <Scene key="Third" component={Third}/>
                    <Scene key="Fourth" component={Fourth}/>
                    <Scene key="Five" component={Five}/>
                    <Scene key="Six" component={Six}/>
                    <Scene key="Seven" component={Seven}/>
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