import { combineReducers } from 'redux';
import * as actions from '../consts/ActionTypes';
import itemlist from './itemlists';
import itemproperties from './itemproperties';
import itemformfields from "./itemformfields";
import itempropertiesbuttons from "./itempropertiesbuttons";
import itemmapmeta from "./itemmapmeta";


const tabLinks = [
    {
      id: 0,
      name: "home",
      url: "/"
    }
  ];
  const tabs = (state = tabLinks, action) => {
    switch (action.type) {
      case actions.ADD_TAB:
        return state.concat([{ id: state[state.length - 1].id + 1,   name: action.name, url: action.url }]);
        break;

      case actions.UPDATE_TAB_URL:
         return state.map(tab=> 
            tab.id == action.id ?
            { ...tab, url: action.url } :
            tab
         )
  
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
    itemproperties,
    itemformfields,
    itempropertiesbuttons,
    itemmapmeta
  })
  