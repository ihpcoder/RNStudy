import {
    connect,
    Provider
} from 'react-redux'
import {
    createNavigationReducer,
    createReactNavigationReduxMiddleware, 
    createReduxContainer
} from 'react-navigation-redux-helpers'
import React from 'react'

import AppNavigator from '../navigator/AppNavigator'
import store from '../store'


export const middleware = createReactNavigationReduxMiddleware(
    state=>state.nav,
);
const AppReduxContainer = createReduxContainer(AppNavigator);
const mapStateToProps = (state) => ({
    state: state.nav,
  });
const AppWithNavigationState = connect(mapStateToProps)(AppReduxContainer);

export default class App extends React.Component {
    render() {
      console.disableYellowBox = true;//禁止黄色警告
      return (
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      );
    }
}