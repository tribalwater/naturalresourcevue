import {applyMiddleware, createStore, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import api from "./middleware/api";
import log from "./middleware/log";
import mutli from "./middleware/multi";

import mainReducer from './reducers'

const middleWare = applyMiddleware(  mutli, api, thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(mainReducer, composeEnhancers(middleWare) );


export default store;