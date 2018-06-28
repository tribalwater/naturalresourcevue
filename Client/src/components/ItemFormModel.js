import React, { Component } from 'react';
import { Button, Header, Image, Modal, Form, Input, TextArea, Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


import axios from 'axios';


import ItemLookUpThrottled from './itemformfields/ItemLookUpThrottled'
import ItemForm from './ItemForm';

let formatedGroupFeaturesSel =getFs().map(s => { return  { text: s["optionvalue"], value : s["optionvalue"] } });

let forMatedAqfTypesSel = getAqfTypes().map(s => { return  { text: s["optionvalue"], value : s["optionvalue"] } });

let wellTagText = getWellTag();

const TribalDate = ({value, onClick}) => (
  <div onClick = {onClick}>
      <Input value ={value}  >
      </Input>
      
  </div>
);


class ItemFormModel extends Component {
    constructor(props){
        super(props);
        this.state = {isOpen: false,  startDate: moment(), formFields : null};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        setTimeout(() => {
           this.setState({isOpen: true})
           console.log(this.state)
        }, 3500);
    
     
        let{ itemtype, subtype, itemid} = this.props;
        console.log("--- goo go go power ranger ----", itemtype, subtype)
        
        axios.get(`http://localhost:51086/api/item/${itemtype}/${subtype}/formfields`)
        .then( res => this.setState({formFields: res.data}))
        .then(console.log("done"))
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }
    render() {
        let formFields;
         if(this.state.formFields != null){
            return (
                <Modal
                       closeIcon centered={true} 
                       size="fullscreen"
                       style= {{ 'margin-top': '20px', 'color': "green"}} 
                       className="fuck" 
                       closeOnDimmerClick ={true}
                       closeOnDocumentClick = {true}
                       defaultOpen= {true}
                       onClose={this.props.onClose}
                 >
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                 
                   <ItemForm formFieldJson = {this.state.formFields}></ItemForm>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative>Cancel</Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Submit' />
                    </Modal.Actions>
                </Modal>
            );
         }else{
             return (<div></div>);
         }
        
    }
}

export default ItemFormModel;

function getWellTag () {
    return {
        "onchange": null,
        "parentfieldname": null,
        "required": "N",
        "sortorder": 10,
        "onkeydown": null,
        "sortposition": 0,
        "onfocus": null,
        "itemvaluegroup": null,
        "parenttable": null,
        "maxlength": 1000,
        "fieldtype": "text",
        "defaultvalue": "",
        "fieldlength": 1000,
        "onblur": null,
        "parentcolumn": null,
        "multirow": null,
        "displayname": "Well Tag No.",
        "parentsubtype": null,
        "fieldname": "partno",
        "valuegroup": null
        }
}

function getAqfTypes () {
    return [
        {
        "isSelected": false,
        "optionvalue": "Allurial"
        },
        {
        "isSelected": false,
        "optionvalue": "Allurial and vocanic"
        },
        {
        "isSelected": false,
        "optionvalue": "Alluvial"
        },
        {
        "isSelected": false,
        "optionvalue": "Alluvial and volcanic"
        },
        {
        "isSelected": false,
        "optionvalue": "Bedrock"
        },
        {
        "isSelected": false,
        "optionvalue": "Volcanic"
        }
        ]
}

function getFs() {
    return  [
        {
        "isSelected": false,
        "optionvalue": "As-Built"
        },
        {
        "isSelected": false,
        "optionvalue": "Bid Tabulation"
        },
        {
        "isSelected": false,
        "optionvalue": "Bids"
        },
        {
        "isSelected": false,
        "optionvalue": "Bore Hole Log Plot"
        },
        {
        "isSelected": false,
        "optionvalue": "Business License"
        },
        {
        "isSelected": false,
        "optionvalue": "Certification of Liability"
        },
        {
        "isSelected": false,
        "optionvalue": "Check Stubs"
        },
        {
        "isSelected": false,
        "optionvalue": "Contract"
        },
        {
        "isSelected": false,
        "optionvalue": "Correspondence"
        },
        {
        "isSelected": false,
        "optionvalue": "DSIP SHEET"
        },
        {
        "isSelected": false,
        "optionvalue": "Employee Action Notice"
        },
        {
        "isSelected": false,
        "optionvalue": "EPLS"
        },
        {
        "isSelected": false,
        "optionvalue": "INVOICE"
        },
        {
        "isSelected": false,
        "optionvalue": "Justification"
        },
        {
        "isSelected": false,
        "optionvalue": "Laboratory Results"
        },
        {
        "isSelected": false,
        "optionvalue": "Map"
        },
        {
        "isSelected": false,
        "optionvalue": "Meeting Minutes"
        },
        {
        "isSelected": false,
        "optionvalue": "NOTES"
        },
        {
        "isSelected": false,
        "optionvalue": "P-Card"
        },
        {
        "isSelected": false,
        "optionvalue": "Pump Test"
        },
        {
        "isSelected": false,
        "optionvalue": "Request for Bid"
        },
        {
        "isSelected": false,
        "optionvalue": "Travel Authorization"
        },
        {
        "isSelected": false,
        "optionvalue": "Travel Expense Report"
        },
        {
        "isSelected": false,
        "optionvalue": "Tresspass Permit"
        },
        {
        "isSelected": false,
        "optionvalue": "TWRD Inventory Sheet"
        },
        {
        "isSelected": false,
        "optionvalue": "Unit Cost Proposal"
        },
        {
        "isSelected": false,
        "optionvalue": "USGS SHEET"
        },
        {
        "isSelected": false,
        "optionvalue": "Vehicle Maintenance Form"
        },
        {
        "isSelected": false,
        "optionvalue": "W-9"
        },
        {
        "isSelected": false,
        "optionvalue": "Water Quality Test"
        },
        {
        "isSelected": false,
        "optionvalue": "Water Quality Tests"
        },
        {
        "isSelected": false,
        "optionvalue": "Well drilling permit"
        },
        {
        "isSelected": false,
        "optionvalue": "Well Log"
        },
        {
        "isSelected": false,
        "optionvalue": "Well photo"
        }
        ];
}

