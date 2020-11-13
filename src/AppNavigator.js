import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './screens/Main';
import images from './config/images';
import Contact from './screens/Contact';
import Circle from './screens/Circle';
import Notification from './screens/Notifications';
import Wallet from './screens/Wallet';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let img = images.group;
                        if (route.name === 'Home') { img = images.home }
                        else if (route.name === 'Wallet') { img = images.wallet }
                        else if (route.name === 'Contacts') { img = images.contact }
                        else if (route.name === 'Notifications') { img = images.notification }
                        return <Image source={img} style={{ width: route.name === 'My Circle' ? 37 : 46, height: 46, marginBottom: -5 }} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#F9C4B9',
                    inactiveTintColor: 'gray',
                    style: {
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        elevation: 0,
                        height: 70,
                    },
                }}
            >
                <Tab.Screen name="Home" component={Main} />
                <Tab.Screen name="Wallet" component={Wallet} />
                <Tab.Screen name="My Circle" component={Circle} />
                <Tab.Screen name="Contacts" component={Contact} />
                <Tab.Screen name="Notifications" component={Notification} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}