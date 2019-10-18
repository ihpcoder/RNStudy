import Types from '../types'
import DataStore from '../../expand/dao/DataStore';
/**
 * 获取最热数据的异步action
 */
export function onLoadPopularData(storeName,url){
    return dispatch=>{
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url)
            .then(data=>{
                handleData(dispatch,storeName,data);
            }).catch(error=>{
                console.log(error);
                handleFail(dispatch,storeName,error);
            })
    }
}

function handleData(dispatch,storeName,data){
    dispatch({
        type: Types.LOAD_POPULAR_SUCCESS,
        items: data && data.data && data.data.items,
        storeName
    });
}
function handleFail(dispatch,storeName,error){
    dispatch({
        type: Types.LOAD_POPULAR_FAIL,
        error,
        storeName
    });
}