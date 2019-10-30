import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ViewUtil {
    /**
     * 获取左侧返回按钮
     * @param {*} callBack 点击回调函数
     */
    static getLeftBackButton(callBack) {
        return <TouchableOpacity
            style={{padding: 8,paddingLeft: 12}}
            onPress={callBack}
        >
            <Ionicons
                name={'ios-arrow-back'}
                size={26}
                style={{color:'white'}}
            />
        </TouchableOpacity>

    }

    static getShareButton(callBack){
        return <TouchableOpacity
            underlayerColor={'transparent'}
            onPress={callBack}
        >
            <Ionicons
                name={'md-share'}
                size={20}
                style={{color:'white', opacity:0.9,marginRight:10}}
            />
        </TouchableOpacity>
    }
    /**
     * 全局的item
     * @param {*} callBack 点击回调
     * @param {*} text 显示文本
     * @param {*} color 图标颜色
     * @param {*} Icons 组件
     * @param {*} icon 图标name
     * @param {*} expandableIco 右侧图标 
     */
    static getSettingItem(callBack,text,color,Icons,icon,expandableIco){
        return <TouchableOpacity
            onPress={callBack}
            style={styles.setting_item_container}
        >
            <View style={{alignItems:'center',flexDirection:'row'}}>
                {Icons&&icon?
                    <Icons
                        name={icon}
                        size={16}
                        style={{color:color,marginRight:10}}
                    />:
                    <View style={{opacity:1,width:16,height:16,marginRight:10}}/>
                }
                <Text>{text}</Text>
            </View>
            <Ionicons
            name={ expandableIco?expandableIco:'ios-arrow-forward'}
            size={16}
            style={{
                color:color||'black',
                marginRight:10,
                alignSelf:'center'
            }}
            />
        </TouchableOpacity>
    }
    /**
     * 获取设置页的Item
     * @param {*} callBack 
     * @param {*} menu 
     * @param {*} color 
     * @param {*} expandableIco 
     */
    static getMenuItem(callBack,menu,color,expandableIco){
        return ViewUtil.getSettingItem(callBack,menu.name,color,menu.Icons,menu.icon,expandableIco);
    }
}
const styles = StyleSheet.create({
    setting_item_container:{
        backgroundColor:'white',
        padding: 10,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row'
    }
})