import React,{Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import NavigationUtil from '../navigator/NaviagtionUtil';
import { blue } from 'ansi-colors';


export default class PopularPage extends Component {
    constructor(props){
        super(props);
        this.tabNames= ['Java','Android','iOS','ReactNative','ionic','PHP'];
    }
    _getTabs(){
        const tabs = {};
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`] = {
                screen:props=><PopularTab {...props} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }
            }
        });
        return tabs;
    }
    render(){
        const TabNavigator=createMaterialTopTabNavigator(this._getTabs(),{
            tabBarOptions:{
                tabStyle:styles.tabStyle,
                upperCaseLabel:false,
                scrollEnabled:true,
                style:{backgroundColor:'#678'},
                indicatorStyle:styles.indicatorStyle,
                labelStyle:styles.labelStyle,
                    
            }
        });
        const AppContainer = createAppContainer(TabNavigator);
      return <AppContainer />
    }
};

class PopularTab extends Component {

    render(){
        const {tabLabel}=this.props;
        return (
            <View style={styles.container}>
            <Text style={styles.welcome}>{tabLabel}</Text>
            <Text onPress={()=>{
                    NavigationUtil.goPage(this.props,'DetailPage')
                    }
                }>
                跳转到详情页
            </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'red',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin:10,
    },
    tabStyle:{
        minWidth:50
    },
    indicatorStyle:{
        height:2,
        backgroundColor:'white'
    },
    labelStyle:{
        fontSize:13,
        marginTop:6,
        marginBottom:6
    }
});
