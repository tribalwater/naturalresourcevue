import React, { Component } from 'react';
import { connect } from "react-redux";

import ItemPropertiesTable      from "./common/ItemPropertiesTable";

import { withRouter } from 'react-router'


class ItemPropertiesContainer extends Component {

   componentDidMount(){
    console.log("---- container props -----");
    console.log(this.props)
     let tabs   = this.props.tabs;
     let url    = this.props.match.url;
   
     let tab    = tabs.filter(t => t.url == url);
     let urlArr = url.split("/");
     let name   = urlArr[urlArr.length - 2 ];
     console.log("---- tab -----");
     console.log(tab);
     if(tab.length < 1){
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
  
  const mapDispatchToProps = dispatch => {
    return {
      addTab: tab => {
        dispatch({ type: "ADD_ITEM", url: tab.url, name: tab.name });
      }
    };
  };
  
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemPropertiesContainer));
  
