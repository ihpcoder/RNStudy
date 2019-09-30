/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FlatListDemo from './pages/FlatListDemo'

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
    }
},{

})
const AppContanier = createAppContainer(AppRootNav);

AppRegistry.registerComponent(appName, () => AppContanier);
