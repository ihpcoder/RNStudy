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
export default class WebViewPage extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    const { title,url } = this.params;
    this.state = {
      title: title,
      url: url,
      canGoBack: false,
    }
  }
  onNavigationStateChange(e) {
    this.setState({
      canGoBack: e.canGoBack,
      url: e.url,
      // title:e.title,
    });
  }
  goBack() {
    if (this.state.canGoBack) {
      this.webView.goBack();
    } else {
      NaviagtionUtil.goBack(this.props.navigation);
    }
  }
  render() {
    const { nav, detail } = this.props;
    const {theme} = this.params;
    let navgarionBar = <NavigationBar
      title={this.state.title}
      style={theme.styles.navBar}
      leftButton={ViewUtil.getLeftBackButton(() => this.goBack())}
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
// const mapStateToProps = state => ({
//   detail: state.webview,
// });
// const mapDispatchToProps = dispatch => ({

// });
// export default connect(mapStateToProps, mapDispatchToProps)(WebViewPage);

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
