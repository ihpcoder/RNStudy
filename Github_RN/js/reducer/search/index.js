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
                showBottomButton: false,
                showText:'取消',
            }
        }
        case Types.SEARCH_REFRESH_SUCCESS:{
            return{
                ...state,
                items:action.items,
                isLoading: false,
                showBottomButton: action.showBottomButton,
                hideLoadingMore: action.hideLoadingMore,
                projectModels: action.projectModels,
                pageIndex: action.pageIndex,
                showText: '搜索',
                inputKey: action.inputKey,
            }
        }
        case Types.SEARCH_REFRESH_FAIL:{
            return{
                ...state,
                isLoading: false,
                showText: '搜索',
            }
        }
        case Types.SEARCH_CANCEL:{
            return{
                ...state,
                isLoading: false,
                showText: '搜索',
            }
        }
        case Types.SEARCH_LOAD_MORE_SUCCESS:{
            return {
                ...state,
                projectModels: action.projectModels,
                pageIndex: action.pageIndex,
            }
        }
        case Types.SEARCH_LOAD_MORE_FAIL: {
            return {
                ...state,
                hideLoadingMore:true,
                pageIndex: action.pageIndex,
            }
        }
        default:
            return state;
    }
}