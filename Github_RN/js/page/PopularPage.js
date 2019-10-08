import React,{Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import NavigationUtil from '../navigator/NaviagtionUtil';


export default class PopularPage extends Component {
    static navigationOptions={
        title:'最热',
    }
    render(){
        const TabNavigator=createMaterialTopTabNavigator({
            PopularTab1:{
                screen:PopularTab,
                navigationOptions:{
                    title:'tab1',
                }
            },
            PopularTab2:{
                screen:PopularTab,
                navigationOptions:{
                    title:'tab2',
                }
            },
            PopularTab3:{
                screen:PopularTab,
                navigationOptions:{
                    title:'tab3',
                }
            },
            PopularTab4:{
                screen:PopularTab,
                navigationOptions:{
                    title:'tab4',
                }
            },
            PopularTab5:{
                screen:PopularTab,
                navigationOptions:{
                    title:'tab5',
                }
            }
        });
        const AppContainer = createAppContainer(TabNavigator);
      return <AppContainer />
    }
};

class PopularTab extends Component {

    render(){
        const {tabLabel}=this.props;
        return (
            <View style={styles.container}>
            <Text style={styles.welcome}>{tabLabel}</Text>
            <Text onPress={()=>{
                    NavigationUtil.goPage(this.props,'DetailPage')
                    }
                }>
                跳转到详情页
            </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin:10,
  }
});
