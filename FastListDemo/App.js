/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {
  
  render(){
    const {navigation} = this.props;
    return <View style={styles.conta}>
              <Button 
                  title={'go to FlatListDemo'}
                  onPress={()=>navigation.navigate('FlatListDemo')}
              />
              <Button 
                  title={'go to FlatListDemo2'}
                  onPress={()=>navigation.navigate('FlatListDemo2')}
              />
              <Button 
                  title={'go to SwipeableFlatListDemo'}
                  onPress={()=>navigation.navigate('SwipeableFlatListDemo')}
              />
              <Button 
                  title={'go to SectionListDemo'}
                  onPress={()=>navigation.navigate('SectionListDemo')}
              />
            </View>
    
    }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'red'
  }
});

export default App;
