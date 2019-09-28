import React, {Component} from 'react';
import {View, SafeAreaView,Text,StyleSheet} from 'react-native';


export default class Page3 extends Component{

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    welcome to Pages3
                </Text>
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