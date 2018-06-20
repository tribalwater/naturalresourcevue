import * as actions from "../consts/ButtonActionTypes";

export const receiveItemProperties  = (payload) => {
   return ({
    type: actions.RECEIVE_ITEM_PROPETIES,
    payload : {...payload, records : fieldObjToArr(payload.records[0], payload.display), sections: getFieldSections( getLabelFields(fieldObjToArr(payload.records[0], payload.display)) , fieldObjToArr(payload.records[0], payload.display))}
   })
};


const ButtonActionHandlers = {};

ButtonActionHandlers.editItem = (payload) => {};
ButtonActionHandlers.sendItemEmail = (payload) => {};



export const HandleButtonAction = (payload, dispatch) => {
    
    let {action} = payload
    switch(action){

    }
}
export const getItemProperties = (payload) =>  dispatch =>{
    if(actions.hasOwnProeprty(payload.action)){
        HandleButtonAction(payload, dispatch);
        dispatch({
            type: actions.BUTTON_ACTION,
            payload: {
                action: payload.action
            } 
        });  
    }else{
        dispatch({
            type: actions.BUTTON_ACTION_ERROR,
            payload: "BUTTON ACTION TYPE NOT FOUND"
        });
     }
 };
