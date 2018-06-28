import * as actions from "../consts/ActionTypes";

export const receiveItemList  = (payload) => ({
    type: actions.RECEIVE_ITEM_LIST,
    payload
});

export const getItemList = (payload) =>  dispatch =>{
   dispatch({
    type: actions.API,
    payload: {
      url: `/item/${payload.itemtype}/${payload.itemsubtype}/list/viewmodel`,
      //schema: [schema.books],
      success: receiveItemList,
      label: 'itemlist',
      method: "GET"
    } 
  })
};


export const requestItemProperties = (payload) => ({
  type: actions.API,
  payload: {
    url: `/item/${payload.itemtype}/${payload.itemsubtype}/properties/${payload.itemid}`,
    //schema: [schema.books],
    success: ({ entities }) => [
      receiveItemList(entities)
    ],
    label: 'itemproperties'
  }
});

  
