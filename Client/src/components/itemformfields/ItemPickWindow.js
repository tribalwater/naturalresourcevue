import React, { Component } from 'react';
import { Form, Input,  Modal, Button} from 'semantic-ui-react';
import { connect } from "react-redux";

import ItemDataGrid from "../ItemDataGrid";
import {getItemList} from "../../actions/items";
import {itemArrayListedSortedSelector, itemArrayListedSelector, itemListDataGridCols}  from "../../selectors/itemlist";


class ItemPickWindow extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentValue : "",
            isModalOpen: false
        }
        this.getItems = this.getItems.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this)
    }
   
    getItems(){
        console.log("--- get items --- ");
        let {field}  = this.props;
        let itemType = field.parenttable.split("_")[0]; 
        let subType  = field.parentsubtype;
        console.log("--- pick window did mount --- ")
        console.log("---- field ----");
        console.log(field);
        this.props.getItemList({itemtype: itemType, itemsubtype: subType}); 
        this.setState({isModalOpen : !this.state.isModalOpen})
        
    }
    handleRowClick(rowInfo){
        console.log("--- pick window item ----");
        console.log(item)
        let {field}  = this.props;

        //this.props.onItemSelect(item);
        console.log(" ---- row info ---- ");
        console.log(rowInfo);
        let item = rowInfo.original.find(item => item.fieldname === field.parentcolumn);
        console.log(" ---- item ----- ");
        console.log(item)
        this.setState({currentValue: item.fieldvalue, isModalOpen : false})
    }
    render() {
        let { label, onChang, field, listedItems, dataGridCols } = this.props;
        let selectedvalue = this.state.currentValue;
        let dt = <div>...loading</div>;
        let h = this.props.height + "px";
        let {isModalOpen} = this.state;
        return (
            <Form.Field>
                 <label >{label}</label>
                <Modal open = {isModalOpen}  trigger={<Button fluid onClick={this.getItems}>Select {label}</Button>} centered={true} size="fullscreen" style= {{ 'margin-top': '20px'}} className="form-modal" >
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                    { listedItems  && listedItems.length > 1 && 
                       <ItemDataGrid 
                            gridHeight = {h}
                            listedItems = {listedItems}
                            handleRowClick = {this.handleRowClick}
                            cols = {dataGridCols}
                        />
                    }
                    </Modal.Content>
                </Modal>
                <Input value={selectedvalue}  type="text" readonly></Input>    
            </Form.Field>
            
        );
    }
}

const mapStateToProps = state => {
    return {
      listedItems: itemArrayListedSortedSelector(state),
      dataGridCols : itemListDataGridCols(state),
    };
};

const dispatchObj = {getItemList};


export default connect(mapStateToProps, dispatchObj)(ItemPickWindow);