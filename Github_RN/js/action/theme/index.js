import Types from '../types'
import ThemeDao from '../../expand/dao/ThemeDao';
/**
 * 主体变更
 * @param {*} theme 
 */
export function onThemeChange(theme){
    return {
        type: Types.THEME_CHANGE,
        theme: theme
    }
}
/**
 * 初始化主题
 */
export function onThemInit() {
    return dispatch => {
        new ThemeDao().getTheme().then((data)=>{
            dispatch(onThemeChange(data));
        })
    }
}
export function onShowCustomThemeView(show){
    return {type: Types.SHOW_THEM_VIEW,customThemeViewVisible:show};
}