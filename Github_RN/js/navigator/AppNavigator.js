import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation'
import {
    createStackNavigator
} from 'react-navigation-stack'
import {
    connect,
    provide
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

const navReducer = createNavigationReducer(AppNaviagtor);
const appReducer = combineReducers({
  nav: navReducer,
});

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state=>state.nav
);
const App = createReduxContainer(AppNaviagtor);
const mapStateToProps = (state) => ({
    state: state.nav,
  });
const AppWithNavigationState = connect(mapStateToProps)(App);


const store = createStore(
    appReducer,
    applyMiddleware(middleware),
  );
class Root extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      );
    }
}