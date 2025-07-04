import { createStore, applyMiddleware, combineReducers } from 'redux';

import {thunk} from 'redux-thunk';
import logger from 'redux-logger';

import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import globalReducer from './reducers/globalReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import authReducer from './reducers/authReducer';

export const reducers = combineReducers({
    global: globalReducer,
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer,
    auth: authReducer,
})

export const store = createStore(
    reducers,
    applyMiddleware(thunk)
);



