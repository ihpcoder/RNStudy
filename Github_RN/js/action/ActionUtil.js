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
export function handleData(type,dispatch,storeName,data,pageSize){
    let fixItems = [];
    if(data&&data.data&&data.data.items){
        fixItems = data.data.items;
    }
    dispatch({
        type: type,
        items: data && data.data && data.data.items,
        projectModes: pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize),
        storeName,
        pageIndex:1,
    });
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