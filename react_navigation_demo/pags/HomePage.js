import React, {Component} from 'react';
import {View, SafeAreaView,Text,StyleSheet,Button} from 'react-native';


export default class Page1 extends Component{
    static navigationOptions = {
        title:'homePage'
    }
    componentDidMount(){
        const {navigation} = this.props;
        navigation.title = 'homePage';
    }

    render(){
        
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    welcome to homePage
                </Text>
                <Button
                    title={'go to page1'}
                    onPress={()=>{
                        navigation.navigate('page1',{name:'动态设置'});
                    }}
                />
                <Button
                    title={'go to page2'}
                    onPress={()=>{
                        navigation.navigate('page2');
                    }}
                />
                <Button
                    title={'go to page3'}
                    onPress={()=>{
                        navigation.navigate('page3',{});
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    welcome:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,

    }
});