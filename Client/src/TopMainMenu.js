import React, { Component } from 'react';
import {Menu, Icon } from "semantic-ui-react";

import HorizontalSlideMenu from "./common/HorizontalSlidMenu";

class TopMainMenu extends Component {
    render() {
        let {menuOnClick} = this.props;
        return (
            <Menu secondary attached="top"  compact className="top-menu">
                <Menu.Item onClick={menuOnClick}  >
                <Icon name="sidebar" />NR
                </Menu.Item>  
                <Menu.Item position="right">
                <HorizontalSlideMenu />      
                </Menu.Item>                
            </Menu>
        );
    }
}

export default TopMainMenu;