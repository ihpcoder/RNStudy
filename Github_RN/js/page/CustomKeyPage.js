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
import GlobalStyles from '../res/styles/GlobalStyles'
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
        if(CustomKeyPage._keys(this.props,false).length===0){
            let {onLoadLanguage} = this.props;
            onLoadLanguage(this.params.flag);
        }
        this.setState({
            keys:CustomKeyPage._keys(this.props,false),
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
            const text = this.isRemoveKey?'是否确认删除？':'是否确认保存？';
            Alert.alert('提示',text,
            [
               {text:'否',onPress:()=>{
                   NavigationUtil.goBack(this.props.navigation);
               }} ,
               {
                   text:'是',onPress:()=>{
                       if(this.isRemoveKey){
                        this.doRemove();
                       }else{
                        this.doSave();
                       }
                   }
               }
            ])
        }else{
            NavigationUtil.goBack(this.props.navigation);
        }
    }
    doRemove(){
        let keys ;
        for(let i = 0, l=this.changValues.length; i<l; i++){
            ArrayUtil.remove(keys = CustomKeyPage._keys(this.props,true),this.changValues[i],'name');
        }
        this.languageDao.save([...keys]);
        this.props.onLoadLanguage(this.params.flag);
        NavigationUtil.goBack(this.props.navigation);
    }
    doSave(){
        let keys = [];
        this.languageDao.save([...this.state.keys]);
        this.props.onLoadLanguage(this.params.flag);
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
            // 如果state不等于nullkeys为空 则从props中取
            return state && state.keys && state.keys.length !== 0 && state.keys || props.language[key].map((item)=>{
                return {
                    ...item,
                    checked : false,
                }
            })
        } else {
            return props.language[key];
        }
    }

    render() {
        const {theme} = this.params;
        let title = this.isRemoveKey? '标签移除':'自定义标签';
        title = this.params.flag===FLAG_LANGUAGE.flag_language?'自定义语言':title;
        let rightButtonTitle = this.isRemoveKey?'移除':'保存';
        let navgationBar = <NavigationBar
            title={title}
            style={theme.styles.navBar}
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
