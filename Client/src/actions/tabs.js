import * as actions from "../consts/ActionTypes";


export const addTab = (payload) => (dispatch, getstate) => {
    dispatch({ type: actions.ADD_TAB, ...payload});
}