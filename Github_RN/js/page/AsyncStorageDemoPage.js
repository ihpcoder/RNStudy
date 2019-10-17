import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
}from 'react-native'
import { async } from 'rxjs/internal/scheduler/async';
const KEY = 'save_key';
export default class AsyncStorageDemoPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showText:''
        }
    }
    async  doSave(){
        try {
            await AsyncStorage.setItem(KEY, this.value)
            
          } catch (e) {
            // saving error
          }
    }
    async doRemove(){
        try {
            const value = await AsyncStorage.removeItem(KEY)
            if(value !== null) {
              // value previously stored
            }
          } catch(e) {
            // error reading value
          }
    }
    async getData(){
        try {
            const value = await AsyncStorage.getItem(KEY)
            if(value !== null) {
              // value previously stored
              this.setState({
                showText:value,
            })
            }
          } catch(e) {
            // error reading value
            
          }
    }

    render(){
        return  <View style={styles.container}>
            <Text style={styles.text}>AsyncStorageDemoPage</Text>
            <TextInput 
                ref={'input'}
                style = {styles.input}
                returnKeyType='done'
                onChangeText= {text=>{
                    this.value = text;
                }}
            />
            <View style={styles.input_container}>
                <Text style={[styles.text,styles.textLine]}
                    onPress={()=>{
                        this.doSave();
                    }}>
                    存储
                </Text>
                <Text style={[styles.text,styles.textLine]}
                    onPress={()=>{
                        this.doRemove();
                    }}>
                    删除
                </Text>
                <Text style={[styles.text,styles.textLine]}
                    onPress={()=>{
                        this.getData();
                    }}>
                    获取
                </Text>
            </View>
            <Text style={[styles.text,{marginTop:30}]}>{this.state.showText}</Text>
        </View>
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    text:{
        margin:5,
        fontSize:15,
        textAlign:"center",
    },
    textLine:{
        flex:1
    },
    input:{
        height: 30,
        margin:15,
        borderWidth:1,
        borderColor: 'black'
    },
    input_container:{
        flexDirection:'row',
    }
})