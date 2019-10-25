import Types from '../types'
import {handleData,handleFail} from '../ActionUtil'
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';
/**
 * 获取最热数据的异步action
 */
export function onLoadTrendingData(storeName,url,pageSize){
    return dispatch=>{
        dispatch({type: Types.TRENDING_REFRESH, storeName: storeName});
        setTimeout(() => {
            let dataStore = new DataStore();
        dataStore.fetchData(url,FLAG_STORAGE.flag_trending)
            .then(data=>{
                handleData(Types.TRENDING_REFRESH_SUCCESS,dispatch,storeName,data,pageSize);
            }).catch(error=>{
                console.log(error);
                handleFail(Types.TRENDING_REFRESH_FAIL,dispatch,storeName,error);
            })
        },2000);
        
    }
}
/**
 * 加载更多
 */
export function onLoadMoreTrending(storeName,pageIndex,pageSize,dataArray=[],callback){
    return dispatch => {
        setTimeout(() => {
            if((pageIndex-1)*pageSize >= dataArray.length){//已全部加载
                if(typeof callback === 'function'){
                    callback('no more data');
                }
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    error:'no more data',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            }else{
                let max = pageSize*pageIndex > dataArray.length ? dataArray.length:pageIndex*pageSize;
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0,max),
                })
            }
        }, 500);
    }
}

// function handleData(dispatch,storeName,data,pageSize){
//     let fixItems = [];
//     if(data&&data.data&&data.data.items){
//         fixItems = data.data.items;
//     }
//     dispatch({
//         type: Types.TRENDING_REFRESH_SUCCESS,
//         items: data && data.data && data.data.items,
//         projectModes: pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize),
//         storeName,
//         pageIndex:1,
//     });
// }
// function handleFail(dispatch,storeName,error){
//     dispatch({
//         type: Types.TRENDING_REFRESH_FAIL,
//         error,
//         storeName
//     });
// }