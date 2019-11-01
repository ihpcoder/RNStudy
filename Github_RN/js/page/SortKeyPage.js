import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    Alert
} from 'react-native';
import actions from '../action'
import { connect } from 'react-redux';
import  SortableListView from 'react-native-sortable-listview'


import NavigationUtil from '../navigator/NaviagtionUtil'
import NavigationBar from '../common/NavigationBar'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import GlobalStyles from '../res/GlobalStyles'
import ViewUtil from '../util/ViewUtil'
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import ArrayUtil from '../util/ArrayUtil';
const THEME_COLOR = '#678';

export class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.languageDao = new LanguageDao(this.params.flag);
        this.state = {
            checkedArray: SortKeyPage._keys(this.props),
        }
    }
    static getDerivedStateFromProps(nextProps,preState){
        const checkedArray = SortKeyPage._keys(nextProps,preState);
        if(preState.checkedArray!==checkedArray){
            return {
                checkedArray:checkedArray,
            }
        }
        return null;
    }
    componentDidMount(){
        if(SortKeyPage._keys(this.props,false).length===0){
            let {onLoadLanguage} = this.props;
            onLoadLanguage(this.params.flag);
        }
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
    onSave(hasChecked){
        if(!hasChecked){
            if(ArrayUtil.isEquArray(SortKeyPage._keys(this.props),this.state.checkedArray)){
                NavigationUtil.goBack(this.props.navigation);
                return;
            }
        }
        //保存排序后的数据
        //获取排序后的数据
        //更新本地数据
        this.languageDao.save(this.getSortResult());
        const {onLoadLanguage} = this.props;
        //更新store
        onLoadLanguage(this.params.flag);
        NavigationUtil.goBack(this.props.navigation);
    }
    
    doSave(){
        let keys = [];
        this.languageDao.save([...this.state.keys]);
        this.props.onLoadLanguage(this.params.flag);
        NavigationUtil.goBack(this.props.navigation);
    }
    /**
     * 获取排序后的标签结果
     */
    getSortResult() {
        const flag = SortKeyPage._flag(this.props);
        let sortResultArray = ArrayUtil.clone(this.props.language[flag]);
        const originalCheckedArray = SortKeyPage._keys(this.props);
        for(let i=0,j=originalCheckedArray.length; i<j; i++){
            let item = originalCheckedArray[i];
            let index = this.props.language[flag].indexOf(item);
            sortResultArray.splice(index,1,this.state.checkedArray[i]);
        }
        return sortResultArray;
    }
    /**
     * 获取标签
     * @param {*} props 
     * @param {*} state 
     */
    static _keys(props,state) {
        if(state&&state.checkedArray&&state.checkedArray.length){
            return state.checkedArray;
        }
        
        let flag = SortKeyPage._flag(props);
        let dataArray = props.language[flag]||[];
        let keys = [];
        for(let i=0;i<dataArray.length;i++){
            let data = dataArray[i];
            if(data.checked)
                keys.push(data);
        }
        return keys;
    }
    static _flag(props){
        const {flag} = props.navigation.state.params;
        return flag === FLAG_LANGUAGE.flag_key ?'keys':'languages';
    }

    render() {
        let title = this.params.flag===FLAG_LANGUAGE.flag_language?'语言排序':'标签排序';
        let rightButtonTitle = '保存';
        let navgationBar = <NavigationBar
            title={title}
            style={{ backgroundColor: THEME_COLOR }}
            rightButton={this.getRightButton(rightButtonTitle)}
            leftButton={ViewUtil.getLeftBackButton(()=>{
                if(!ArrayUtil.isEquArray(SortKeyPage._keys(this.props),this.state.checkedArray)){
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
        let order = Object.keys(this.state.checkedArray);

        return (
            <View style={GlobalStyles.root_container}>
                {navgationBar}
                <SortableListView
                    style={{ flex: 1 }}
                    data={this.state.checkedArray}
                    order={order}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.setState({
                            checkedArray:[...this.state.checkedArray],
                        })
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row} />}
                />
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
export default connect(mapStateToProps, mapDispatchToProps)(SortKeyPage);


class SortCell extends Component{
    render() {
        return(
            <TouchableHighlight
                underlayColor={'#eee'}
                style={this.props.data.checked ? styles.item: styles.hidden}
                {...this.props.sortHandlers}
            >
                <View style={{marginLeft: 10,flexDirection: 'row'}}>
                    <MaterialCommunityIcons
                        name={'sort'}
                        size={16}
                        style={{marginRight:10, color:'gray'}}
                    />
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    item: {
        backgroundColor:'#F8F8F8',
        borderBottomWidth:1,
        borderColor:'#eee',
        height:50,
        justifyContent:'center'
    },
    line:{
        flex:1,
        height:0.3,
        backgroundColor:'darkgray',
    },
    hidden:{
        height:0,
    }
});
