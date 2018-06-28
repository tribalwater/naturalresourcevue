import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import {Segment} from "semantic-ui-react";


import ItemPropertiesTable      from "./common/ItemPropertiesTable";
import {getItemProperties, toggleSection} from "../actions/itemproperties";
import {addTab}        from "../actions/tabs";
import { getVisibileItemFields} from "../selectors/itemproperties";

import MainPageHeader           from "./MainPageHeader.1";
import ItemPropertiesButtons from "./ItemPropertiesButtons";


class ItemPropertiesContainer extends Component {

  componentWillMount(){
    let {params} = this.props.match;

    this.props.getItemProperties({itemtype: params.itemtype, itemsubtype: params.itemsubtype, itemid: params.itemid})
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
    
    //  if(currentURLTabArr.length < 10){
    //    this.props.addTab({ url: url, name: name + tabs.length + 1 })
    //  }
     
   }

   
   render() {
        let table;
        let {fields, sections, toggleSection} = this.props;
        let {params} = this.props.match;
        if(fields.length > 0 && this.props.sections){
          table = <div>"table" </div>
           table = <ItemPropertiesTable fields= {fields} sections={sections} toggleSection = {toggleSection} />
        }else{
          table = <div>laoding</div>
        }
        return (
           <div>
             <MainPageHeader
              buttonGroupTwo = {<ItemPropertiesButtons itemtype={params.itemtype} subtype={params.itemsubtype} itemid = {params.itemid} /> }
             >
             </MainPageHeader>
            <Segment  className="page-container" style={{height: this.props.height}}>  
             {table}
            </Segment>
          </div>  
        );
    }
}

const mapStateToProps = state => {
    return {
      tabs : state.tabs,
      fields : getVisibileItemFields(state),
      // fields: state.itemproperties.fields,
      sections : state.itemproperties.sections
    };
};

const dispatchObj = {addTab, getItemProperties, toggleSection}

export default  withRouter( connect(mapStateToProps, dispatchObj)(ItemPropertiesContainer) );
  
