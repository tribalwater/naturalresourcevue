import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import {Table}        from "semantic-ui-react";

import {getItemList} from "../actions/items";
import {addTab} from "../actions/tabs";
import {itemArrayListedSortedSelector}  from "../selectors/itemlist";

class ItemListTableContainer extends Component {

    constructor(props){
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
    }
    componentWillMount(){
        console.log(" ---- params ----")
        console.log(this.props)
        let {params} = this.props.match
        this.props.getItemList({itemtype: params.itemtype, itemsubtype: params.itemsubtype}); 

    }

    handleRowClick( item){
        let {history} = this.props;
        let {params} = this.props.match
        console.log(item)
       history.push(`/item/properties/${params.itemtype}/${params.itemsubtype}/${item.fieldvalue}`)
    }
    
    render() {
        // this logic needs to be moved into a selector function 
        let {listedItems, match} = this.props;
        let listedRows  = listedItems.map( (i, idx) =>  <Table.Row key={idx} onClick = {() => this.handleRowClick(i[0])}> 
                                                   { i.map( (field, idx) => {                 
                                                       let cell;
                                                     if(field.fieldtype == "itemid") {
                                                        cell =  <Table.Cell style={{display :"none"}}>  </Table.Cell> 
                                                        console.log(field.fieldtype == "itemid")
                                                     }else{
                                                       cell =  <Table.Cell > {field.fieldvalue}  </Table.Cell> 
                                                     }
                                                     return cell
                                                   })} 
                                         </Table.Row>);

        let hRow = this.props.listedItems[0] || [];
        hRow = hRow.filter(f => f.fieldtype !== "itemid") 
        let headerRow = hRow && hRow.map(i => <Table.HeaderCell > {i.displayname} </Table.HeaderCell>) || [];
        return (
            <div>
                I am an item table list
                <Table  sortable celled compact striped inverted>
                    <Table.Header>
                        <Table.Row>
                            {headerRow}
                        </Table.Row>     
                    </Table.Header>
                    <Table.Body>
                        {listedRows}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      tabs : state.tabs,
      listedItems: itemArrayListedSortedSelector(state),
    };
};

const dispatchObj = {addTab, getItemList}

export default  withRouter( connect(mapStateToProps, dispatchObj)(ItemListTableContainer) );