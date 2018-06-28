import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Menu, Icon } from "semantic-ui-react";

import ItemFormModel from './ItemFormModel';
import EventHanlders from "../utils/EventHandlers";

import ItemInsertButton from "./ItemInsertButton";
import ItemEditButton from "./ItemEditButton";


class ItemListButtons extends Component {
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
  
        let {buttons} = this.props;
        let menuItems =  buttons.map(b =>  { 
          if(b.eventhandler == "editItem"){
              return <ItemEditButton button={b}/>
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
      buttons: state.itemlist.buttons
    };
};


const dispatchObj = {}
//getItemList

export default connect(mapStateToProps, dispatchObj)(ItemListButtons);