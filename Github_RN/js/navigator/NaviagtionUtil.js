/**
 * 全局导航跳转工具类
 */
export default class NavigationUtil {
    /**
     * 返回上一页
     * @param {导航控制器} navigation 导航控制器
     */
    static goBack(navigation){
        navigation.goBack();
    }
    /**
     * 返回首页
     * @param {当前页面的props} params 当前页面的props
     */
    static resetToHomePage(params){
        const {navigation} = params;
        navigation.navigate('Main');
    }
    /**
     * 跳转到指定页面
     * @param {当前页面的props} params 当前页面的props
     * @param {跳转页面的profile} page 跳转页面的profile
     */
    static goPage(params,page){
        const navigation = NavigationUtil.navigation;
        if(!navigation){
            console.log('navigation can not be null');
        }else{
            navigation.navigate(
                page,
                {...params}
                );
        }
    }
}