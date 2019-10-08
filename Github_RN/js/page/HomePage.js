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

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import NavigationUtil from '../navigator/NaviagtionUtil';

export default class HomePage extends Component {

    _tabNavigator(){
        const tab = createBottomTabNavigator({
            PopularPage:{
                screen:PopularPage,
                navigationOptions:{
                    tabBarLabel:'最热',
                    tabBarIcon:({tintColor,focused})=>{
                       return <MaterialIcons 
                                name={'whatshot'}
                                size={26}
                                style={{color:tintColor}}
                            />
                    }
                }
            },
            TrendingPage:{
                screen:TrendingPage,
                navigationOptions:{
                    tabBarLabel:'趋势',
                    tabBarIcon:({tintColor,focused})=>{
                        return <Ionicons 
                                 name={'md-trending-up'}
                                 size={26}
                                 style={{color:tintColor}}
                             />
                     }
                }
            },
            FavoritePage: {
                screen: FavoritePage,
                navigationOptions:{
                    tabBarLabel:'收藏',
                    tabBarIcon:({tintColor,focused})=>{
                        return <MaterialIcons 
                                 name={'favorite'}
                                 size={26}
                                 style={{color:tintColor}}
                             />
                     }
                }
            },
            MyPage: {
                screen: MyPage,
                navigationOptions:{
                    tabBarLabel:'我的',
                    tabBarIcon:({tintColor,focused})=>{
                        return <Entypo 
                                 name={'user'}
                                 size={26}
                                 style={{color:tintColor}}
                             />
                     }
                }
            }
          });
        return tab;
    }

    render(){
        NavigationUtil.navigation = this.props.navigation;
        const Tab = createAppContainer(this._tabNavigator());

        return <Tab />;
    }
};
