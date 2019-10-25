import {
    TouchableOpacity
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
}