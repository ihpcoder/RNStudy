import React, {Component} from 'react';
import {View, SafeAreaView,Text,StyleSheet,Button} from 'react-native';

export default class Page1 extends Component{

    render(){
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    welcome to Pages1
                </Text>
                <Button 
                    title={'go back'}
                    onPress={()=>{
                        navigation.goBack();
                    }}
                />
                <Button 
                    title={'go page4'}
                    onPress={()=>{
                        navigation.navigate('page4');
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

    },
});