import Types from '../types'
import ArrayUtil from '../../util/ArrayUtil'
import {handleData,handleFail, _projectModels,doCallBack} from '../ActionUtil'
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';
import Utils from '../../util/Utils';
const API_URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars';
const CACEL_TOKENS = [];


function getFetchUrl(key) {
    return API_URL + key + QUERY_STR;
}
function hasCancel(token,isRemove){
    if(CACEL_TOKENS.includes(token)){
        isRemove&&ArrayUtil.remove(CACEL_TOKENS,token);
        return true;
    }
    return false;
}
/**
 * 获取最热数据的异步action
 */
export function onSearch(inputKey,pageSize,token,favorireDao,popularKeys,callback){
    return dispatch=>{
        dispatch({type: Types.SEARCH_REFRESH});
        fetch(getFetchUrl(inputKey)).then((response)=>{//如果任务取消，则不处理response
            return hasCancel(token)?null:response.json();
        }).then((responseData)=>{
            if(hasCancel(token,true)){//如果任务取消，则不处理response
                console.log('user cancel networking');
                return;
            }
            if(responseData&&responseData.items&&responseData.items.length>0){
                let items = responseData.items;
                handleData(Types.SEARCH_REFRESH_SUCCESS,dispatch,null,{data: items},pageSize,favorireDao,{
                    showBottomButton: !Utils.checkKeysIsExist(popularKeys,inputKey),
                    inputKey,
                });
            }else{
                const message = `没有找到关于${inputKey}的内容`;
                dispatch({type: Types.SEARCH_FAIL,message:message});
                doCallBack(callback,message);
                return;
            }
        }).catch((e)=>{
            console.log(e);
            dispatch({type:Types.SEARCH_FAIL,error:e});
        })
    }
}
export function onSearchCancel(token) {
    return dispatch=>{
        CACEL_TOKENS.push(token);
        dispatch({type:Types.SEARCH_CANCEL});
    }
}
/**
 * 加载更多
 */
export function onLoadMoreSearch(pageIndex,pageSize,dataArray=[],callback,favorireDao){
    return dispatch => {
        setTimeout(() => {
            if((pageIndex-1)*pageSize >=dataArray.length){//已全部加载
                if(typeof callback === 'function'){
                    callback('no more data');
                }
                dispatch({
                    type: Types.SEARCH_LOAD_MORE_FAIL,
                    error:'no more data',
                    pageIndex: --pageIndex,
                    hideLoadingMore: true,
                })
            }else{
                let max = pageSize*pageIndex > dataArray.length ? dataArray.length:pageIndex*pageSize;
                let items = dataArray.slice(0,max);
                _projectModels(items,favorireDao,(projectModels)=>{
                    dispatch({
                        type: Types.SEARCH_LOAD_MORE_SUCCESS,
                        pageIndex,
                        projectModels: projectModels,
                        
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
//         projectModels: pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize),
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