import * as actions from "../consts/ActionTypes";

export const searchItemType = (payload) =>  dispatch =>{
    dispatch({
     type: actions.API,
     payload: {
       url: `/item/${payload.itemtype}/${payload.itemsubtype}/properties/viewmodel/${payload.itemid}`,
       //schema: [schema.books],
       success:(payload) => [
         receiveItemProperties(payload),
         receiveItemPropertiesButtons(payload.buttons)
       ] ,
       label: 'itemproperties',
       method: "GET"
     } 
   })
 };