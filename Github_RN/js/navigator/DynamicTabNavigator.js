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
import {createBottomTabNavigator,BottomTabBar} from 'react-navigation-tabs'
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import  Ionicons from 'react-native-vector-icons/Ionicons'
import  Entypo from 'react-native-vector-icons/Entypo'
import {connect} from 'react-redux'
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import PopularPage from '../page/PopularPage'
import FavoritePage from '../page/FavoritePage'
import MyPage from '../page/MyPage'
import TrendingPage from '../page/TrendingPage'

const TABS = {
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
  };

class TabBarComponent extends Component{
    constructor(props){
        super(props);
        // this.theme = {
        //     tintColor: props.activeTintColor,
        //     updateTime: new Date().getTime(),
        // }
    }
    render(){
        // const {routes,index} = this.props.navigation.state;
        // if(routes[index].params){
        //     const {theme} = routes[index].params;
        //     if(theme&&theme.updateTime>this.theme.updateTime){
        //         this.theme = theme;
        //     }
        // }
        return <BottomTabBar
                    {...this.props}
                    activeTintColor={this.props.theme||this.props.activeTintColor}
                />  
    }
}

class DynamicTabNavigator extends Component {
    constructor(props){
        super(props);
        // console.disableYellowBox = true;//禁止黄色警告
    }
    _tabNavigator(){
        if(this.tabs){
            return this.tabs;
        }
        //通过控制判断选择需要显示的tabs以实现动态tabs
        const {PopularPage,TrendingPage,FavoritePage,MyPage} = TABS;
        const tabs = {PopularPage,TrendingPage,FavoritePage,MyPage};
        PopularPage.navigationOptions.tabBarLabel='最新';//动态配置显示tab属性
        return this.tabs = createAppContainer(createBottomTabNavigator(tabs,{
            tabBarComponent:props => {
                return <TabBarComponent theme={this.props.theme.themeColor} {...props}/>
            }
        }));
    }

    render(){
        const Tab = this._tabNavigator();
        return <Tab 
            onNavigationStateChange={(prevState,newState,action)=>{
                EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select,{
                    from: prevState.index,
                    to: newState.index,
                })
            }}
        />;
    }
};

const mapStateToProps = state=>({
    theme:state.theme.theme
});
export default connect(mapStateToProps)(DynamicTabNavigator);