import React, { Component } from 'react';
import { Button, Header, Image, Modal, Form, Input, TextArea, Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

import ItemLookUpThrottled from './itemformfields/ItemLookUpThrottled'
import ItemForm from './ItemForm';

class ItemFormModel extends Component {
  
    render() {
        let{ itemtype, subtype, itemid} = this.props;
            return (
                <Modal
                       closeIcon centered={true} 
                       size="fullscreen"
                       style= { { 'margin-top': '20px'} }
                       className="form-modal"
                       closeOnDimmerClick ={true}
                       closeOnDocumentClick = {true}
                       defaultOpen= {true}
                       onClose={this.props.onClose}
                 >
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                 
                   <ItemForm itemtype = {itemtype} subtype ={subtype}  height={this.props.height}  ></ItemForm>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative>Cancel</Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Submit' />
                    </Modal.Actions>
                </Modal>
            );
    }
}

export default ItemFormModel;

