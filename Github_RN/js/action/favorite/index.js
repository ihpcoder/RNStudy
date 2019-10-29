import Types from '../types'
import { handleData, handleFail, _projectModels } from '../ActionUtil'
import FavoriteDao from '../../expand/dao/FavoriteDao';
import ProjectModel from '../../model/ProjectModel';
/**
 * 加载收藏的项目
 */
export function onLoadFavoriteData(flag, isShowLoading) {
    return dispatch => {
        dispatch({ type: Types.FAVORITE_LOAD_DATA, storeName: flag, isShowLoading });
        const favoriteDao = new FavoriteDao(flag)
        favoriteDao.getAllItems().then((items) => {
                let resultData = [];
                for (let i = 0; i < items.length; i++){
                    resultData.push(new ProjectModel(items[i],true));
                }
                dispatch({type:Types.FAVORITE_LOAD_SUCCESS,projectModels:resultData,storeName:flag})
        }).catch(error => {
            dispatch({type:Types.FAVORITE_LOAD_FAIL,error,storeName:flag})
        })
    }
}