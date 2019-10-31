import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import actions from '../action'
import { connect } from 'react-redux';
import NavigationUtil from '../navigator/NaviagtionUtil'
import NavigationBar from '../common/NavigationBar'
import CheckBox from 'react-native-check-box'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MORE_MENU } from '../common/MORE_MENU'
import GlobalStyles from '../res/GlobalStyles'
import ViewUtil from '../util/ViewUtil'
import WebViewPage from './WebViewPage';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import ArrayUtil from '../util/ArrayUtil';
const THEME_COLOR = '#678';

export class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.isRemoveKey = this.params.isRemoveKey;
        this.changValues = [];
        this.languageDao = new LanguageDao(this.params.flag);
        this.state = {
            keys: [],
        }
    }
    static getDerivedStateFromProps(nextProps,preState){
        if(preState.keys!==CustomKeyPage._keys(nextProps,null,preState)){
            return {
                keys:CustomKeyPage._keys(nextProps,null,preState)
            }
        }
        return null;
    }
    componentDidMount(){
        if(CustomKeyPage._keys(this.props).length===0){
            let {onLoadLanguage} = this.props;
            onLoadLanguage(this.params.flag);
        }
        this.setState({
            keys:CustomKeyPage._keys(this.props),
        })
    }
    getRightButton(title) {
        return <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {
                this.onSave();
            }}>
                <View style={{ padding: 5, maginRight: 8 }}>
                    <Text style={{ fontSize: 15,color:'red' }}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
    onSave(){
        if(this.changValues.length>0){
            Alert.alert('提示','是否确认保存修改？',
            [
               {text:'否',onPress:()=>{
                   NavigationUtil.goBack(this.props.navigation);
               }} ,
               {
                   text:'是',onPress:()=>{
                       this.doSave();
                   }
               }
            ])
        }else{
            NavigationUtil.goBack(this.props.navigation);
        }
    }
    doSave(){
        let keys = [];
        this.languageDao.save(this.state.keys);
        NavigationUtil.goBack(this.props.navigation);
    }
    onClick(data,index){
        data.checked = !data.checked;
        ArrayUtil.updateArray(this.changValues,data);
        this.state.keys[index]=data;
        this.setState({
            ...this.state,
        })
    }
    renderView(){
        let dataArray = this.state.keys;
        if(!dataArray||dataArray.length===0)return null;
        let len = dataArray.length;
        let views= [];
        for(let i=0; i<len;i+=2){
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(dataArray[i],i)}
                        {len<=(i+1)?null:this.renderCheckBox(dataArray[i+1],i+1)}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return views;
    }
    _checkedImage(checked){
        const {theme}=this.params;
        return <Ionicons
            name={checked?'ios-checkbox':'md-square-outline'}
            size={20}
            style={{color:'red'}}
        />
    }
    renderCheckBox(data,index){
        return <CheckBox
            style={{flex:1,padding:10}}
            onClick={()=>this.onClick(data,index)}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={this._checkedImage(true)}
            unCheckedImage={this._checkedImage(false)}
        />
    }
    /**
     * 获取标签
     * @param {*} props 
     * @param {*} original 移除标签时使用 ，是否从props获取原始对的标签
     * @param {*} state 移除标签时使用
     */
    static _keys(props, original, state) {
        const { flag, isRemoveKey } = props.navigation.state.params;
        let key = flag === FLAG_LANGUAGE.flag_key ? 'keys' : 'languages';
        if (isRemoveKey && !original) {

        } else {
            return props.language[key];
        }
    }

    render() {
        let title = this.isRemoveKey? '标签移除':'自定义标签';
        title = this.params.flag===FLAG_LANGUAGE.flag_language?'自定义语言':title;
        let rightButtonTitle = this.isRemoveKey?'移除':'保存';
        let navgationBar = <NavigationBar
            title={title}
            style={{ backgroundColor: THEME_COLOR }}
            rightButton={this.getRightButton(rightButtonTitle)}
            leftButton={ViewUtil.getLeftBackButton(()=>{
                if(this.changValues.length){
                    Alert.alert('提示','要保存修改吗？',
                    [
                       {text:'否',onPress:()=>{
                           NavigationUtil.goBack(this.props.navigation);
                       }} ,
                       {
                           text:'是',onPress:()=>{
                               this.onSave();
                           }
                       }
                    ])
                }else{
                    NavigationUtil.goBack(this.props.navigation);
                }
            })}
        />;
        return (
            <View style={GlobalStyles.root_container}>
                {navgationBar}
                <ScrollView>
                   {this.renderView()}
                </ScrollView>
            </View>
        )
    }
};
const mapStateToProps = state => ({
    language: state.language,
    theme: state.theme,
});
const mapDispatchToProps = dispatch => ({
    onLoadLanguage: flag => dispatch(actions.onLoadLanguage(flag))
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomKeyPage);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    item: {
        flexDirection: 'row',
    },
    line:{
        flex:1,
        height:0.3,
        backgroundColor:'darkgray',
    },
});
