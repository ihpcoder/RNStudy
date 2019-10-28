import{
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    
}from 'react-native'
import React,{Component} from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeSpan from '../model/TimeSpan'

export const TimeSpans = [
    new TimeSpan('今天','since=daily'),
    new TimeSpan('本周','since=weekly'),
    new TimeSpan('本月','since=monthly')];
export default class TrendingDialog extends Component{
    state = {
        visible: false,
    }
    onShow(){
        this.setState({
            visible: true,
        })
    }
    dismiss(){
        this.setState({
            visible: false,
        })
    }
    render(){
        const {onClose,onSelect} = this.props;
        return(
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={()=>onClose()}
            >
            <TouchableOpacity
                style={styles.container}
                onPress={()=>this.dismiss()}
            >
            <MaterialIcons
                name={'arrow-drop-up'}
                size={36}
                style={styles.arrow}
            />
            <View style={styles.listContainer}>
                {TimeSpans.map((item,i,arr)=>{
                    return (
                    <TouchableOpacity
                        onPress={()=>onSelect(arr[i])}
                        underlayColor='transparent'
                        key={i}
                    >
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>
                            {item.showText}
                        </Text>
                        
                    </View>
                    {
                            i!==TimeSpans.length-1?<View
                                style={styles.line}
                            ></View>:null
                        }   
                    </TouchableOpacity>
                    );
                })}
            </View>
            </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex:1,
        alignItems:'center',
        // paddingTop:DeviceInfo.isIPhoneX_deprecated? 30:0,
    },
    arrow:{
        marginTop: 40,
        color:'white',
        padding: 0,
        marginBottom:-15,
    },
    listContainer:{
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop:3,
        paddingBottom:3,
        marginRight:3,
    },
    itemContainer:{
        alignItems:'center',
        flexDirection:'row',
    },
    text:{
        fontSize:16,
        color:'black',
        padding: 8,
        fontWeight: '400',
        paddingLeft: 26,
        paddingRight: 26,
    },
    line:{
        height:1,
        // marginLeft:0,
        // marginRight:0,
        backgroundColor:'darkgray',
    }
})