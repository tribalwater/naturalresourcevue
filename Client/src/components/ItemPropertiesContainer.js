import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router'

import ItemPropertiesTable      from "./common/ItemPropertiesTable";
import {getItemProperties, toggleSection}        from "../actions/itemproperties";
import {addTab}        from "../actions/tabs";
import { getVisibileItemFields} from "../selectors/itemproperties";


class ItemPropertiesContainer extends Component {

  componentWillMount(){
    let {params} = this.props.match
    
  
    this.props.getItemProperties({itemtype: params.itemtype, itemsubtype: params.itemsubtype, itemid: params.itemid})
  }


  componentWillReceiveProps(nextProps){
    let {params} = this.props.match;
    let newParams = nextProps.match.params;
    if(params.itemid !== newParams.itemid){
      this.props.getItemProperties({itemtype: newParams.itemtype, itemsubtype: newParams.itemsubtype, itemid: newParams.itemid})
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
        if(fields.length > 0 && this.props.sections){
          table = <div>"table" </div>
           table = <ItemPropertiesTable fields= {fields} sections={sections} toggleSection = {toggleSection} />
        }else{
          table = <div>laoding</div>
        }
        return (
            table
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
  
