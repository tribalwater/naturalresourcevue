import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Menu, Icon } from "semantic-ui-react";


class ItemPropertiesButtons extends Component {
    state = {}
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
        let {buttons} = this.props;
        let menuItems =  buttons.map(b =>  { 
          return  <Menu.Item
                    name= {b.name}
                    active={activeItem === `${b.name}`}
                    onClick={this.handleItemClick}
                    >
                    <Icon name={b.icon} />
                    {b.label}
                  </Menu.Item>
        })
        return (
            <div className= "h-scroll">
                <Menu   tabular  secondary  fluid>
                    {menuItems}
                </Menu>   
            </div>
        );
    }
}

// case when button group type is menu

// case when button group type is button group

// case when button group type is other? ... 



const mapStateToProps = state => {
    return {
      buttons: state.itempropertiesbuttons.buttons
    };
};


const dispatchObj = {}
//getItemList

export default connect(mapStateToProps, dispatchObj)(ItemPropertiesButtons);