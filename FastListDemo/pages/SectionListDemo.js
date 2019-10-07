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
    Dimensions,
    SectionList
} from 'react-native';

const CITY_NAMES = [{data:['北京','上海','广州','深圳'],title:'一线城市'},
{data:['重庆','厦门','郑州','杭州'],title:'新一线城市'},
{data:['大连','南京','苏州','福州','成都'],title:'二线城市'}];


export default class SectionListDemo extends Component{
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
    loadData(isMore){
        if(!isMore){
            this.setState({
            isLoading:true
        });
        }
        
        setTimeout(()=>{
            let dataArray = isMore?[...this.state.dataArray]:[];
            for(let i=0; i<this.state.dataArray.length;i++){
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
    _renderSectionHeader({section}){
        return(
        <View style={styles.sectionHeader}>
            <Text>
                {section.title}
            </Text>
        </View>);
    }
    render(){

        return(
        <View style={styles.container}>
            <SectionList 
                sections={this.state.dataArray}
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
                ListFooterComponent={()=>this.genIndicator()}
                onEndReached={()=>{this.loadData(true)}}
                renderSectionHeader={(data)=>this._renderSectionHeader(data)}
                ItemSeparatorComponent={()=><View style={styles.separator}></View>}
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
    },
    sectionHeader:{
        alignItems:'center',
        height:20,
        backgroundColor:'red'
    },
    separator:{
        flex:1,
        height:1,
        backgroundColor:'#666666',
    }
});