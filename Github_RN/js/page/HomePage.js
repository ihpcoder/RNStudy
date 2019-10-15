/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React,{Component} from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs'
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import  Ionicons from 'react-native-vector-icons/Ionicons'
import  Entypo from 'react-native-vector-icons/Entypo'
import PopularPage from './PopularPage'
import FavoritePage from './FavoritePage'
import MyPage from './MyPage'
import TrendingPage from './TrendingPage'

import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import NavigationUtil from '../navigator/NaviagtionUtil';

export default class HomePage extends Component {
    render(){
        // const Tab = createAppContainer(this._tabNavigator());
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator />;
    }
};
