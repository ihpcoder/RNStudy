import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action'

class TrendingPage extends Component {
    render(){
      const {navigation} = this.props;
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>TrendingPage</Text>
          <Button 
              title={'改变主题颜色'}
              onPress={()=>{
                // navigation.setParams({
                //   theme: {
                //     tintColor: 'red',
                //     updateTime: new Date().getTime(),
                //   }
                // })
                this.props.onThemeChange('red');
              }}/>
        </View>
      );
    }
};

const mapStateToProps = state => ({
    
});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme=>dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps,mapDispatchToProps)(TrendingPage);



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
