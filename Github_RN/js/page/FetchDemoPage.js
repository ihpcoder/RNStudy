import React from 'react'
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
}from 'react-native'
import { throwError } from 'rxjs';
const FETCH_GET_API = 'https://api.github.com/search/repositories?q=';
export default class FetchDemoPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showText:''
        }
    }
    loadData(){
        let url = FETCH_GET_API+this.searchkey;
        fetch(url)
        .then(response=>{
            return response.text();
        })
        .then(responseText=>{
            this.setState({
                showText:responseText,
            });
            console.log(responseText);
        })
        .catch(e=>{
            console.log(e);
        })
    }
    loadData2(){
        let url = FETCH_GET_API+this.searchkey;
        fetch(url)
        .then(response=>{
            if(response.ok){
                return response.text();
            }else{
                throw new Error('连接错误');
            }
            
        })
        .then(responseText=>{
            this.setState({
                showText:responseText,
            });
            console.log(responseText);
        })
        .catch(e=>{
            console.log(e);
        })
    }
    render(){
        return  <View style={styles.container}>
            <Text>FetchDemo</Text>
            <View style={styles.input_container}>
                <TextInput 
                    ref={'input'}
                    style = {styles.input}
                    returnKeyType='done'
                    onChangeText= {text=>{
                        this.searchkey = text;
                    }}
                />
                <Button
                    title = {'获取'}
                    onPress = {()=>{
                        this.refs.input.blur();
                        this.loadData();
                    }}
                />
            </View>
            <Text>{this.state.showText}</Text>
        </View>
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input:{
        flex:1,
        height: 30,
        margin:15,
        borderWidth:1,
        borderColor: 'black'
    },
    input_container:{
        flexDirection:'row',
        alignItems:'center'
    }
})