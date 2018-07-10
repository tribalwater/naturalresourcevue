import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import { Button, Header, Image, Modal, Form, Input, TextArea, Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import{    
        ItemLookUpThrottled, ItemPickList, 
        ItemText, ItemTextArea, ItemDate,  
        ItemHidden, ItemCheckBox,
        ItemAutoNumber, ItemPickWindow
     }
from './itemformfields';

import {getVisibileFormFields} from "../selectors/itemformfields";
import {getItemFormFields, toggleSection} from "../actions/itemformfields";
import {addTab}  from "../actions/tabs";


class ItemForm extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.jsonToFormFields = this.jsonToFormFields.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }
    
    componentWillMount(){
        let{ itemtype, subtype} = this.props;
        console.log("--- will mount ---");
        console.log(this.props)
        this.props.getItemFormFields({itemtype:itemtype, itemsubtype: subtype})
      }
    
    
    componentWillReceiveProps(nextProps){
        let{ itemtype, subtype} = this.props; 
       
        if(subtype !== nextProps.subtype){
          this.props.getItemFormFields({itemtype:itemtype, itemsubtype: subtype})
        }
        
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
                return <ItemDate onChange={this.handleFormChange} label={field.displayname} selectedDate= {moment()}   height={this.props.height} />;
                
                break;

            case "picklist":
                return  <ItemPickList   onChange={this.handleFormChange} selectOpions = {field.seloptions}  label = {field.displayname}   height={this.props.height}/> ;
                break; 

            case "label":
               return  <div> this field type not yet implemented {field.fieldtype} for {field.displayname} </div>
                
                break;

            case "lookup":
                return <ItemLookUpThrottled   onChange={this.handleFormChange} label = {field.displayname}  height={this.props.height} />
                break;
            
            case "pickwindow":
                return <ItemPickWindow label={field.displayname}  onChange={this.handleFormChange}  field={field}  height={this.props.height}/>;
                break;
            
            case "readonly":
                return;// <ItemHidden />;
                break;

            case "itemid":
                return;// <ItemHidden />;
                break;    

            case "autonumber":
                return <ItemAutoNumber label={field.displayname}  height={this.props.height}/>
                break;    
            
            case "linkedfield":
            return;// <ItemHidden />
                break;

            case "checkbox":
                return <ItemCheckBox checkboxes={field.checkboxes}   label = {field.displayname}  height={this.props.height}  />
                break;  

            case "textarea":
                return <ItemTextArea  onChange={this.handleFormChange} rows={field.rows} label={field.displayname}  height={this.props.height}  />
                break; 
                
            
            case "text":
                return <ItemText   onChange={this.handleFormChange}label={field.displayname}   height={this.props.height}  />;
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
        console.log(" --- item form  render ----");
        console.log(formFieldJson)
        let formfields = this.props.formfields.map(this.jsonToFormFields)
        return (
            <div>
                 <Form> 
                 {formfields}  
                 </Form>    
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
      tabs : state.tabs,
      formfields: state.itemformfields.formfields,
      sections : state.itemformfields.sections
    };
};

const dispatchObj = {addTab, getItemFormFields, toggleSection}

export default  withRouter( connect(mapStateToProps, dispatchObj)(ItemForm) );
  
