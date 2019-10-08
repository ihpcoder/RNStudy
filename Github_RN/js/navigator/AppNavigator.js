import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs'


import Welcome from '../page/Welcome'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'

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
const AppNaviagtor = createAppContainer(switchNavigator);
export default AppNaviagtor;