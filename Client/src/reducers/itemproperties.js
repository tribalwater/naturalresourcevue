import * as actions from '../consts/ActionTypes';

const intitialState = {
    isFetching: false,
    fields: [],
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
                display : action.payload.display,
            };

        case actions.RECEIVE_ITEM_PROPETIES_SECTIONS: 
            return {
                ...state,
                sections: action.payload
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