import * as actions from "../consts/ActionTypes";

export const receiveItemList  = (payload) =>  { 
    let formattedButtons =  payload.buttons.map(keysToLower).map( button => { button.icon = button.imageurl.replace("icon", ""); return button });
    let formattedPayload = {...payload, buttons : formattedButtons };
    return ({
      type: actions.RECEIVE_ITEM_LIST,
      payload : formattedPayload
    });
}

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

  
function keysToLower(obj){
  var key, keys = Object.keys(obj);
  var n = keys.length;
  var newobj={}
  while (n--) {
    key = keys[n];
    newobj[key.toLowerCase()] = obj[key];
  }
  return newobj;
}