/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import NavigationUtil from '../navigator/NaviagtionUtil'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

export default class Welcome extends Component {

    componentDidMount(){
     this.timer =  setTimeout(()=>{
        NavigationUtil.resetToHomePage(this.props);
      },200);
    }
    componentWillUnmount(){
      this.timer && clearTimeout(this.timer);
    }
    render(){
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>WelcomePage</Text>
        </View>
      );
    }
};

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
    margin:10,
  }
});
