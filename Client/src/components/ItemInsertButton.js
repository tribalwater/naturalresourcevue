import React, { Component } from 'react';
import { Button, Menu, Icon } from "semantic-ui-react";

import ItemFormModel from './ItemFormModel';


class ItemInsertButton extends Component {
    constructor(props){
        super(props);
        this.state = {showFormModal: false};
    }
    
    handleItemClick = (e) => this.setState({showFormModal: !this.state.showFormModal})
    toggleFormModal = (e) => {
        this.setState({showFormModal: !this.state.showFormModal});
    } 
         
    render() {
        let{button,  itemtype, subtype, itemid} = this.props;
   
        if(this.state.showFormModal){
            return (
                <div>
                    <Menu.Item
                        name= {button.name}
                        onClick={ () => this.toggleFormModal(button)}
                    >
                        <Icon name={button.icon} />
                        {button.labuttonel}
                    </Menu.Item>
                    <ItemFormModel  action={"edit"} 
                                    itemtype={itemtype} 
                                    subtype={subtype} 
                                    itemid = {itemid} 
                                    onClose = {this.toggleFormModal }
                    />
                </div>
            ); 
        }else{
            return (
                <div>
                    <Menu.Item
                        name= {button.name}
                        onClick={ () => this.toggleFormModal(button)}
                    >
                        <Icon name={button.icon} />
                        {button.label}
                    </Menu.Item>
                </div>
            );
        }
        
    }
}

export default ItemInsertButton;