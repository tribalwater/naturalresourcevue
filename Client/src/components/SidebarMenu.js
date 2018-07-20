import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import {Menu, Icon, Sidebar } from "semantic-ui-react";

let links = {
  "fcnode": {
    "-name": "Homepage",
    "-link": "welcome.aspx",
    "-fcid": "0",
    "fcnode": [
      {
        "-name": "GW Permit",
        "-link": "/item/datagrid/document/gwpermit",
        "-args": "?itemtype=document&subtype=gwpermit",
        "-fcid": "1",
        "fcnode": {
          "-name": "Display Name",
          "-link": "underconstruction.html",
          "-fcid": "2"
        }
      },
      {
        "-name": "Ssdos",
        "-link": "/item/datagrid/document/ssdp",
        "-args": "?itemtype=document&subtype=ssdo",
        "-fcid": "3"
      },
      {
        "-name": "Allotments",
        "-link": "/item/datagrid/part/allotment",
        "-args": "?itemtype=document&subtype=ssdo",
        "-fcid": "3"
      },
      {
        "-name": "Well Tags",
        "-link": "/item/datagrid/part/welltag",
        "-args": "?itemtype=document&subtype=ssdo",
        "-fcid": "3"
      }
    ]
  }
}
class SidebarMenu extends Component {

  constructor(props){
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }
  
  handleMenuClick(l){
    let {history, tabs} = this.props;
    history.push({  pathname : `/tabs/${tabs.length}${l["-link"]}`, state : {name : l["-name"], cameFromTab: true  }   });
  }
  render() {
      let navLinks = links.fcnode.fcnode;
      let {tabs} = this.props;
      let mappedLinks = navLinks.map( (l, idx) =>   <Menu.Item key = {l["-name"] + idx} onClick = {() => this.handleMenuClick(l)}> {l["-name"] } </Menu.Item>)
     
        return (
          <Sidebar width='thin' as={Menu} animation="uncover" visible={this.props.menuVisible} icon="labeled" vertical >
            <Menu.Item><Icon name="home" />Home</Menu.Item>
            <Menu.Item><Icon name="block layout" />Topics</Menu.Item>
            <Menu.Item><Icon name="smile" />Friends</Menu.Item>
            <Menu.Item><Icon name="calendar" />History</Menu.Item>   
            {mappedLinks} 
          </Sidebar>
        
        );
    }
}


const mapStateToProps = state => {
    return {
      tabs : state.tabs,
    };
};

export default  withRouter( connect(mapStateToProps)(SidebarMenu) );