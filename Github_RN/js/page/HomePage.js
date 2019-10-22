/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {BackHandler} from 'react-native'
import {NavigationActions} from 'react-navigation'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import NavigationUtil from '../navigator/NaviagtionUtil';
import { connect } from 'react-redux';

 class HomePage extends Component {
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',this.onBackPress);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress',this.onBackPress);
    }
    /**
     * 处理安卓中的物理返回键
     * 
     */
    onBackPress= ()=>{
        const {dispatch, nav} = this.props;
        if(nav.routes[1].index === 0){//如果是RootNavigator中的MainNavigator的index
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    }
    render(){
        // const Tab = createAppContainer(this._tabNavigator());
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator />;
    }
};
const mapStateToProps = state=>({
    nav: state.nav,
});
const mapDispatchToProps = dispatch=> ({

});
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);