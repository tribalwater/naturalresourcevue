import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import {Segment} from "semantic-ui-react";

import ItemPropertiesTable      from "./common/ItemPropertiesTable";
import MainPageHeader           from "./MainPageHeader";
import ItemPropertiesContainer  from "./ItemPropertiesContainer";
import {getData, getDisp} from "./FakeData";



class MainComponent extends Component {
    constructor() {
        super();
        this.state = {
          data: getData(),
          disp: getDisp(),
          menuVisible: false,
          formattedItemProps : [],
          containerHeight: 0
        };
  
        this.updateContainerDimensions = this.updateContainerDimensions.bind(this);
      }
    componentWillMount(){
        let singleRec = this.state.data[0];
        let props = [];
        let labels = [];
  
        for (const key in singleRec) {
          if (singleRec.hasOwnProperty(key)) {
            if(this.state.disp.hasOwnProperty(key))
              props.push(singleRec[key])
            
          }
        }
  
        for (const key in this.state.disp) {
          if (this.state.disp.hasOwnProperty(key)) {
            const element = this.state.disp[key];
            if(element.fieldtype == 'label'){
              props.push(element)
            }
          }
        }
  
        props.sort( (a,b) => a.sortorder - b.sortorder)
        
        this.setState({formattedItemProps : props});
        
    }
    
    componentDidMount(){

        window.addEventListener("resize", this.updateContainerDimensions);
        this.updateContainerDimensions();
    }
  
    updateContainerDimensions(){
        console.log("---- refs -----");
        console.log(this.refs)
        let {content} = this.refs;
        let cHeight = content.offsetHeight - content.children[0].offsetHeight ;
        this.setState({containerHeight: cHeight });
  
    }   
    
    render() {
        return (
            <div className="app-wrapper" ref="content">
                <MainPageHeader></MainPageHeader>
                <Segment  className="page-container" style={{height: this.state.containerHeight}}>    
                    {/* <CardExampleColored></CardExampleColored>      */}
                    {/* <ItemPropertiesTable fields = {this.state.formattedItemProps} > </ItemPropertiesTable> */}
                    <Switch>
                     {/* <Route exact path='/' render = { () =>  <ItemPropertiesTable fields = {this.state.formattedItemProps} /> } /> */}
                     
                     <Route  path='/item/properties/:itemtype/:id' render = { () =>  <ItemPropertiesContainer fields = {this.state.formattedItemProps} /> }/>
                        {/* <Route path='/roster' component={Roster}/>
                        <Route path='/schedule' component={Schedule}/> */}
                    </Switch>
                </Segment>
            </div>
        );
    }
}

export default MainComponent;