import React,{Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { createAppContainer} from 'react-navigation';
import {connect} from 'react-redux'
import actions from '../action/index'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import NavigationUtil from '../navigator/NaviagtionUtil';
import FetchDemoPage from './FetchDemoPage'
import PopularItem from '../common/PopularItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
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
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle:'light-content',
        }
        let navgarionBar = <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            style={{backgroundColor:THEME_COLOR}}
        />
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
      return <View style={{flex:1,marginTop:0}}>
            {navgarionBar}
            <AppContainer />
      </View>
      
      
    }
};
const pageSize = 10;
class PopularTab extends Component {
    constructor(props){
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(loadMore){
        const url = this.getFetchUrl(this.storeName);
        const {onLoadPopularData, onLoadMorePopular} = this.props;
        const store = this._store();
        if(loadMore){
            onLoadMorePopular(this.storeName,++store.pageIndex,pageSize,store.items,callback=>{
                this.refs.toast.show('没有更多了');
            });
        }else{
            onLoadPopularData(this.storeName,url,pageSize);
        }
    }
    getFetchUrl(storeName){
        return URL+storeName+QUERY_STR;
    }
    /**
     * 获取当前页面有关的数据
     */
    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if(!store){
            store = {
                items:[],
                isLoading: false,
                projectModes: [],//要显示的数据
                hideLoadingMore: true,//默认隐藏还在更多
            }
        }
        return store;
    }
    _renderItem(data){
        const item = data.item;
        return (
            <PopularItem
                item={item}
                onSelect={(item)=>{
                    NavigationUtil.goPage({
                        projectModel:item
                    },'DetailPage');
                }}
            />
        )
    }
    genIndicator(){
        return this._store().hideLoadingMore?null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text style={{textAlign:'center'}}>正在加载更多</Text>
            </View>
    }
    render(){
        const {popular}=this.props;
        let store = this._store();//动态获取数据
        return (
            <View style={styles.container}>
            <FlatList
                // style={{backgroundColor:'red'}}
                data={store.projectModes}
                refreshing={store.isLoading}
                renderItem={data=>this._renderItem(data)}
                keyExtractor={item=>''+item.id}
                onRefresh={()=>this.loadData()}
                ListFooterComponent={()=>this.genIndicator()}
                onEndReached={()=>{
                    setTimeout(() => {
                        if(this.canLoadMore){
                            this.canLoadMore = false;
                            this.loadData(true);
                        }
                    }, 100);
                    
                }}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={()=>{
                    this.canLoadMore = true;
                }}
            />
            <Toast
                ref={'toast'}
                position={'center'}
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
    onLoadPopularData: (storeName,url,pageSize)=>dispatch(actions.onLoadPopularData(storeName,url,pageSize)),
    onLoadMorePopular: (storeName,pageIndex,pageSize,dataArray,callback)=>dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,dataArray,callback)),
});
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
    },
    indicatorcontainer:{
        alignItems:'center',
        justifyContent:'center',
    },
    indicator:{
        color: 'red',
        margin: 10,

    }
});
