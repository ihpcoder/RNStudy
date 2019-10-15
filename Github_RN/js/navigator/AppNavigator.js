import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation'
import {
    createStackNavigator
} from 'react-navigation-stack'
import React from 'react'
import Welcome from '../page/Welcome'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'

export const rootCom = 'Init';// 设置根路由
const InitNavigator = createStackNavigator({
    Welcome: {
        screen:Welcome,
        navigationOptions:{
            header:null,//隐藏导航条
        }
    }
},{});

const MainNavigator = createStackNavigator({
    HomePage:{
        screen:HomePage,
        navigationOptions:{
            title:'HomePage',
        }
    },
    DetailPage:{
        screen:DetailPage,
        navigationOptions:{
            title:'DetailPage',
        }
    }
});
 const switchNavigator =  createSwitchNavigator({
    Init:InitNavigator,
    Main:MainNavigator,
},{
    navigationOptions:{
        header:null
    }
});
 const AppNavigator = createAppContainer(switchNavigator);

 export default AppNavigator;