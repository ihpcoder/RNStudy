import React,{Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { createAppContainer} from 'react-navigation';
import {connect} from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import actions from '../action/index'
import NavigationUtil from '../navigator/NaviagtionUtil'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  DeviceEventEmitter,
  RefreshControl,
} from 'react-native';
import TrendingDialog,{TimeSpans} from '../common/TrendingDialog'
import TrendingItem from '../common/TrendingItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'
import FavoriteDao from '../expand/dao/FavoriteDao'
import {FLAG_STORAGE} from '../expand/dao/DataStore'
import FavoriteUtil from '../util/FavoriteUtil'

const URL = 'https://github.com/trending'
const QUERY_STR = '?since=daily';
const THEME_COLOR = '#678';
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';


export default class TrendingPage extends Component {
    constructor(props){
        super(props);
        this.tabNames= ['All','C','C#','PHP','TypeScript','JavaScript'];
        this.state={
            timeSpan: TimeSpans[0],
        }
    }
    _getTabs(){
        const tabs = {};
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`] = {
                screen:props=><TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }
            }
        });
        return tabs;
    }
    onSelectTimeSpan(item){
        this.dialog.dismiss();
        this.setState({
            timeSpan: item,
        });
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE,item);
    }
    renderTitleView(){
        return<View>
            <TouchableOpacity
                ref={'button'}
                underlayerColor={'transparent'}
                onPress={()=>{this.dialog.onShow()}}
            >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{
                        fontSize:18,
                        color: '#ffffff',
                        fontWeight:'400'
                    }}>趋势 {this.state.timeSpan.showText}
                    </Text>
                    <MaterialIcons
                        name='arrow-drop-down'
                        size={22}
                        color={'white'}
                    />
                </View>

            </TouchableOpacity>
        </View>
    }
    renderTrendingDialog(){
        return <TrendingDialog
            ref={dialog=>{this.dialog=dialog}}
            onSelect={(item)=>this.onSelectTimeSpan(item)}
            onClose={()=>{

            }}
        />
    }
    _tabNav(){
        if(!this.tabNav){
          this.tabNav = createAppContainer(createMaterialTopTabNavigator(this._getTabs(),{
                tabBarOptions:{
                    tabStyle:styles.tabStyle,
                    upperCaseLabel:false,
                    scrollEnabled:true,
                    style:{backgroundColor:'#678'},
                    indicatorStyle:styles.indicatorStyle,
                    labelStyle:styles.labelStyle,
                }
            }));
        }
        return this.tabNav;
    }
    render(){
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle:'light-content',
        }
        let navgarionBar = <NavigationBar
            // title={'趋势'}
            titleView={this.renderTitleView()}
            statusBar={statusBar}
            style={{backgroundColor:THEME_COLOR}}
        />
        const AppContainer = this._tabNav();
      return <View style={{flex:1,marginTop:0}}>
            {navgarionBar}
            <AppContainer />
            {this.renderTrendingDialog()}
      </View>
      
      
    }
};
const pageSize = 10;
class TrendingTab extends Component {
    constructor(props){
        super(props);
        const {tabLabel,timeSpan} = this.props;
        this.storeName = tabLabel;
        this.timeSpan = timeSpan;
    }
    componentDidMount(){
        this.loadData();
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE,(timeSpan)=>{
            this.timeSpan = timeSpan;
            this.loadData();
        })
    }
    componentWillUnmount(){
        if(this.timeSpanChangeListener){
            this.timeSpanChangeListener.remove();
        }
    }
    loadData(loadMore){
        const url = this.getFetchUrl(this.storeName);
        const {onLoadTrendingData, onLoadMoreTrending} = this.props;
        const store = this._store();
        if(loadMore){
            onLoadMoreTrending(this.storeName,++store.pageIndex,pageSize,store.items,callback=>{
                this.refs.toast.show('没有更多了');
            },this.favoriteDao);
        }else{
            onLoadTrendingData(this.storeName,url,pageSize,this.favoriteDao);
        }
    }
    getFetchUrl(storeName){
        if(storeName==='All'){
            return URL+'?'+this.timeSpan.searchText;
        }
        return URL+'/'+storeName+'?'+this.timeSpan.searchText;
    }
    /**
     * 获取当前页面有关的数据
     */
    _store() {
        const {trending} = this.props;
        let store = trending[this.storeName];
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
            <TrendingItem
                projectModel={item}
                onSelect={(item)=>{
                    NavigationUtil.goPage({
                        projectModel:item
                    },'DetailPage');
                }}
                onFavorite={(item, isFavorite)=>{
                    FavoriteUtil.onFavorite(this.favoriteDao,item,isFavorite,FLAG_STORAGE.flag_);
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
        const {trending}=this.props;
        let store = this._store();//动态获取数据
        return (
            <View style={styles.container}>
            <FlatList
                // style={{backgroundColor:'red'}}
                data={store.projectModes}
                renderItem={data=>this._renderItem(data)}
                keyExtractor={item => '' + (item.id||item.fullName)}
                // refreshing={store.isLoading}
                // onRefresh={()=>this.loadData()}
                refreshControl={
                    <RefreshControl
                        title={'下拉刷新'}
                        titleColor={'orange'}
                        titleColor={'red'}
                        refreshing={store.isLoading}
                        onRefresh={
                            ()=>this.loadData()
                        }
                        />
                }
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
                    this.canLoadMore = !trending[this.storeName].hideLoadingMore;
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
    trending: state.trending

});
const mapDispatchToProps = dispatch=>({
  onLoadTrendingData: (storeName,url,pageSize,favoriteDao)=>dispatch(actions.onLoadTrendingData(storeName,url,pageSize,favoriteDao)),
  onLoadMoreTrending: (storeName,pageIndex,pageSize,dataArray,callback,favoriteDao)=>dispatch(actions.onLoadMoreTrending(storeName,pageIndex,pageSize,dataArray,callback,favoriteDao)),
});
const TrendingTabPage = connect(mapStateToProps,mapDispatchToProps)(TrendingTab);

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
