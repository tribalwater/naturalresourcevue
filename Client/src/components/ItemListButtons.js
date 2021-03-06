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
        console.log(" ---- button ------", button)
        let {itemtype, subtype, tabid} = this.props; 
        if(button.eventhandler == "editItem"){
            this.setState({itemFormAction: "edit"}, () => this.setState({ isFormModalOpen : true}) );
        }else if(button.eventhandler == "goToInsert"){
            this.setState({itemFormAction: "insert"}, () => this.setState({ isFormModalOpen : true}) );
        }else if(button.eventhandler == "viewGis"){
            this.props.history.push(`/tabs/${tabid}/item/datagrid/${itemtype}/${subtype}/map`)
        }
      
    }

    render() {
      
        let {buttons,itemtype, subtype, itemid} = this.props;   
        let menuItems =  buttons.map(b =>  { 
          if(b.eventhandler == "editItem"){
              return <ItemEditButton button={b}  itemtype={itemtype} subtype={subtype} itemid = {itemid} height={this.props.height} />
          }else if(b.eventhandler == "goToInsert"){
               return <ItemInsertButton button={b}   itemtype={itemtype} subtype={subtype} itemid = {itemid} height={this.props.height}/>
          }
          return  <Menu.Item
                    name= {b.name}
                   
                    onClick={ () => this.handleItemClick(b)}
                    >
                    <Icon name={b.icon}   size="large" />
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


export default connect(mapStateToProps, dispatchObj)(ItemListButtons);