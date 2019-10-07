/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FlatListDemo from './pages/FlatListDemo'
import FlatListDemo2 from './pages/FlatListDemo2'
import SwipeableFlatListDemo from './pages/SwipeableFlatListDemo'
import SectionListDemo from './pages/SectionListDemo'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

const AppRootNav = createStackNavigator({
    App:{
        screen:App,
    },
    FlatListDemo:{
        screen:FlatListDemo,
        navigationOptions:{
            title:'FlatListDemo',
        }
    },
    FlatListDemo2:{
        screen:FlatListDemo2,
        navigationOptions:{
            title:'FlatListDemo2',
        }
    },
    SwipeableFlatListDemo:{
        screen:SwipeableFlatListDemo,
        navigationOptions:{
            title:'SwipeableFlatListDemo'
        }
    },
    SectionListDemo:{
        screen:SectionListDemo,
        navigationOptions:{
            title:'SectionListDemo',
        }
    }
},{

})
const AppContanier = createAppContainer(AppRootNav);

AppRegistry.registerComponent(appName, () => AppContanier);
