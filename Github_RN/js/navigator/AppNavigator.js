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
import FetchDemoPage from '../page/FetchDemoPage'
import AsyncStorageDemoPage from '../page/AsyncStorageDemoPage'
import DataStoreDemoPage from '../page/DataStoreDemoPage'
import WebViewPage from '../page/WebViewPage'
import CustomKeyPage from '../page/CustomKeyPage'
import SortKeyPage from '../page/SortKeyPage'
import SearchPage from '../page/SearchPage'
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
            header:null,
        }
    },
    DetailPage:{
        screen:DetailPage,
        navigationOptions:{
            title:'DetailPage',
            header:null
        }
    },
    WebViewPage:{
        screen:WebViewPage,
        navigationOptions:{
            header:null
        }
    },
    CustomKeyPage:{
        screen:CustomKeyPage,
        navigationOptions:{
            header:null,
        }
    },
    SortKeyPage:{
        screen:SortKeyPage,
        navigationOptions:{
            header:null
        }
    },
    SearchPage:{
        screen:SearchPage,
        navigationOptions:{
            header:null,
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