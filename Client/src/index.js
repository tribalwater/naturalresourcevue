import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Sidebar, Segment} from "semantic-ui-react";

import { BrowserRouter } from 'react-router-dom'

import TopMainMenu         from "./components/TopMainMenu";
import SidebarMenu         from "./components/SidebarMenu";
import MainComponent       from "./components/MainComponent";



import 'semantic-ui-css/semantic.min.css';
import './index.css';

import store from "./store";

//import mainReducer from "./reducers";

//const store = createStore(mainReducer);

class App extends React.Component {
    constructor() {
      super();
      this.state = {
       
        menuVisible: false,
        formattedItemProps : [],
        containerHeight: 0
      };

     
    }

    render() {

      return (
        <Provider store={store}>
        <BrowserRouter>
          <div className="full-height"  >
            <TopMainMenu menuOnClick={() => this.setState({ menuVisible: !this.state.menuVisible })}></TopMainMenu>   
            <Sidebar.Pushable  as={Segment} attached="bottom" >
              <SidebarMenu menuVisible={this.state.menuVisible}></SidebarMenu>     
              <Sidebar.Pusher dimmed={this.state.menuVisible} >
                <MainComponent></MainComponent>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
          
        </BrowserRouter>
        
        </Provider>
      );
    }
}




render(<App />, document.getElementById("root"));
