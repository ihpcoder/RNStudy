/**
 * 全局导航跳转工具类
 */
export default class NavigationUtil {
    /**
     * 返回上一页
     * @param {导航控制器} navigation 
     */
    static goBack(navigation){
        navigation.goBack();
    }
    /**
     * 返回首页
     * @param {当前页面的props} params 
     */
    static resetToHomePage(params){
        const {navigation} = params;
        navigation.navigate('Main');
    }
}