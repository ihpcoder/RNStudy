import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs'
import React from 'react'
import {Button,Platform} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomePage from '../pags/HomePage'
import Page1 from '../pags/Page1'
import Page2 from '../pags/Page2'
import Page3 from '../pags/Page3'
import Page4 from '../pags/Page4'
import Page5 from '../pags/Page5'


const AppTopNavigator = createMaterialTopTabNavigator({
    page1:{
        screen:Page1,
        navigationOptions:{
            tabBarLabel:'All'
        }
    },
    page2:{
        screen:Page2,
        navigationOptions:{
            tabBarLabel:'iOS'
        }
    },
    page3:{
        screen:Page3,
        navigationOptions:{
            tabBarLabel:'React'
        }
    },
    page4:{
        screen:Page4,
        navigationOptions:{
            tabBarLabel:'ReactNative'
        }
    },
    page5:{
        screen:Page5,
        navigationOptions:{
            tabBarLabel:'Devio'
        }
    }
},{
    tabBarOptions:{
        tabStyle:{minWidth:50},
        upperCaseLabel:false,
        scrollEnabled:true,
        style:{
            backgroundColor:'#678'//TabBar的背景色
        },
        indicatorStyle:{
            height:2,
            backgroundColor:'white'
        },//标签指示器的样式
        labelStyle:{
            fontSize:13,
            marginTop:6,
            marginBottom:6
        },//文字的样式
    }
});
const AppBottomNavigator = createBottomTabNavigator({
    page1:{
        screen:Page1,
        navigationOptions:{
            tabBarLabel:'最热',
            tabBarIcon:({tintColor,focused})=>(
                <Ionicons
                    name={'ios-home'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    },
    page2:{
        screen:Page2,
        navigationOptions:{
            tabBarLabel:'趋势',
            tabBarIcon:({tintColor,focused})=>(
                <Ionicons
                    name={'ios-infinite'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    },
    page3:{
        screen:Page3,
        navigationOptions:{
            tabBarLabel:'收藏',
            tabBarIcon:({tintColor,focused})=>(
                <Ionicons
                    name={'ios-chatboxes'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    },
    page4:{
        screen:Page4,
        navigationOptions:{
            tabBarLabel:'我的',
            tabBarIcon:({tintColor,focused})=>(
                <Ionicons
                    name={'ios-aperture'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    }
},{
    tabBarOptions:{
        activeBackgroundColor:Platform.OS==='ios'?'#e91e6':'#fff'
    }
});
const AppStackNavigator = createStackNavigator({
    home:HomePage,
    page1:{
        screen:Page1,
        navigationOptions:({navigation})=>({//在这里定义每个页面的导航数据，动态配置
            title:`${navigation.state.params.name}页面名`,
        })
    },
    page2:{
        screen:Page2,
        navigationOptions:{//在这里定义每个页面的导航数据，静态配置
            title:'page2',
        }
    },
    page3:{
        screen:Page3,
        navigationOptions:(props)=>{
            const {navigation} = props;
            const {state, setParams} = navigation;
            const {params} = state;
            return {
                title:params&&params.title?params.title:'this is page3',
                headerRight:(
                    <Button 
                        title={params&&params.mode==='edit'?'保存':'编辑'}
                        onPress={()=>setParams({mode:params&&params.mode==='edit'?'':'edit'})}
                    />
                    )
            }
        }
    },
    page4:{
        screen:Page4,
        navigationOptions:({navigation})=>({
            title:'page4',
        })
    },
    bottom:{
        screen:AppBottomNavigator,
        navigationOptions:({navigation})=>({
            title:'AppBottomNavigator',
        })
    },
    top:{
        screen:AppTopNavigator,
        navigationOptions:({navigation})=>({
            title:'AppTopNavigator',
        })
    }
});

export default createAppContainer(AppStackNavigator);
