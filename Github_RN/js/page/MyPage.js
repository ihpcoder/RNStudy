import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

export default class MyPage extends Component {
    render(){
      const {navigation} = this.props;
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>MyPage</Text>
          <Button 
              title={'改变主题颜色'}
              onPress={()=>{
                navigation.setParams({
                  theme: {
                    tintColor: 'blue',
                    updateTime: new Date().getTime(),
                  }
                })
              }}/>
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
