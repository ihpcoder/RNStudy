import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation'
import {
    createStackNavigator
} from 'react-navigation-stack'
import {
    connect,
    Provider
} from 'react-redux'
import {
    createStore,
    applyMiddleware,
    combineReducers,
  } from 'redux';
import {
    createNavigationReducer,
    createReactNavigationReduxMiddleware, 
    createReduxContainer
} from 'react-navigation-redux-helpers'
import React from 'react'

import Welcome from '../page/Welcome'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'

import store from '../store'



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

export  const switchNavigator =  createSwitchNavigator({
    Init:InitNavigator,
    Main:MainNavigator,
},{
    navigationOptions:{
        header:null
    }
});
export const AppNavigator = createAppContainer(switchNavigator);

export const middleware = createReactNavigationReduxMiddleware(
    state=>state.nav,
);
const App = createReduxContainer(AppNavigator);
const mapStateToProps = (state) => ({
    state: state.nav,
  });
const AppWithNavigationState = connect(mapStateToProps)(App);

class Root extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      );
    }
}
export default Root;