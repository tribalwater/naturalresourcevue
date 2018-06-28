import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Menu, Icon } from "semantic-ui-react";

import ItemFormModel from './ItemFormModel';
import EventHanlders from "../utils/EventHandlers";

import ItemEditButton from "./ItemEditButton";
import ItemInsertButton from "./ItemInsertButton";


class ItemPropertiesButtons extends Component {
    state = {
        isFormModalOpen : false,
        itemFormAction: null,
    }
    
    handleItemClick = (button) => {
        //this.setState({ activeItem: name })
        if(button.eventhandler == "editItem"){
            this.setState({itemFormAction: "edit"}, () => this.setState({ isFormModalOpen : true}) )
           
        }
      
    } 
    mapButtons(button){

    }
    render() {
      const { activeItem } = this.state
  
        let {buttons, itemtype, subtype, itemid} = this.props;
     
        let menuItems =  buttons.map(b =>  { 
          if(b.eventhandler == "editItem"){
              return <ItemEditButton button={b} itemtype={itemtype} subtype={subtype} itemid = {itemid} />
          }
          return  <Menu.Item
                    name= {b.name}
                    active={activeItem === `${b.name}`}
                    onClick={ () => this.handleItemClick(b)}
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


const mapStateToProps = state => {
    return {
      buttons: state.itemproperties.buttons
    };
};


const dispatchObj = {}
//getItemList

export default connect(mapStateToProps, dispatchObj)(ItemPropertiesButtons);