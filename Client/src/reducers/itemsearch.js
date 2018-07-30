import * as actions from '../consts/ActionTypes';

const intitialState = {
    isFetching: false,
    results: []
}

const  itemmapmeta = (state = intitialState , action ) => {
    switch(action.type){

        case actions.RECEIVE_ITEM_SEARCH_RESULTS :       
            return {
                ...state,
                results: action.payload
            };

        default: 
            return state;

    }
}

export default itemmapmeta;