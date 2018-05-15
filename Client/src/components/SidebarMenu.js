import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Menu, Icon, Sidebar } from "semantic-ui-react";

let links = {
  "fcnode": {
    "-name": "Homepage",
    "-link": "welcome.aspx",
    "-fcid": "0",
    "fcnode": [
      {
        "-name": "GW Permit",
        "-link": "/item/list/document/gwpermit",
        "-args": "?itemtype=document&subtype=gwpermit",
        "-fcid": "1",
        "fcnode": {
          "-name": "Display Name",
          "-link": "underconstruction.html",
          "-fcid": "2"
        }
      },
      {
        "-name": "ssdo",
        "-link": "/item/list/document/ssdp",
        "-args": "?itemtype=document&subtype=ssdo",
        "-fcid": "3"
      }
    ]
  }
}
class SidebarMenu extends Component {
  
    render() {
      let navLinks = links.fcnode.fcnode;
      let mappedLinks = navLinks.map( l =>  <Menu.Item><Link to = {l["-link"]} > {l["-name"]} </Link> </Menu.Item>)
      console.log(" ----- mapped links ----");
      console.log(mappedLinks)
        return (
          <Sidebar width='thin' as={Menu} animation="uncover" visible={this.props.menuVisible} icon="labeled" vertical inline >
            <Menu.Item><Icon name="home" />Home</Menu.Item>
            <Menu.Item><Icon name="block layout" />Topics</Menu.Item>
            <Menu.Item><Icon name="smile" />Friends</Menu.Item>
            <Menu.Item><Icon name="calendar" />History</Menu.Item>   
            {mappedLinks} 
          </Sidebar>
        
        );
    }
}

export default SidebarMenu;