import * as actions from '../consts/ActionTypes';

const intitialState = {
    isFetching: false,
    items: [],
    display: [],
    futureUrl: null,
    nextUrl: null,
}

const  itemlist = (state = intitialState , action ) => {
    switch(action.type){

        case actions.RECEIVE_ITEM_LIST:
            return {
                ...state,
                items   : action.payload.records,
                display : action.payload.display
            };

        default: 
            return state;

    }
}

export default itemlist