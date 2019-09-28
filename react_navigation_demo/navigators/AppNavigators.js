import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {Button} from 'react-native'
import HomePage from '../pags/HomePage'
import Page1 from '../pags/Page1'
import Page2 from '../pags/Page2'
import Page3 from '../pags/Page3'
import Page4 from '../pags/Page4'

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
            const {state, stateParams} = navigation;
            const {params} = state;
            return {
                title:params.title?params.title:'this is page3'
                // headerRight:(
                //     <Button 
                //         title={params.mode==='edit'?'保存':'编辑'}
                //         // onPress={()=>setParams({mode:params.mode==='eidt'?'':'eidt'})}
                //     />
                //     )
            }
        }
    },
    page4:{
        screen:Page4,
        navigationOptions:({navigation})=>({
            title:'page4',
        })
    },
});

export default createAppContainer(AppStackNavigator);
