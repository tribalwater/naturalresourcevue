import fetch from 'cross-fetch';
import axios from "axios";
import { normalize } from 'normalizr';
import * as actions from "../consts/ActionTypes";
import { startNetwork, endNetwork } from '../actions/ui';


const baseURL = "http://localhost:51086/api";

const api = ({dispatch}) => next => action => {
    if(action.type !== actions.API){
       return next(action);
    }    
    const { url, success, asyncCb, schema, label, method, data } = action.payload;
    dispatch(startNetwork(label));
    axios({
        method: method,
        url: baseURL + url,
        data: data || {}
    })
    .then(response => {
        return response.data;
    })
    .then(data => {
        if (schema) {
            data = normalize(data, schema);
        }
        if(asyncCb){
            let successProm = Promise.resolve(data)
            asyncCb(successProm)
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