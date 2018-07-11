import React, { Component } from 'react';
import { Button, Menu, Icon } from "semantic-ui-react";

import ItemFormModel from './ItemFormModel';

class ItemEditButton extends Component {
    constructor(props){
        super(props);
        this.state = {showFormModal: false};
    }
    
    handleItemClick = (e) => {
        console.log("handle item click")
       
    } 

    toggleFormModal = (e) => {
        this.setState({showFormModal: !this.state.showFormModal});
    } 
    
    onFormSubmit = (e) => this.setState({showFormModal: false}); 
    onFormCancel = (e) => this.setState({showFormModal: false}); 
    
        
    render() {
        let{button,  itemtype, subtype, itemid} = this.props;
        console.log("edit -----")
        console.log("-----edit buttons -----", itemtype)
        if(this.state.showFormModal){
            return (
                <div>
                    <Menu.Item
                        color="blue"
                        name= {button.name}
                        onClick={ () => this.toggleFormModal(button)}
                    >
                        <Icon name={button.icon}  color="blue" size="large" />
                        {button.labuttonel}
                    </Menu.Item>
                    <ItemFormModel  action={"Edit"} 
                                    itemtype={itemtype} 
                                    subtype={subtype} 
                                    itemid = {itemid} 
                                    onClose = {this.toggleFormModal }
                                    height={this.props.height}
                                    onSumbit = {this.onFormSubmit}
                                    onCancel = {this.onFormCancel}
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
                        <Icon name={button.icon} color="blue" size="large"  />
                        {button.label}
                    </Menu.Item>
                </div>
            );
        }
        
    }
}

export default ItemEditButton;