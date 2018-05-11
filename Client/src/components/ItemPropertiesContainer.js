import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router'


import ItemPropertiesTable      from "./common/ItemPropertiesTable";
import {getItemList}        from "../actions/items";
import {addTab}        from "../actions/tabs";


class ItemPropertiesContainer extends Component {

   componentDidMount(){
     let tabs   = this.props.tabs;
     let url    = this.props.match.url;
   
     let currentURLTabArr = tabs.filter(t => t.url === url);
     let urlArr           = url.split("/");
     let name             = urlArr[urlArr.length - 2 ];
    
     if(currentURLTabArr.length < 1){
       this.props.addTab({ url: url, name: name })
     }
   }
   
   render() {
        return (
            <ItemPropertiesTable fields= {this.props.fields}></ItemPropertiesTable>
        );
    }
}

const mapStateToProps = state => {
    return {
      tabs : state.tabs
    };
};

const dispatchObj = {addTab}

export default  withRouter( connect(mapStateToProps, dispatchObj)(ItemPropertiesContainer) );
  
