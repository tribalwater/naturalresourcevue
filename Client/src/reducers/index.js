import { combineReducers } from 'redux';
import * as actions from '../consts/ActionTypes';
import itemlist from './itemlists';
import itemproperties from './itemproperties';

const tabLinks = [
    {
      name: "cHole",
      url: "/roster/1"
    }
  ];
  const tabs = (state = tabLinks, action) => {
    switch (action.type) {
      case actions.ADD_TAB:
        return state.concat([{ name: action.name, url: action.url }]);
        break;
  
      case "GET_ITEM":
        return state.concat([{ title: action.title }]);
        break;
      default:
        return state;
    }
  };
  

  export default combineReducers({
    tabs,
    itemlist,
    itemproperties
  })
  