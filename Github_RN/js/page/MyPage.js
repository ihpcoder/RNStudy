import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import actions from '../action'
import { connect } from 'react-redux';
import NavigationUtil from '../navigator/NaviagtionUtil'
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MORE_MENU } from '../common/MORE_MENU'
import GlobalStyles from '../res/styles/GlobalStyles'
import ViewUtil from '../util/ViewUtil'
import WebViewPage from './WebViewPage';
import { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
const THEME_COLOR = '#678';

export class MyPage extends Component {
  getRightButton() {
    return <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => {

      }}>
        <View style={{ padding: 5, maginRight: 8 }}>
          <Feather
            name={'search'}
            size={24}
            style={{ color: 'white' }}
          />
        </View>
      </TouchableOpacity>
    </View>
  }
  getLefteButton(callBack) {
    return <TouchableOpacity
      style={{ padding: 8, paddingLeft: 12 }}
      onPress={callBack}>
      <Ionicons
        name={'ios-arrow-back'}
        size={26}
        style={{ color: 'white' }}
      />
    </TouchableOpacity>
  }
  onClick(menu) {
    let RouteName,params = {};
    switch(menu){
      case MORE_MENU.Tutorial:{
        RouteName='WebViewPage';
        params = {title:'教程',url:'https://github.com/ihpcoder/RNStudy'};
      }
        break;
      case MORE_MENU.About:{
        RouteName='WebViewPage';
        params = {title:'教程',url:'https://github.com/ihpcoder/RNStudy'};
      }
      break;
      case MORE_MENU.Custom_Language:
      case MORE_MENU.Custom_Key:
      case MORE_MENU.Remove_Key:{
        RouteName='CustomKeyPage';
        params = {
          isRemoveKey:  menu===MORE_MENU.Remove_Key?true:false,
          flag:menu===MORE_MENU.Custom_Language?FLAG_LANGUAGE.flag_language:FLAG_LANGUAGE.flag_key,
        }
      }
      break;
      case MORE_MENU.Sort_Key:
      case MORE_MENU.Sort_Language:{
        RouteName='SortKeyPage';
        params = {
          flag:menu===MORE_MENU.Sort_Language?FLAG_LANGUAGE.flag_language:FLAG_LANGUAGE.flag_key,
        }
      }
      break;
      case MORE_MENU.Custom_Theme:{
        const {onShowCustomThemeView} = this.props;
        onShowCustomThemeView(true);
      }
      break;
      default: break;
    }

    if(RouteName){
      NavigationUtil.goPage({...params,...this.props},RouteName);
    }
  }
  getItem(menu){
    const {theme} = this.props;
    return ViewUtil.getMenuItem(()=>this.onClick(menu),menu,theme.themeColor);
  }
  render() {
    const {theme} = this.props;
    let statusBar = {
      backgroundColor: theme.themeColor,
      barStyle: 'default',
    }
    let navgationBar = <NavigationBar
      title={'我的'}
      statusBar={statusBar}
      style={theme.styles.navBar}
      rightButton={this.getRightButton()}
      leftButton={this.getLefteButton()}
    />;
    return (
      <View style={GlobalStyles.root_container}>
        {navgationBar}
        <ScrollView style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.onClick(MORE_MENU.About)}
          >
            <View style={styles.about_left}>
              <Ionicons
                name={MORE_MENU.About.icon}
                size={40}
                style={{
                  marginRight: 10,
                  color: theme.themeColor,
                }}

              />
              <Text>GitHub Popular</Text>
            </View>
            <Ionicons
              name={'ios-arrow-forward'}
              size={16}
              style={{
                marginRight: 10,
                alignSelf:'center',
                color:theme.themeColor
              }}
            />
          </TouchableOpacity>
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Tutorial)}
          {/* 趋势管理 */}
          <Text style={styles.groupTitle}>趋势管理</Text>
          {this.getItem(MORE_MENU.Custom_Language)}
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Sort_Language)}

          {/* 最热管理 */}
          <Text style={styles.groupTitle}>最热管理</Text>
          {this.getItem(MORE_MENU.Custom_Key)}
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Sort_Key)}
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Remove_Key)}

          {/* 设置*/}
          <Text style={styles.groupTitle}>设置</Text>
          {this.getItem(MORE_MENU.Custom_Theme)}
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.About_Author)}
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Feedback)}

        </ScrollView>
      </View>
    )
  }
};
const mapStateToProps = state => ({
  theme: state.theme.theme,
});
const mapDispatchToProps = dispatch => ({
  onChangeTheme: theme => dispatch(actions.onThemeChange(theme)),
  onShowCustomThemeView: show=>dispatch(actions.onShowCustomThemeView(show)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  about_left:{
    flexDirection:'row',
    alignItems:'center',
  },
  item:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:90,
    padding:10,
    backgroundColor:'white',
    alignItems:'center',
  },
  groupTitle:{
    // backgroundColor:'white',
    marginLeft:10,
    marginTop:10,
    marginBottom: 5,
    fontSize: 12,
    color:'gray'
  }
});
