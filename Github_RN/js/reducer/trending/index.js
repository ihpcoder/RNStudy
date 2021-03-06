import Types from '../../action/types'

const defaultState = {
    
};
/**
 * trending:{
 *      java:{
 *          items:[],
 *          isLoading:false,
 *      },
 *      ios:{
 *          items:[],
 *          isLoading:false,
 *      },
 *      react:{
 *          items:[],
 *          isLoading:false,
 *      },
 *      andriod:{
 *          items:[],
 *          isLoading:false,
 *      },
 * }
 * state 树横向扩展
 *  如何动态设置store 和动态获取store（难点 storekey不固定）
 * 
 * 
 */

export default function onAction(state = defaultState, action) {
    switch(action.type){
        case Types.TRENDING_REFRESH:{
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                }
            }
        }
        case Types.TRENDING_REFRESH_SUCCESS:{
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    items:action.items,
                    isLoading: false,
                    hideLoadingMore: action.hideLoadingMore,
                    projectModels: action.projectModels,
                    pageIndex: action.pageIndex,
                }
            }
        }
        case Types.TRENDING_REFRESH_FAIL:{
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading: false,
                }
            }
        }
        case Types.TRENDING_LOAD_MORE_SUCCESS:{
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore:false,
                    pageIndex: action.pageIndex
                }
            }
        }
        case Types.TRENDING_LOAD_MORE_FAIL: {
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    hideLoadingMore:true,
                    pageIndex: action.pageIndex
                }
            }
        }
        default:
            return state;
    }
}