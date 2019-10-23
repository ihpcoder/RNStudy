import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import actions from '../action'
import { connect } from 'react-redux';
import NavigationUtil from '../navigator/NaviagtionUtil'
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'


const THEME_COLOR = '#678';

export class MyPage extends Component {
  getRightButton(){
    return <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>{

      }}>
        <View style={{padding:5,maginRight:8}}>
          <Feather
            name={'search'}
            size={24}
            style={{color:'white'}}
          />
        </View>
      </TouchableOpacity>
    </View>
  }
  getLefteButton(callBack) {
    return <TouchableOpacity 
      style={{padding:8,paddingLeft:12}}
      onPress={callBack}>
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{color:'white'}}
        />
    </TouchableOpacity>
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle:'default',
    }
    let navgationBar = <NavigationBar
      title={'我的'}
      statusBar={statusBar}
      style={{backgroundColor:THEME_COLOR}}
      rightButton={this.getRightButton()}
      // leftButton={this.getLefteButton(()=>{
      //   // back
      // })}
    />;
    return(
      <View style={styles.container}>
        {navgationBar}
        <Text style={styles.welcome}>MyPage</Text>
          <Button 
              title={'改变主题颜色'}
              onPress={()=>{
                this.props.onChangeTheme('blue');
              }}/>
              <Text style= {styles.text}
                onPress={()=>{
                    NavigationUtil.goPage(this.props,'DetailPage')
                    }
                }>
                跳转到详情页
            </Text>
            <Text style= {styles.text}
                onPress={()=>{
                    NavigationUtil.goPage(this.props,'FetchDemoPage')
                    }
                }>
                跳转到FetchDemoPage
            </Text>
            <Text style= {styles.text}
                onPress={()=>{
                    NavigationUtil.goPage(this.props,'AsyncStorageDemoPage')
                    }
                }>
                AsyncStorageDemoPage
            </Text>
            <Text style= {styles.text}
                onPress={()=>{
                    NavigationUtil.goPage(this.props,'DataStoreDemoPage')
                    }
                }>
                DataStoreDemoPage
            </Text>
      </View>
    )
  }



    // render(){
    //   const {navigation} = this.props;
    //   return (
    //     <View style={styles.container}>
          // <Text style={styles.welcome}>MyPage</Text>
          // <Button 
          //     title={'改变主题颜色'}
          //     onPress={()=>{
          //       this.props.onChangeTheme('blue');
          //     }}/>
          //     <Text style= {styles.text}
          //       onPress={()=>{
          //           NavigationUtil.goPage(this.props,'DetailPage')
          //           }
          //       }>
          //       跳转到详情页
          //   </Text>
          //   <Text style= {styles.text}
          //       onPress={()=>{
          //           NavigationUtil.goPage(this.props,'FetchDemoPage')
          //           }
          //       }>
          //       跳转到FetchDemoPage
          //   </Text>
          //   <Text style= {styles.text}
          //       onPress={()=>{
          //           NavigationUtil.goPage(this.props,'AsyncStorageDemoPage')
          //           }
          //       }>
          //       AsyncStorageDemoPage
          //   </Text>
          //   <Text style= {styles.text}
          //       onPress={()=>{
          //           NavigationUtil.goPage(this.props,'DataStoreDemoPage')
          //           }
          //       }>
          //       DataStoreDemoPage
          //   </Text>
    //     </View>
    //   );
    // }
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
    backgroundColor: '#fafafa',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin:10,
  }
});
