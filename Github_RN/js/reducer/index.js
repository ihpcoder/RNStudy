import {combineReducers} from 'redux'
import theme from './theme'
import {rootCom,AppNavigator,switchNavigator} from '../navigator/AppNavigator'


// 1. 指定默认的state
const navState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(rootCom));
/**
 * 创建自己的navigation reducer
 */
const navReducer = (state=navState, action)=>{
    const nextState = AppNavigator.router.getStateForAction(action,state);
    //如果 nextState 为null或者undefined 只需返回原始state
    return nextState||state;
}
/**
 * 合并reducer 
 */
const index = combineReducers({
    nav: navReducer,
    theme:theme,
})
export default index;

