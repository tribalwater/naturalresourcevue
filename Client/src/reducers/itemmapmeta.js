import * as actions from '../consts/ActionTypes';

const intitialState = {
    isFetching: false,
    url : null,
    query : null,
    gisfield : null,
    tdfield : null,
    outfields : null,

}

const  itemmapmeta = (state = intitialState , action ) => {
    switch(action.type){

        case actions.RECEIVE_ITEM_MAP_META :       
            return {
                ...state,
                url : action.payload.url,
                query : action.payload.query,
                gisfield: action.payload.gisfield,
                tdfield: action.payload.tdfield,
                outfields: action.payload.outfields
            };

        default: 
            return state;

    }
}

export default itemmapmeta;