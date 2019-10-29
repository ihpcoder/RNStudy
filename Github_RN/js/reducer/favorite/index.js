import Types from '../../action/types'

/**
 * defaultState
 *  favotire:{
 *     popular:{
 *          isLoading: false,
 *          items:items
 *      },
 *      trending:{
 *          isLoading: false,
 *          items:items
 *      }
 *   }
 * 
 * }
 */

const defaultState = {};


export default function onAction(state = defaultState, action) {
    switch(action.type){
        case Types.FAVORITE_LOAD_DATA:{
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:action.isShowLoading,
                }
            }
        }
        case Types.FAVORITE_LOAD_SUCCESS:{
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    projectModels:action.projectModels,
                    isLoading:false,
                }
            }
        }
        case Types.FAVORITE_LOAD_FAIL:{
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    error: action.error,
                    isLoading:false,
                }
            }
        }
        default:
            return state;
    }
}