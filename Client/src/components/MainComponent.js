import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import {Segment} from "semantic-ui-react";

import { connect } from "react-redux";
import {addTab}        from "../actions/tabs";

import MainPageHeader           from "./MainPageHeader";
import ItemPropertiesContainer  from "./ItemPropertiesContainer";
import ItemListTableContainer   from "./ItemListTableContainer";
import {getData, getDisp} from "../FakeData";



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

        for (const key in singleRec) {
          if (singleRec.hasOwnProperty(key)) {
            if(this.state.disp.hasOwnProperty(key))
              props.push(singleRec[key])
            
          }
        }
  
        for (const key in this.state.disp) {
          if (this.state.disp.hasOwnProperty(key)) {
            const element = this.state.disp[key];
            if(element.fieldtype === 'label'){
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
                        <Route  path='/item/properties/:itemtype/:itemsubtype/:id' 
                                render = { () =>  <ItemPropertiesContainer fields = {this.state.formattedItemProps} /> } 
                        />
                        <Route  path='/item/list/:itemtype/:itemsubtype' 
                                render = { () =>  <ItemListTableContainer fields = {this.state.formattedItemProps} /> }
                        />
                        <Route  path='/tabs' 
                                render = { () =>  <Tabs fields = {this.state.formattedItemProps} /> }
                        />
                    </Switch>
                </Segment>
            </div>
            </div>
        );
    }
}

export default MainComponent;

let itemList = ({match}) => <div>I am an item list  {match.url} </div>
let itemProps = () => <div> I am an item Props </div>
let tabLinks = ['tab1', 'tab2']


itemList= connect(maptabStateToProps, dispatchtabObj)(itemList)


class tab extends Component {
    componentDidMount(){
        let {match, addTab} = this.props
        console.log(match.url)
       addTab({ url: match.url, name: `tab${match.params.id}`})
        
    }
    componentWillReceiveProps(nextProps){
        let {match, addTab} = nextProps
        console.log(match)
        if(this.props.match.url !==  match.url){
            addTab({ url: match.url, name: `tab${match.params.id}`})
                
        }
        
    }
    render() {
        return (
            <Switch>
            <Route path="/tabs/:id/item/list/:itemtype/:itemsubtype" component={itemList}> </Route>
            <Route path="/tabs/:id/props" component={itemList}> </Route>
         </Switch>

        );
    }
}
const maptabStateToProps = state => {
    return {
      tabs : state.tabs,
    };
};

const dispatchtabObj = {addTab}

tab = connect(maptabStateToProps, dispatchtabObj)(tab)

class Tabs extends Component {
    componentDidMount(){
   
    }
     render(){
        return ( <div>
                    <h1>I am the tab container</h1>
                    <ul>
                        {
                            this.props.tabs.map((l, id) => <Link to = {`/tabs/${id}/item/list/document/ssdo`}>to tab </Link>)
                        }
                         <Link to = {`/tabs/1/item/list/document/dfdf`}>ssdo </Link>
                         <Link to = {`/tabs/4/item/list/document/ddfdfs`}>ssdo </Link>
                         
                    </ul>
                    <Route path="/tabs/:id" component={tab}> </Route>
                </div>
            )  
        
    }
}




const mapStateToProps = state => {
    return {
      tabs : state.tabs,
    };
};

const dispatchObj = {addTab}

Tabs = connect(mapStateToProps, dispatchObj)(Tabs)