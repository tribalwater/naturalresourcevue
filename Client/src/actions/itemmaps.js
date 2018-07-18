import * as actions from "../consts/ActionTypes";


export const receiveItemMapMeta =  (payload) => {
    return ({
     type: actions.RECEIVE_ITEM_MAP_META,
     payload
    })
};

export const getItemMapMeta = (payload) =>  dispatch =>{
    dispatch({
     type: actions.API,
     payload: {
       url: `/item/${payload.itemtype}/${payload.itemsubtype}/mapmeta`,
       //schema: [schema.books],
       success:(payload) => [
         receiveItemMapMeta(payload)
       ] ,
       label: 'itempmapmeta',
       method: "GET"
     } 
   })
 };