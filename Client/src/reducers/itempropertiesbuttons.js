import * as actions from '../consts/ActionTypes';

const intitialState = {
    isFetching: false,
    buttons: [
        {
            name: "view gis",
            label: "map",
            icon: "map",
            action: "viewMap"
        },
        {
            name: "edit item",
            label: "edit",
            icon: "edit",
            action: "goToItemEdit"
        },
        {
            name: "email item",
            label: "email",
            icon: "mail",
            action: "emailItem"
        },
        {
            name: "view history",
            label: "history",
            icon: "ellipsis vertical",
            action: "viewItemHistory"
        },
    ],
    display:{},
}

const  itempropertiesbuttons = (state = intitialState , action ) => {
    switch(action.type){

        case actions.RECEIVE_ITEM_PROPETIES_BUTTONS:        
            return {
                ...state,
               buttons: action.payload
            };

        default: 
            return state;

    }
}

export default itempropertiesbuttons;