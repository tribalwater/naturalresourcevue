import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, withRouter } from 'react-router-dom';
import {Segment} from "semantic-ui-react";

import {Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map as LeafletMap,
  Marker,
  Popup,
  Rectangle,
  TileLayer } from "react-leaflet";

import {getItemProperties, toggleSection, receiveItemPropertiesTabsBaseUrl} from "../actions/itemproperties";
import {addTab}        from "../actions/tabs";
import { getVisibileItemFields} from "../selectors/itemproperties";

import ItemPropertiesTable     from "./common/ItemPropertiesTable";
import MainPageHeader          from "./MainPageHeader.1";
import ItemPropertiesButtons   from "./ItemPropertiesButtons";
import ItemPropertiesTabs      from "./ItemPropertiesTabs";
import {ItemMapTest} from "./maps";

 
const  ItemMessages = ({fields, sections, toaggleSection}) => {
  return <div>I am the container for item message</div>
};

const  ItemNotes = ({}) => {
  return <div>I am container for  item notes</div>
};

const  ItemFiles = ({}) => {
  return <div>I am container for  item Files</div>
};

const  ItemRelations = ({}) => {
  return <div>I am container for  item relations</div>
};

const ItemMap = ({}) => {
  return <div>I am going to be a map??</div>
}

class ItemPropertiesContainer extends Component {

  componentWillMount(){
    let {params} = this.props.match;
    this.props.getItemProperties({itemtype: params.itemtype, itemsubtype: params.itemsubtype, itemid: params.itemid})
    this.props.receiveItemPropertiesTabsBaseUrl(this.props.match.url);
    console.log(" --- props props ----");
    console.log(this.props)
  }

  componentWillReceiveProps(nextProps){
    let {params} = this.props.match;
    let newParams = nextProps.match.params;
    if(params.itemid !== newParams.itemid){
      this.props.getItemProperties({itemtype:'document', itemsubtype: 'gwpermit', itemid: '50509'})
    }
    
  }

  componentDidMount(){
     let tabs   = this.props.tabs;
     let url    = this.props.match.url;
   
     let currentURLTabArr = tabs.filter(t => t.url === url);
     let urlArr           = url.split("/");
     let name             = urlArr[urlArr.length - 2 ];
    
   }
     
   render() {
        
        let {fields, sections, toggleSection} = this.props;
        let {params} = this.props.match;
      
        return (
           <div>
             <MainPageHeader
              header = "Item Properties"
              buttonGroupTwo = {<ItemPropertiesTabs  height={this.props.height}  baseUrl={this.props.location.pathname} />}
              buttonGroupOne = {<ItemPropertiesButtons  height={this.props.height} itemtype={params.itemtype} subtype={params.itemsubtype} itemid = {params.itemid} /> }
             >
             </MainPageHeader>
             <Segment  className="page-container" style={{height: this.props.height}}>  
              <Switch>
                    <Route exact path="/tabs/:tabid/item/properties/:itemtype/:itemsubtype/:itemid" 
                           render = { () =>  <ItemPropertiesTable    height={this.props.height} fields= {fields} sections={sections} toggleSection = {toggleSection} />  }    />
                    <Route exact path="/tabs/:tabid/item/properties/:itemtype/:itemsubtype/:itemid/(properties|properties/properties)" 
                           render = { () =>  <ItemPropertiesTable    height={this.props.height} fields= {fields} sections={sections} toggleSection = {toggleSection} />  }    />                       
                    <Route exact path="/tabs/:tabid/item/properties/:itemtype/:itemsubtype/:itemid/(messages|properties/messages)" 
                           render = { () => <ItemMessages  height={this.props.height}  /> }  />
                    <Route exact path="/tabs/:tabid/item/properties/:itemtype/:itemsubtype/:itemid/(notes|properties/notes)" 
                           render = { () => <ItemNotes   height={this.props.height}  /> }  />
                    <Route exact path="/tabs/:tabid/item/properties/:itemtype/:itemsubtype/:itemid/(files|properties/files)" 
                           render = { () => <ItemFiles   height={this.props.height} />  }  />
                    <Route exact path="/tabs/:tabid/item/properties/:itemtype/:itemsubtype/:itemid/(relations|properties/relations)" 
                           render = { () => <ItemRelations  height={this.props.height } />    }  />
                    <Route exact path="/tabs/:tabid/item/properties/:itemtype/:itemsubtype/:itemid/(map|properties/map)" 
                           render = { () => <ItemMapTest  height={this.props.height } />    }  />                                    
            
              </Switch>
            </Segment>
          </div>  
        );
    }
}

const mapStateToProps = state => {
    return {
      tabs : state.tabs,
      fields : getVisibileItemFields(state),
      sections : state.itemproperties.sections
    };
};

const dispatchObj = {addTab, getItemProperties, toggleSection, receiveItemPropertiesTabsBaseUrl}

export default  withRouter( connect(mapStateToProps, dispatchObj)(ItemPropertiesContainer) );
  
