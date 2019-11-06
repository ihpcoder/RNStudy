import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../action'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Platform,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import NavigationUtil from '../navigator/NaviagtionUtil';
import PopularItem from '../common/PopularItem'
import Toast from 'react-native-easy-toast'
import ViewUtil from '../util/ViewUtil'
import FavoriteDao from '../expand/dao/FavoriteDao'
import { FLAG_STORAGE } from '../expand/dao/DataStore'
import FavoriteUtil from '../util/FavoriteUtil'
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import action from '../action';
import Utils from '../util/Utils';
import { yellow } from 'ansi-colors';
// import { TextInput } from 'react-native-gesture-handler';
const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars';

const pageSize = 10;
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.isKeyChange = false;
    }
    loadData(loadMore) {
        const url = this.getFetchUrl(this.storeName);
        const { onLoadMoreSearch, onSearch, search, keys } = this.props;
        if (loadMore) {
            onLoadMoreSearch(++search.pageIndex, pageSize, search.items, callback => {
                this.refs.toast.show('没有更多了');
            }, this.favoriteDao);
        } else {
            onSearch(this.inputKey, pageSize, this.searchToken = new Date().getTime(), this.favorireDao, keys, message => {
                this.refs.toast.show(message);
            });
        }
    }
    getFetchUrl(storeName) {
        return URL + storeName + QUERY_STR;
    }
    onFavorite(item, isFavorite) {
        FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular);
    }
    onBackPress() {
        const { onSearchCancel, onloadLanguage } = this.props;
        this.refs.input.blur();
        onSearchCancel(this.searchToken);
        if (this.isKeyChange) {
            onloadLanguage(FLAG_LANGUAGE.flag_key);
        }
        NavigationUtil.goBack(this.props.navigation);
    }
    onRightButtonClick() {
        const { onSearchCancel, search } = this.props;
        if (search.showText === '搜索') {
            this.loadData();
        } else {
            onSearchCancel(this.searchToken);
        }
    }
    saveKey() {
        const {keys} = this.props;
        let key = this.inputKey;
        if(Utils.checkKeysIsExist(keys,key)){
            this.refs.toast.show(`${key}标签已存在`);
        }else{
            key = {
                "path": key,
                "name": key,
                "checked":true,
            };
            keys.unshift(key);//将key添加到数组的开头
            this.languageDao.save(keys);
            this.refs.toast.show(key.name + '保存成功');
            this.isKeyChange = true;
        }
    }
    _renderItem(data) {
        const projectModel = data.item;
        const { theme } = this.params;
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
        return this.props.search.hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text style={{ textAlign: 'center' }}>正在加载更多</Text>
            </View>
    }
    renderNavBar() {
        const { showText, inputKey } = this.props.search;
        const { theme } = this.params;
        const placeholder = inputKey || '请输入';
        let backButton = ViewUtil.getLeftBackButton(() => {
            this.onBackPress();
        });
        let inputView = <TextInput
            ref='input'
            placeholder={placeholder}
            onChangeText={text => this.inputKey = text}
            style={styles.TextInput}
        />
        let rightButton = <TouchableOpacity
            onPress={() => {
                this.refs.input.blur();
                this.onRightButtonClick();
            }}
        >
            <View style={{ marginRight: 10 }}>
                <Text style={styles.title}>
                    {showText}
                </Text>
            </View>
        </TouchableOpacity>
        return <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.themeColor,
            height: (Platform.OS === 'ios') ? 44 : 50,
        }}>
            {backButton}
            {inputView}
            {rightButton}
        </View>

    }
    render() {
        const { isLoading, projectModels, showBottomButton, hideLoadingMore } = this.props.search;
        const { theme } = this.params;

        let statusBar = null;
        if (Platform.OS === 'ios') {
            statusBar = <View style={[styles.statusBar, { backgroundColor: theme.themeColor }]}></View>
        }
        let bottomButton = showBottomButton ? <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: theme.themeColor }]}
            onPress={() => {
                this.saveKey();
            }}
        >
            <View style={{ justifyContent: 'center' }}>
                <Text style={styles.title}>添加</Text>
            </View>

        </TouchableOpacity> : null;
        let indicatorView = isLoading ? <ActivityIndicator
            style={styles.centering}
            size='large'
            animating={isLoading}
        /> : null;

        let resultView = isLoading ? <ActivityIndicator
        style={styles.centering}
        size='large'
        animating={isLoading}
        /> : <FlatList
        contentInset={{ bottom: 45 }}
        data={projectModels}
        refreshing={isLoading}
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
        /> ;
        return (
            <View style={styles.container}>
                {statusBar}
                {this.renderNavBar()}
                {resultView}
                {bottomButton}
                <Toast
                    ref={'toast'}
                    position={'center'}
                />
            </View>
        );
    }
};

const mapStateToProps = state => ({
    search: state.search,
    keys: state.language.keys,
});
const mapDispatchToProps = dispatch => ({
    onSearch: (inputKey, pageSize, token, favorireDao, popularKeys, callback) => dispatch(actions.onSearch(inputKey, pageSize, token, favorireDao, popularKeys, callback)),
    onSearchCancel: (token) => dispatch(actions.onSearchCancel(token)),
    onLoadMoreSearch: (pageIndex, pageSize, dataArray, callback, favorireDao) => dispatch(action.onLoadMoreSearch(pageIndex, pageSize, dataArray, callback, favorireDao)),
    onloadLanguage: (flagKey) => dispatch(action.onLoadLanguage(flagKey)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
    },
    statusBar: {
        height: 20,
    },
    title: {
        fontSize: 15,
        color: 'white',
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: 40,
        left: 10,
        right: 10,
        bottom: 2,
        borderRadius: 3,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    TextInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 26 : 36,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: 'white',
        alignSelf: 'center',
        paddingLeft: 5,
        marginRight: 10,
        marginLeft: 5,
        borderRadius: 3,
        opacity: 0.7,
        color: 'white'
    }
});
