import Types from '../../action/types'

const defaultState = {
    
};
/**
 * popular:{
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
        case Types.POPULAR_REFRESH:{
            return{
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    isLoading: true,
                }
            }
        }
        case Types.LOAD_POPULAR_SUCCESS:{
            return{
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    isLoading: false,
                    items: action.items,
                }
            }
        }
        case Types.LOAD_POPULAR_FAIL:{
            return{
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    isLoading: false,
                }
            }
        }
        default:
            return state;
    }
}