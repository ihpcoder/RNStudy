/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import ViewUtil from '../util/ViewUtil'
import NaviagtionUtil from '../navigator/NaviagtionUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import WebView from 'react-native-webview'
import DeviceInfo from 'react-native-device-info'
import FavoriteUtil from '../util/FavoriteUtil'
import {FLAG_STORAGE} from '../expand/dao/DataStore'
import FavoriteDao from '../expand/dao/FavoriteDao'
const TRENDING_URL = 'https://github.com/';
const THEME_COLOR = '#678';
class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    const { projectModel, flag} = this.params;
    this.url = projectModel.item.html_url || TRENDING_URL + projectModel.item.fullName;
    const title = projectModel.item.full_name || projectModel.item.fullName;
    this.state = {
      title: title,
      url: this.url,
      canGoBack: false,
      isFavorite: projectModel.isFavorite,
    }
  }
  onNavigationStateChange(e) {
    this.setState({
      canGoBack: e.canGoBack,
      url: e.url,
      // title:e.title,
    });
  }
  onFavoriteButtonClick(){
    const {flag ,projectModel,callback} = this.params;
    const isFavorite = projectModel.isFavorite =!this.state.isFavorite;
    callback(isFavorite);
    if(!this.favoriteDao){
      this.favoriteDao = new FavoriteDao(flag);
    }
    FavoriteUtil.onFavorite(this.favoriteDao,this.params.projectModel.item,isFavorite,flag);
    this.params.callback(isFavorite)
    this.setState({
      isFavorite
    });
  }
  renderRightButton() {
    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <TouchableOpacity
          onPress={() => {//收藏
            this.onFavoriteButtonClick()}}
        >
          <FontAwesome
            name={this.state.isFavorite?'star':'star-o'}
            size={26}
            style={{ color: 'white', padding: 9 }}
          />
        </TouchableOpacity>
        {ViewUtil.getShareButton(() => {//分享
          this.share();
        })}
      </View>
    )
  }
  share() {
    console.log('share');
  }
  goBack() {
    if (this.state.canGoBack) {
      this.webView.goBack();
    } else {
      NaviagtionUtil.goBack(this.props.navigation);
    }
  }
  render() {
    const { nav, detail} = this.props;
    const {theme} = this.params;

    // let statusBar = {
    //   backgroundColor: THEME_COLOR,
    //   barStyle:'light-content',
    // }
    const titleLayoutStyle = this.state.title.length > 20 ? { paddingRight: 30 } : null;
    let navgarionBar = <NavigationBar
      title={this.state.title}
      // statusBar={statusBar}
      style={theme.styles.navBar}
      titleLayoutStyle={titleLayoutStyle}
      leftButton={
        ViewUtil.getLeftBackButton(() => this.goBack())
      }
      rightButton={
        this.renderRightButton()
      }
    />

    return (

      <View style={styles.container}>
        {navgarionBar}
        <WebView
          source={{ uri: this.state.url }}
          ref={webView => { this.webView = webView }}
          startInLoadingState={true}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
        />
      </View>
    );
  }
};
const mapStateToProps = state => ({
  detail: state.detail,
  nav: state.nav
});
const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
