import React,{Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { createAppContainer,refreshControl } from 'react-navigation';
import {connect} from 'react-redux'
import actions from '../action/index'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import NavigationUtil from '../navigator/NaviagtionUtil';
import FetchDemoPage from './FetchDemoPage'
import PopularItem from '../common/PopularItem'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars';
export default class PopularPage extends Component {
    constructor(props){
        super(props);
        this.tabNames= ['Java','Android','iOS','ReactNative','ionic','PHP'];
    }
    _getTabs(){
        const tabs = {};
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`] = {
                screen:props=><PopularTabPage {...props} tabLabel={item}/>,
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
    constructor(props){
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        const url = this.getFetchUrl(this.storeName);
        this.props.onLoadPopularData(this.storeName,url);
    }
    getFetchUrl(storeName){
        return URL+storeName+QUERY_STR;
    }
    _renderItem(data){
        const item = data.item;
        return (
        <View style={{marginBottom:10}}>
            <PopularItem
                item={item}
                onSelect={(item)=>{
                    console.log('----'+item.id);
                }}
            />
        </View>
        )
    }
    render(){
        const {popular}=this.props;
        let store = popular[this.storeName];//动态获取数据
        if(!store){
            store={
                items:[],
                isLoading:false,
            }
        }
        return (
            <View style={styles.container}>
            <FlatList
                style={{backgroundColor:'red'}}
                data={store.items}
                refreshing={store.isLoading}
                renderItem={data=>this._renderItem(data)}
                keyExtractor={item=>''+item.id}
                onRefresh={()=>this.loadData()}
            />
            </View>
        );
    }
};

const mapStateToProps = state=>({
    nav:state.nav,
    popular: state.popular

});
const mapDispatchToProps = dispatch=>({
    onLoadPopularData: (storeName,url)=>dispatch(actions.onLoadPopularData(storeName,url)),
})
const PopularTabPage = connect(mapStateToProps,mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
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
    },
    text:{
        fontSize:15,
        marginTop: 15
    }
});
