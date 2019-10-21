import Types from '../types'
import DataStore from '../../expand/dao/DataStore';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
/**
 * 获取最热数据的异步action
 */
export function onLoadPopularData(storeName,url,pageSize){
    return dispatch=>{
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url)
            .then(data=>{
                handleData(dispatch,storeName,data,pageSize);
            }).catch(error=>{
                console.log(error);
                handleFail(dispatch,storeName,error);
            })
    }
}
/**
 * 加载更多
 */
export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray=[],callback){
    return dispatch => {
        setTimeout(() => {
            if((pageIndex-1)*pageSize >dataArray.length){//已全部加载
                if(typeof callback === 'function'){
                    callback('no more data');
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error:'no more data',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            }else{
                let max = pageSize*pageIndex > dataArray.length ? dataArray.length:pageIndex*pageSize;
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0,max),
                })
            }
        }, 500);
    }
}

function handleData(dispatch,storeName,data,pageSize){
    let fixItems = [];
    if(data&&data.data&&data.data.items){
        fixItems = data.data.items;
    }
    dispatch({
        type: Types.POPULAR_REFRESH_SUCCESS,
        items: data && data.data && data.data.items,
        projectModes: pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize),
        storeName,
        pageIndex:1,
    });
}
function handleFail(dispatch,storeName,error){
    dispatch({
        type: Types.POPULAR_REFRESH_FAIL,
        error,
        storeName
    });
}