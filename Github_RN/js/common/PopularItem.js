import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
}from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class PopularItem extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        const {item}=this.props;
        if(!item||!item.owner) return null;
        const favoriteButton = <TouchableOpacity    
                                    style={{padding: 6}}
                                    onPress={()=>{
                                    }}
                                    underlayColor={'transparent'}
                                >
                                    <FontAwesome
                                        name={'star-o'}
                                        size={26}
                                        style={{color:'red'}}
                                    />
                                </TouchableOpacity>
        return  <TouchableOpacity
            onPress={()=>this.props.onSelect(item)}
            >
            <View style={styles.cell_container}>
                <Text style={styles.title}>
                    {item.full_name}
                </Text>
                <Text style={styles.description}>
                    {item.description}
                </Text>
                <View style={styles.bottom_container}>
                    <View style={styles.bottom_container}>
                        <Text>Author:</Text>
                        <Image style={{height:22,width:22}}
                            source={{uri:item.owner.avatar_url}}
                            />
                    </View>
                    <View style={styles.bottom_container}>
                        <Text>Start:</Text>
                        <Text>{item.stargazers_count}</Text>
                    </View>
                    {favoriteButton}
                </View>
            </View>
        </TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    cell_container: {
        padding: 10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderColor:'#dddddd',
        borderWidth:0.5,
        borderRadius:2,
        shadowColor:'gray',//ios
        shadowOffset:{width:0.5,height:0.5},//ios
        shadowOpacity:0.4,//ios
        shadowRadius:1,//ios
        elevation:2,//android
    },
    bottom_container: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description:{
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    }
});