import fetch from 'cross-fetch';
import { normalize } from 'normalizr';
import * as actions from "../consts/ActionTypes";
import { startNetwork, endNetwork } from '../actions/ui';


const baseURL = "http://localhost:51086/api";

const api = ({dispatch}) => next => action => {
    if(action.type !== actions.API){
       return next(action);
    }    
    const { url, success, schema, label, method } = action.payload;
    dispatch(startNetwork(label));
    fetch(baseURL + url)
    .then(response => {
        return response.json()
    })
    .then(data => {
        if (schema) {
            data = normalize(data, schema);
        }
        dispatch(success(data));
        dispatch(endNetwork(label));
    })
    .catch(error => {
        console.error(error);
        dispatch(endNetwork(label))
    });
    next(action);
    
};

export default api;