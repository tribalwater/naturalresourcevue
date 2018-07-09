import * as actions from '../consts/ActionTypes';

const intitialState = {
    isFetching: false,
    fields: [],
    buttons: [],
    tabs: [],
    tabsBaseUrl: "",
    display:{},
    sections: null,
    futureUrl: null,
    nextUrl: null,
}

const  itemproperties = (state = intitialState , action ) => {
    switch(action.type){

        case actions.RECEIVE_ITEM_PROPETIES:        
            return {
                ...state,
                fields   : action.payload.records,
                tabs: action.payload.tabs,
                buttons: action.payload.buttons,
                display : action.payload.display,
                sections : action.payload.sections
            };
        
        case actions.RECEIVE_ITEM_PROPETIES_TABS_BASEURL: 
            return {
                ...state,
                tabsBaseUrl: action.payload
            };

            
        case actions.RECEIVE_ITEM_PROPETIES_SECTIONS: 
            return {
                ...state,
                sections: action.payload
            };

        case actions.RECEIVE_ITEM_PROPETIES_BUTTONS:        
            return {
                ...state,
               buttons: action.payload
            };

        case actions.TOGGLE_ITEMPROPERTIES_SECTION :
           let newSections = Object.assign({}, state.sections);
           newSections[action.payload].isVisible = !newSections[action.payload].isVisible;
            return {
               ...state,
               sections : newSections
            }    

        default: 
            return state;

    }
}

export default itemproperties;