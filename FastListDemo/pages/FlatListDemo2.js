import React, {Component} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';

const CITY_NAMES = ['北京','上海','广州','深圳','杭州',
'北京','上海','广州','深圳','杭州','北京',
'上海','广州','深圳','杭州']


export default class FlatListDemo2 extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            dataArray:CITY_NAMES
        }
    }

    _renderItem(data){
       return( 
       <View style={styles.item}>
            <Text style={styles.text}>{data.item}</Text>
        </View>
       )
    }
    loadData(){
        this.setState({
            isLoading:true
        });
        setTimeout(()=>{
            let dataArray = [];
            for(let i=this.state.dataArray.length-1; i>=0;i--){
                dataArray.push(this.state.dataArray[i]);
            }
            this.setState({
                isLoading:false,
                dataArray:dataArray,
            })
        },2000);
    }
    genIndicator(){
        return(
            <View style={styles.footer}>
                 <ActivityIndicator 
                    size={'large'}
                    animating={true}
                 />
                 <Text>正在加载更多</Text>
            </View>
        );
    }

    render(){

        return(
        <View style={styles.container}>
            <FlatList 
                data={this.state.dataArray}
                renderItem={(data)=>this._renderItem(data)}
                // refreshing={this.state.isLoading}
                // onRefresh={ ()=>{
                //     this.loadData();
                // }}
                refreshControl={
                    <RefreshControl
                        title={'loading'}
                        colors={['red']}
                        tintColor={'red'}
                        titleColor={'red'}
                        refreshing={this.state.isLoading}
                        onRefresh={
                            ()=>{this.loadData();}
                        }
                    />
                }
                ListFooterComponent={
                    ()=>this.genIndicator()
                    
                }
            />



        </View>);
    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
    },
    item:{
        marginLeft:15,
        marginRight:15,
        marginBottom:15,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ededed'
    },
    footer:{
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        color:'red',
        fontSize:20,
    }
});