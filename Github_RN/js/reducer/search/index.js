import Types from '../../action/types'

const defaultState = {
    showText: '搜索',
    items: [],
    isLoading: false,
    projectModels: [],
    hideLoadingMore: true,
    showBottomButton: false,
};
/**
 * search:{
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

 * 
 * 
 */

export default function onAction(state = defaultState, action) {
    switch(action.type){
        case Types.SEARCH_REFRESH:{
            return{
                ...state,
                isLoading: true,
                hideLoadingMore: true,
            }
        }
        case Types.SEARCH_REFRESH_SUCCESS:{
            return{
                ...state,
                items:action.items,
                isLoading: false,
                hideLoadingMore: action.hideLoadingMore,
                projectModels: action.projectModels,
                pageIndex: action.pageIndex,
            }
        }
        case Types.POPULAR_REFRESH_FAIL:{
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading: false,
                }
            }
        }
        case Types.POPULAR_LOAD_MORE_SUCCESS:{
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
        case Types.POPULAR_LOAD_MORE_FAIL: {
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