import React from 'react'
import PropTypes from 'prop-types'
import{
    View,
    ViewPropTypes,
    StyleSheet,
    Text,
    StatusBar,
    Platform,
    Dimensions,
}from 'react-native'


const DEVICE_WIDTH = Dimensions.get('screen').width;
const NAV_BAR_HEIGHT_IOS = 44; //导航栏在iOS的高度
const NAV_BAR_HEIGHT_ANDROID = 50; //导航栏在android中的高度
const STATUS_BAR_HEIGHT = 20; //statusBar高度
const StatusBarShape = {// 设置状态栏所接受的属性
    barStyle: PropTypes.oneOf(['light-content','dark','default']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
}
export default class NavigationBar extends React.Component{
    //类型检查
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
    }
    //设置默认属性
    static defaultProps = {
        statusBar: {
            barStyle: 'default',
            hidden: false,

        },
    }
    getButtonElement(item){
        return(
            <View style={styles.navBarButton}>
                {item?item:null}
            </View>
        );
    }

    render(){
        // console.log('-----'+DEVICE_WIDTH);
        let statusBar = this.props.statusBar.hidden?null:
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar}/>
            </View>
        let titleView = this.props.titleView? this.props.titleView:
            <Text ellipsizeMode='head' numberOfLines={1} style ={styles.title}>
                {this.props.title}
            </Text>
        let content = this.props.hide ? null:
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>
        return(
            <View style={[styles.container,this.props.style]}>
                {statusBar}
                {content}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fafafa',
    },
    navBar:{
        // display
        flex:0,
        flexWrap:'nowrap',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:Platform.OS==='ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer:{
        // alignItems:'center',
        // justifyContent:"center",
        // backgroundColor:'blue',
        flexShrink:1,
    },
    navBarButton:{
        // backgroundColor:'blue',
        // alignItems:'center',
        // justifyContent:'center',
        // position:'absolute',
        // left:40,
        // right:40,
        // top:0,
        // bottom:0,
    },
    title:{
        fontSize:20,
        color: 'white',
        alignSelf:'center',
        // backgroundColor:'red',
    },
    statusBar:{
        height: Platform.OS==='ios'?STATUS_BAR_HEIGHT:0,
    }

})