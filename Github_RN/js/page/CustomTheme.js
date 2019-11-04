import{
    Modal,
    View,
    Text,
    StyleSheet,
    Platform,
    ScrollView,
    TouchableHighlight
    
}from 'react-native'
import React,{Component} from 'react'
import {connect} from 'react-redux'
import actions from '../action'
import GlobalStyles from '../res/styles/GlobalStyles'
import ThemeDao from '../expand/dao/ThemeDao';
import ThemeFactory, { ThemeFlags } from '../res/styles/ThemeFactory';

class CustomeTheme extends Component{
    constructor(props){
        super(props);
        this.themeDao =  new ThemeDao();
    }
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
    onSelectItem(themeKey){
        this.props.onClose();
        this.themeDao.save(ThemeFlags[themeKey]);
        this.props.onThemeChange(ThemeFactory.createTheme(ThemeFlags[themeKey]));
    }
    getThemeItem(themeKey){
        return <TouchableHighlight
            style={{flex:1}}
            underlayColor={'white'}
            onPress={()=>this.onSelectItem(themeKey)}
        >
            <View style={[{backgroundColor:ThemeFlags[themeKey]},styles.themeItem]}>
                <Text style={styles.themeText}>{themeKey}</Text>
            </View>
        </TouchableHighlight>
    }
    renderThemeItems(){
        const views =[];
        for (let i=0,keys= Object.keys(ThemeFlags); i<keys.length; i+=3){
            const key1 = keys[i], key2 = keys[i+1], key3 = keys[i+2];
            views.push(
                <View style={{flexDirection: 'row'}}>
                {this.getThemeItem(key1)}
                { key2? this.getThemeItem(key2) : null}
                { key3? this.getThemeItem(key3) : null}
                </View>
            )
        }
        return views;
    }
    renderContentView(){
        return <Modal
            animationType={'slide'}
            transparent={true}
            visible={this.props.visible}
            onRequestClose={()=>{
                this.props.onClose();
            }}
        >  
            <View style={styles.modelContainer}>
                <ScrollView>
                    {this.renderThemeItems()}
                </ScrollView>
            </View>
        </Modal>
    }
    render(){
        let view = this.props.visible? <View style={GlobalStyles.root_container}>
            {this.renderContentView()}
        </View>: null;
        return view;
    }
}
const mapStateToProps = state=>({

})
const mapDispatchToProps = dispatch=>({
    onThemeChange:(theme)=>dispatch(actions.onThemeChange(theme))
})
export default connect(mapStateToProps,mapDispatchToProps)(CustomeTheme);
const styles = StyleSheet.create({
    modelContainer:{
        flex:1,
        margin: 10,
        marginTop: Platform.OS === 'ios'? 20:10,
        backgroundColor: 'white',
        borderRadius:3,
        shadowColor:'gray',
        shadowOffset:{width:3,height:2},
        shadowOpacity:0.3,
        shadowRadius:2,
        padding: 3,
    },
    themeItem:{
        flex:1,
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        alignItems:'center',
        justifyContent:'center',
    },
    themText:{
        color:'white',
        fontWeight:'500',
        fontSize: 16,
    }
})