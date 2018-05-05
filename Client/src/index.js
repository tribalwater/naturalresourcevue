import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import {  Card, Sidebar, Segment} from "semantic-ui-react";

import { BrowserRouter } from 'react-router-dom'



import TopMainMenu         from "./TopMainMenu";
import SidebarMenu         from "./SidebarMenu";
import MainComponent       from "./MainComponent";

import 'semantic-ui-css/semantic.min.css';
import './index.css';


import mainReducer from "./reducers";

const store = createStore(mainReducer);

let src = "http://via.placeholder.com/450x150"
const CardExampleColored = () => (
  <Card.Group itemsPerRow={1}>
    <Card color='red' image={src} />
    <Card color='orange' image={src} />
    <Card color='yellow' image={src} />
    <Card color='olive' image={src} />
    <Card color='green' image={src} />
    <Card color='teal' image={src} />
    <Card color='blue' image={src} />
    <Card color='violet' image={src} />
    
  </Card.Group>
)

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
            <Sidebar.Pushable as={Segment} attached="bottom" >
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
