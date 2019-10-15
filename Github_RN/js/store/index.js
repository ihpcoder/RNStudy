import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'
import {middleware} from '../page/App'

const logger = store => next => action =>{
    console.log('prev state',store.getState())
    console.log('dispatch',action);
    let result = next(action);
    console.log('next state',store.getState());
    return result;
}

const middlewares = [
    middleware,

];
/**
 * 创建store
 */
export default createStore(reducers,applyMiddleware(...middlewares));