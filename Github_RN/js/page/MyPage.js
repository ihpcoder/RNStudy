import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import actions from '../action'
import { connect } from 'react-redux';
export class MyPage extends Component {
    render(){
      const {navigation} = this.props;
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>MyPage</Text>
          <Button 
              title={'改变主题颜色'}
              onPress={()=>{
                this.props.onChangeTheme('blue');
              }}/>
        </View>
      );
    }
};
const mapStateToProps = state=>({

});
const mapDispatchToProps = dispatch=> ({
  onChangeTheme: theme => dispatch(actions.onThemeChange(theme))
})
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);


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
