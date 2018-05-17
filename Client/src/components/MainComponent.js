import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import {Segment} from "semantic-ui-react";

import { connect } from "react-redux";
import {addTab, updateTabUrl}        from "../actions/tabs";

import MainPageHeader           from "./MainPageHeader";
import ItemPropertiesContainer  from "./ItemPropertiesContainer";
import ItemListTableContainer   from "./ItemListTableContainer";




class MainComponent extends Component {
    constructor() {
        super();
        this.state = {
       
          menuVisible: false,
          formattedItemProps : [],
          containerHeight: 0
        };
  
        this.updateContainerDimensions = this.updateContainerDimensions.bind(this);
    }

    componentDidMount(){
        window.addEventListener("resize", this.updateContainerDimensions);
        this.updateContainerDimensions();
    }
  
    updateContainerDimensions(){
        let {content} = this.refs;
        let cHeight = content.offsetHeight - content.children[0].offsetHeight ;
        this.setState({containerHeight: cHeight });
    }   
    
    render() {
        return (
            <div>
            <div className="app-wrapper" ref="content">
                <MainPageHeader></MainPageHeader>
                <Segment  className="page-container" style={{height: this.state.containerHeight}}>    
                    <Switch>
                        <Route  path='/item/properties/:itemtype/:itemsubtype/:itemid' 
                                render = { () =>  <ItemPropertiesContainer  /> } 
                        />
                        <Route  path='/item/list/:itemtype/:itemsubtype' 
                                render = { () =>  <ItemListTableContainer /> }
                        />
                        <Route  path='/tabs/:tabid' 
                                render = { () =>  <Tabs  /> }
                        />
                    </Switch>
                </Segment>
            </div>
            </div>
        );
    }
}

export default MainComponent;




class Tabs extends Component {
 
    componentDidMount(){
     
        console.log(" --- does tab exists -----")
       //addTab({ url: match.url, name: `tab${match.params.id}`})
       this.updateTabs(this.props)
        
    }
    componentWillReceiveProps(nextProps){
        console.log("--- tabs receiving props -----")
        let {match, location} = nextProps;
      
        console.log(nextProps)
        if(this.props.location.pathname !==  location.pathname){
           
           this.updateTabs(nextProps)
                
        }
        
    }
    updateTabs(nextProps){
        let {match, addTab, tabs, location, history} = nextProps;
        let {params} =  match;
        let navState = history.location.state;
        console.log(nextProps)
        let name = navState && navState.name ? navState.name: 'undefned';
        let tab = tabs.filter(tab => tab.name == name)[0]
        console.log(tab)
        if(tab){
            console.log(" ---- tab does exists")
           updateTabUrl({url: history.location.url, id : params.tabid})
        }else{
            console.log("----- tab doent exists ------")
            addTab({ url: history.location.pathname, name:name})

        }
    }
     render(){
        return ( <Switch>
                    <Route path="/tabs/:tabid/item/list/:itemtype/:itemsubtype" render = { () =>  <ItemListTableContainer />}> </Route>
                    <Route path="/tabs/:tabid/item/properties/:itemtype/:itemsubtype/:itemid" render = { () =>  <ItemPropertiesContainer  />} /> 
                </Switch>
            )  
        
    }
}




const mapStateToProps = state => {
    return {
      tabs : state.tabs,
    };
};

const dispatchObj = {addTab, updateTabUrl}

Tabs =  withRouter(connect(mapStateToProps, dispatchObj)(Tabs))