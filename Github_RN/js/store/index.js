import {applyMiddleware, createStore} from 'redux'
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers'
import thunk from 'redux-thunk'
import reducers from '../reducer'

const logger = store => next => action =>{
    console.log('prev state',store.getState())
    console.log('dispatch',action);
    let result = next(action);
    console.log('next state',store.getState());
    return result;
}
const middleware = createReactNavigationReduxMiddleware(
    state=>state.nav,
);
const middlewares = [
    middleware,
    thunk,
    // logger,
];
/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));