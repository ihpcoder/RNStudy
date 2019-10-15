import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import actions from '../action'

export class FavoritePage extends Component {
    render(){

      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>FavoritePage</Text>
          <Button 
              title={'改变主题颜色'}
              onPress={()=>{
                this.props.onThemeChange('green');
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

export default connect(mapStateToProps,mapDispatchToProps)(FavoritePage);
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
