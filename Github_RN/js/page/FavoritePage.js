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
  Dimensions,
} from 'react-native';
import NavigationUtil from '../navigator/NaviagtionUtil';
import FetchDemoPage from './FetchDemoPage'
import PopularItem from '../common/PopularItem'
import TrendingItem from '../common/TrendingItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'
import FavoriteDao from '../expand/dao/FavoriteDao'
import {FLAG_STORAGE} from '../expand/dao/DataStore'
import FavoriteUtil from '../util/FavoriteUtil'
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'


const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
const {height, width} = Dimensions.get('window');
class FavoritePage extends Component {
    constructor(props){
        super(props);
        this.tabNames= ['最热','趋势'];
    }
    // _getTabs(){
    //     const tabs = {};
    //     this.tabNames.forEach((item,index)=>{
    //         tabs[`tab${index}`] = {
    //             screen:props=><FavoriteTabPage {...props} tabLabel={item}/>,
    //             navigationOptions:{
    //                 title:item
    //             }
    //         }
    //     });
    //     return tabs;
    // }
    
    render(){
        const {theme} = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle:'light-content',
        }
        let navgarionBar = <NavigationBar
            title={'收藏'}
            statusBar={statusBar}
            style={theme.styles.navBar}
        />
        const TabNavigator=createMaterialTopTabNavigator({
          'Popular': {
            screen: props=><FavoriteTabPage {...props} flag = {FLAG_STORAGE.flag_popular} theme={theme}/> ,
            navigationOptions:{
              title: '最热'
            }
          },
          'Trending': {
            screen: props=><FavoriteTabPage {...props} flag = {FLAG_STORAGE.flag_trending} theme={theme}/> ,
            navigationOptions:{
              title: '趋势'
            }
          }
        },{
            tabBarOptions:{
                tabStyle:styles.tabStyle,
                upperCaseLabel:false,
                // scrollEnabled:true,
                style:{backgroundColor:theme.themeColor},
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
const mapFacoritePageStateToProps = state=>({
    theme: state.theme.theme
})
export default connect(mapFacoritePageStateToProps)(FavoritePage);



const pageSize = 10;
class FavoriteTab extends Component {
    constructor(props){
        super(props);
        const {flag} = this.props;
        this.storeName = flag;
        this.favoriteDao = new FavoriteDao(flag);
    }
    componentDidMount(){
      this.loadData(true);
       EventBus.getInstance().addListener(EventTypes.bottom_tab_select,this.listener= data=>{
        if(data.to===2){
          this.loadData(false);
        }
      })
    }
    componentWillUnmount(){
      EventBus.getInstance().removeListener(this.listener);
    }

    loadData(isShowLoading){
        const {onLoadFavoriteData} = this.props;
        onLoadFavoriteData(this.storeName,isShowLoading)
    }
    /**
     * 获取当前页面有关的数据
     */
    _store() {
        const {favorite} = this.props;
        let store = favorite[this.storeName];
        if(!store){
            store = {
                items:[],
                isLoading: false,
                projectModels: [],//要显示的数据
            }
        }
        return store;
    }
    onFavorite(item, isFavorite){
        FavoriteUtil.onFavorite(this.favoriteDao,item,isFavorite,this.storeName);
        this.loadData(false);
        if(this.storeName===FLAG_STORAGE.flag_popular){
          EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular,{

          });
        }else{
          EventBus.getInstance().fireEvent(EventTypes.favorite_changed_trending,{

          });
        }
    }
    _renderPopularItem(data){
        const projectModel = data.item;
        return (
            <PopularItem
                key={''+projectModel.item.id}
                projectModel={projectModel}
                onSelect={(callback)=>{
                    NavigationUtil.goPage({
                        ...this.props,
                        projectModel:projectModel,
                        flag:this.storeName,
                        callback,
                    },'DetailPage');
                }}
                onFavorite={(item,isFavorite)=>this.onFavorite(item,isFavorite)}
            />
        )
    }
    _renderTrendingItem(data){
      const item = data.item;
        return (
            <TrendingItem
                projectModel={item}
                onSelect={(callback)=>{
                    NavigationUtil.goPage({
                        projectModel:item,
                        flag:FLAG_STORAGE.flag_trending,
                        callback,
                    },'DetailPage');
                }}
                onFavorite={(item, isFavorite)=>this.onFavorite(item,isFavorite)}
            />
        )
    }
    render(){
        const {favorite}=this.props;
        let store = this._store();//动态获取数据
        return (
            <View style={styles.container}>
            <FlatList
                // style={{backgroundColor:'red'}}
                data={store.projectModels}
                refreshing={store.isLoading}
                renderItem={data=>(this.storeName===FLAG_STORAGE.flag_popular?this._renderPopularItem(data):this._renderTrendingItem(data))}
                keyExtractor={item=>(
                  ''+item.item.id||item.item.fullName
                  )}
                onRefresh={()=>this.loadData(true)}
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
    favorite: state.favorite,
    
});
const mapDispatchToProps = dispatch=>({
    onLoadFavoriteData: (flag,isLoading)=>dispatch(actions.onLoadFavoriteData(flag,isLoading)),
});
const FavoriteTabPage = connect(mapStateToProps,mapDispatchToProps)(FavoriteTab);

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
        // width: width/2.,
    },
    indicatorStyle:{
        height:2,
        backgroundColor:'white'
    },
    labelStyle:{
        fontSize:13,
        marginTop:6,
        marginBottom:6,
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