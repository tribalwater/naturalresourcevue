import { combineReducers } from 'redux'

const tabLinks = [
    {
      name: "cHole",
      url: "/roster/1"
    }
  ];
  const tabs = (state = tabLinks, action) => {
    switch (action.type) {
      case "ADD_ITEM":
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
    tabs
  })