import Types from '../types'
import {handleData,handleFail, _projectModels} from '../ActionUtil'
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';
/**
 * 获取最热数据的异步action
 */
export function onLoadPopularData(storeName,url,pageSize,favorireDao){
    return dispatch=>{
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url,FLAG_STORAGE.flag_popular)
            .then(data=>{
                handleData(Types.POPULAR_REFRESH_SUCCESS,dispatch,storeName,data,pageSize,favorireDao);
            }).catch(error=>{
                console.log(error);
                handleFail(Types.POPULAR_REFRESH_FAIL,dispatch,storeName,error);
            })
    }
}
/**
 * 加载更多
 */
export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray=[],callback,favorireDao){
    return dispatch => {
        setTimeout(() => {
            if((pageIndex-1)*pageSize >=dataArray.length){//已全部加载
                if(typeof callback === 'function'){
                    callback('no more data');
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error:'no more data',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                })
            }else{
                let max = pageSize*pageIndex > dataArray.length ? dataArray.length:pageIndex*pageSize;
                let items = dataArray.slice(0,max);
                _projectModels(items,favorireDao,(projectModels)=>{
                    dispatch({
                        type: Types.POPULAR_LOAD_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModes: projectModels,
                    })
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
//         type: Types.POPULAR_REFRESH_SUCCESS,
//         items: data && data.data && data.data.items,
//         projectModes: pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize),
//         storeName,
//         pageIndex:1,
//     });
// }
// function handleFail(dispatch,storeName,error){
//     dispatch({
//         type: Types.POPULAR_REFRESH_FAIL,
//         error,
//         storeName
//     });
// }