import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
}from 'react-native'
import DataStore from '../expand/dao/DataStore'
const KEY = 'save_key';
export default class DataStoreDemoPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showText:''
        }
        this.dataStore = new DataStore();
    }
    loadData() {
        this.refs.input.blur();
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetchData(url)
            .then(data=>{
                let showData = `初次数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText: showData,
                })
            })
            .catch(error=>{
                error && console.log(error.toString());
            });
    }
    render(){
        return  <View style={styles.container}>
            <Text style={styles.text}>DataStoreDemoPage</Text>
            <TextInput 
                ref={'input'}
                style = {styles.input}
                returnKeyType='done'
                onChangeText= {text=>{
                    this.value = text;
                }}
            />
            <View style={styles.input_container}>
                {/* <Text style={[styles.text,styles.textLine]}
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
                </Text> */}
                <Text style={[styles.text,styles.textLine]}
                    onPress={()=>{
                        this.loadData();
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