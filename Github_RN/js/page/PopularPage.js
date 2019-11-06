import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux'
import actions from '../action'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import AnalyticsUtil from '../util/AnalyticsUtil'
import NavigationUtil from '../navigator/NaviagtionUtil';
import FetchDemoPage from './FetchDemoPage'
import PopularItem from '../common/PopularItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'
import FavoriteDao from '../expand/dao/FavoriteDao'
import { FLAG_STORAGE } from '../expand/dao/DataStore'
import FavoriteUtil from '../util/FavoriteUtil'
import EventTypes from '../util/EventTypes'
import EventBus from 'react-native-event-bus'
import { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import ArrayUtil from '../util/ArrayUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';

class PopularPage extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        this.props.onLoadLanguage(FLAG_LANGUAGE.flag_key);
    }
    _getTabs() {
        const keys = this.props.keys;
        const {theme} = this.props;
        if(!this.tabs||!ArrayUtil.isEquArray(keys,this.preLanguages)){
            this.tabs = {};
            this.preLanguages = [...keys];
            keys.forEach((item, index) => {
                if (item.checked) {
                   this.tabs[`tab${index}`] = {
                        screen: props => <PopularTabPage {...props} tabLabel={item.name} theme={theme}/>,
                        navigationOptions: {
                            title: item.name
                        }
                    }
                }
            });
        }
        return this.tabs;

    }
    renderRightButton(){
        const {theme} = this.props;
        return <TouchableOpacity
            onPress = {()=>{
                AnalyticsUtil.onEvent('searchButtonClick');
                NavigationUtil.goPage({...this.props},'SearchPage');
            }}
        >
            <View style={{padding:5,marginRight: 8}}>
                <Ionicons
                    name={'ios-search'}
                    size={24}
                    style={{
                        marginRight:8,
                        alignSelf:'center',
                        color: 'white'
                    }}
                />
            </View>
        </TouchableOpacity>

    }
    render() {
        const { keys,theme } = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        let navgarionBar = <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            style={theme.styles.navBar}
            rightButton={this.renderRightButton()}
        />
        const TabNavigator = keys.length > 0 ? createMaterialTopTabNavigator(this._getTabs(), {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                scrollEnabled: true,
                style: { backgroundColor: theme.themeColor },
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle,
            },
            lazy: true,
        }):null;
        const AppContainer = TabNavigator?createAppContainer(TabNavigator):null;
        return <View style={{ flex: 1, marginTop: 0 }}>
            {navgarionBar}
            {AppContainer?<AppContainer />:null}
        </View>
    }
};
const mapPopularPageStateToProps = state => ({
    keys: state.language.keys,
    theme:state.theme.theme,
});
const mapPopularPageDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag)),
});
export default connect(mapPopularPageStateToProps, mapPopularPageDispatchToProps)(PopularPage);



const pageSize = 10;
class PopularTab extends Component {
    constructor(props) {
        super(props);
        const { tabLabel } = this.props;
        this.storeName = tabLabel;
    }
    componentDidMount() {
        if (!this.favoriteDao) {
            this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        }
        this.loadData();
        EventBus.getInstance().addListener(EventTypes.favorite_changed_popular, this.listener = () => {
            this.loadData();
        })
    }
    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.listener);
    }
    loadData(loadMore) {
        const url = this.getFetchUrl(this.storeName);
        const { onLoadPopularData, onLoadMorePopular } = this.props;
        const store = this._store();
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show('没有更多了');
            }, this.favoriteDao);
        } else {
            onLoadPopularData(this.storeName, url, pageSize, this.favoriteDao);
        }
    }
    getFetchUrl(storeName) {
        return URL + storeName + QUERY_STR;
    }
    /**
     * 获取当前页面有关的数据
     */
    _store() {
        const { popular } = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
                hideLoadingMore: true,//默认隐藏还在更多
            }
        }
        return store;
    }
    onFavorite(item, isFavorite) {
        FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular);
    }
    _renderItem(data) {
        const projectModel = data.item;
        const {theme} = this.props;
        return (
            <PopularItem
                // key={item.item.id}
                projectModel={projectModel}
                theme={theme}
                onSelect={(callback) => {
                    NavigationUtil.goPage({
                        ...this.props,
                        projectModel: projectModel,
                        flag: FLAG_STORAGE.flag_popular,
                        callback,
                    }, 'DetailPage');
                }}
                onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
            />
        )
    }
    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text style={{ textAlign: 'center' }}>正在加载更多</Text>
            </View>
    }
    render() {
        const { popular } = this.props;
        let store = this._store();//动态获取数据
        return (
            <View style={styles.container}>
                <FlatList
                    // style={{backgroundColor:'red'}}
                    data={store.projectModels}
                    refreshing={store.isLoading}
                    renderItem={data => this._renderItem(data)}
                    keyExtractor={item => ('' + item.item.id)}
                    onRefresh={() => this.loadData()}
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                this.canLoadMore = false;
                                this.loadData(true);
                            }
                        }, 100);

                    }}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollBegin={() => {
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

const mapStateToProps = state => ({
    nav: state.nav,
    popular: state.popular

});
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onLoadPopularData(storeName, url, pageSize, favoriteDao)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, dataArray, callback, favoriteDao) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, dataArray, callback, favoriteDao)),
});
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    tabStyle: {
        minWidth: 50
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6
    },
    text: {
        fontSize: 15,
        marginTop: 15
    },
    indicatorcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        color: 'red',
        margin: 10,

    }
});
