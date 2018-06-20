import React, { Component } from 'react';
import { Button, Header, Image, Modal, Form, Input, TextArea, Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


let formatedGroupFeaturesSel =getFs().map(s => { return  { text: s["optionvalue"], value : s["optionvalue"] } });

let forMatedAqfTypesSel = getAqfTypes().map(s => { return  { text: s["optionvalue"], value : s["optionvalue"] } });

let wellTagText = getWellTag();

const TribalDate = ({value, onClick}) => (
  <div onClick = {onClick}>
      <Input value ={value}  >
      </Input>
      
  </div>
);

class ExampleCustomInput extends Component {

    render () {
        let {onClick, value} = this.props;
      return (
        <div onClick = {onClick}>
           <Input placeholder='Search...'  value={value} icon="calendar alternate outline"/>
         
            
        </div>
      )
    }
  }

class ItemFormModel extends Component {
    constructor(props){
        super(props);
        this.state = {isOpen: false,  startDate: moment()};
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        setTimeout(() => {
           this.setState({isOpen: true})
        }, 10500);
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }
    render() {
        return (
            <Modal open={this.state.isOpen}  centered={true} size="fullscreen" style= {{ 'margin-top': '20px', 'color': "green"}} className="fuck" >
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                <Form>
                    <Form.Group widths='equal'>
                    <Form.Field
                        id='form-input-control-first-name'
                        control={Input}
                        label='First name'
                        placeholder='First name'
                    />
                    <DatePicker
                        customInput={<ExampleCustomInput />}
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        withPortal
                   />
                   
                     </Form.Group>
                    {/*
                    <Form.Field
                    id='form-textarea-control-opinion'
                    control={TextArea}
                    label='Opinion'
                    placeholder='Opinion'
                    /> */}
                  
                     <Form.Field>
                        <label>Aquifer Types</label>
                        <Dropdown
                            value={this.state.market} 
                            options={forMatedAqfTypesSel} 
                            name={"Market"} 
                            onChange={this.handleFormChange} 
                            fluid selection 
                    />
                     </Form.Field>
                     <Form.Field>
                         <label >fhip district</label>
                         <Input type="number"></Input>
                     </Form.Field>
                     <Form.Field>
                        <label >nbr of pods inline query type is hidden on isnsert </label>
                        <TextArea placeholder='Tell us more' />
                     </Form.Field>
                     <Form.Field>
                        <label >1/4, 1/4 Description</label>
                        <TextArea placeholder='Tell us more' />
                     </Form.Field>
                     <Form.Field>
                        <label >Owner (Organization) lookup basically a type ahead fields needsto be implented</label>
                        <TextArea placeholder='Tell us more' />
                     </Form.Field>   
                     <Form.Field>
                        <label>Group Features</label>
                        <Dropdown
                            value={this.state.market} 
                            options={formatedGroupFeaturesSel} 
                            name={"Market"} 
                            onChange={this.handleFormChange} 
                            fluid selection 
                            multiple
                    />
                     </Form.Field>
                </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative>No</Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Yes' />
                </Modal.Actions>
            </Modal>
        );
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

