import { async } from "rxjs/internal/scheduler/async";
import ProjectModel from '../model/ProjectModel'
import Utils from '../util/Utils'
/**
 * 网络请求结果处理
 */

/**
 * 成功处理
 * @param {*} type
 * @param {*} dispatch 
 * @param {*} storeName 
 * @param {*} data 
 * @param {*} pageSize 
 */
export function handleData(type,dispatch,storeName,data,pageSize,favoriteDao){
    let fixItems = [];
    if(data&&data.data){
        if(Array.isArray(data.data)){
            fixItems = data.data
        }else if(Array.isArray(data.data.items)){
            fixItems = data.data.items;
        }
    }
    let showItems = pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize);
    _projectModels(showItems,favoriteDao,projectModels=>{
        dispatch({
            type: type,
            items: fixItems,
            projectModes: projectModels,
            storeName,
            pageIndex:1,
            hideLoadingMore:pageSize>fixItems.length,
        });
    })
    
}
export async function _projectModels(showItems,favoriteDao,callback){
    let keys = [];
    try{
        keys = favoriteDao.getFavoriteKeys();
    }catch(e){
        console.log(e);
    }
    let projectModels = [];
    for(let i=0,len = showItems.length;i<len;i++ ){
        projectModels.push(new ProjectModel(showItems[i],favoriteDao,Utils.checkFavorite(showItems[i],keys)));
    }
    if(typeof callback ==='function'){
        callback(projectModels);
    }
}
/**
 * 失败处理
 * @param {*} type 
 * @param {*} dispatch 
 * @param {*} storeName 
 * @param {*} error 
 */
export function handleFail(type,dispatch,storeName,error){
    dispatch({
        type: type,
        error,
        storeName
    });
}