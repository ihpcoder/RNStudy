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