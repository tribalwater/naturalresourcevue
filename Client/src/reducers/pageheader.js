import * as actions from '../consts/ActionTypes';

const intitialState = {
    isFetching: false,
    formfields: [],
    display:{},
    sections: null,
    futureUrl: null,
    nextUrl: null,
}

const  itemformfields = (state = intitialState , action ) => {
    switch(action.type){

        case actions.RECEIVE_ITEM_FORM_FIELDS:        
            return {
                ...state,
                fields   : action.payload.records,
                display : action.payload.display,
                sections : action.payload.sections
            };

        case actions.RECEIVE_ITEM_FORM_FIELDS_SECTIONS: 
            return {
                ...state,
                sections: action.payload
            };
        
        case actions.TOGGLE_ITEM_FORM_FIELDS_SECTION :
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

export default itemformfields;