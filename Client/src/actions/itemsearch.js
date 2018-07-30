import * as actions from "../consts/ActionTypes";

export const receiveItemSearchResults = (payload) => dispatch => {
    return dispatch({
        type: actions.RECEIVE_ITEM_SEARCH_RESULTS,
        payload : payload
    })
};

export const searchItemType = (payload) =>  dispatch =>{
    dispatch({
     type: actions.API,
     payload: {
       url: `/item/${payload.itemtype}/${payload.itemsubtype}/searchlike`,
       //schema: [schema.books],
       success:(payload) => [
        receiveItemSearchResults(payload),
       ] ,
       asyncCb: payload.asyncCb,
       label: 'itemsearch',
       method: "POST",
       data : payload.data
     } 
   })
 };