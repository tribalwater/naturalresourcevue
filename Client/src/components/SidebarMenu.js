import React, { Component } from 'react';
import {Menu, Icon, Sidebar } from "semantic-ui-react";

class SidebarMenu extends Component {
    render() {
        return (
          <Sidebar width='thin' as={Menu} animation="uncover" visible={this.props.menuVisible} icon="labeled" vertical inline >
            <Menu.Item><Icon name="home" />Home</Menu.Item>
            <Menu.Item><Icon name="block layout" />Topics</Menu.Item>
            <Menu.Item><Icon name="smile" />Friends</Menu.Item>
            <Menu.Item><Icon name="calendar" />History</Menu.Item>    
          </Sidebar>
        
        );
    }
}

export default SidebarMenu;