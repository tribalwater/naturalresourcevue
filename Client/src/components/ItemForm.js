import React, { Component } from 'react';
import { Button, Header, Image, Modal, Form, Input, TextArea, Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


import {ItemPickList, ItemText, ItemTextArea, ItemDate, ItemLookUpThrottled, ItemHidden, ItemCheckBox}  from './itemformfields';


class ItemForm extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.jsonToFormFields = this.jsonToFormFields.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(e, vals){
        console.log("--- form change ---", Object.keys(e))
        console.log("--- form change value ---", vals)
        console.log("--- form change name ---", e.target.name)
        
        
        this.setState({ [vals.name] : vals.value });
       // this.props.setTrackingForm({ [vals.name] : vals.value })
    }  
    jsonToFormFields(field, idx, arr){
        switch (field.fieldtype) {
            case "date":
                return <ItemDate onChange={this.handleFormChange} label={field.displayname} selectedDate= {moment()}></ItemDate>
                
                break;

            case "picklist":
                return  <ItemPickList   onChange={this.handleFormChange} selectOpions = {field.seloptions}  label = {field.displayname} /> ;
                break; 

            case "label":
               return  <div> this field type not yet implemented {field.fieldtype} for {field.displayname} </div>
                
                break;

            case "lookup":
                return <ItemLookUpThrottled   onChange={this.handleFormChange} label = {field.displayname} />
                break;
            
            case "pickwindow":
                return <div> this field type not yet implemented {field.fieldtype} for {field.displayname} </div>
                break;
            
            case "readonly":
                return;// <ItemHidden />;
                break;
            
            case "linkedfield":
            return;// <ItemHidden />
                break;

            case "checkbox":
                return <ItemCheckBox checkboxes={field.checkboxes}   label = {field.displayname} />
                break;  

            case "textarea":
                return <ItemTextArea  onChange={this.handleFormChange} rows={field.rows} label={field.displayname} />
                break; 
                
            
            case "text":
                return <ItemText   onChange={this.handleFormChange}label={field.displayname} />;
                break;
                
            // case "date":
                
            //     break;    
            // case "date":
                
                break;                 
            default:
            return <div> this field type not yet implemented {field.fieldtype} for {field.displayname} </div>
                break;
        }

    }
    render() {
        let {formFieldJson} = this.props || [];
        let formfields = formFieldJson.map(this.jsonToFormFields)
        return (
            <div>
                 <Form> 
                 {formfields}  
                 </Form>    
            </div>
        );
    }
}

export default ItemForm;