import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import {Table}        from "semantic-ui-react";

import {getItemList}        from "../actions/items";
import {addTab}             from "../actions/tabs";

class ItemListTableContainer extends Component {
    componentWillMount(){
        console.log(" ---- params ----")
        console.log(this.props.match.params)
        let {params} = this.props.match
        this.props.getItemList({itemtype: params.itemtype, itemsubtype: params.itemsubtype});
    }
    
    render() {
        // this logic needs to be moved into a selector function 
        let listedItems    = this.props.items.reduce( (acc, item) => {
           let  fields = Object.values(item);
           let  filterdFields  = fields.filter( i => i.islisted  && i.islisted == "Y");
           filterdFields.sort( (a, b) => a.sortorder - b.sortorder)
           acc.push(filterdFields);
           return acc;
        }, [] ) ;
        let listedRows  = listedItems.map( (i, idx) =>  <Table.Row key={idx}> 
                                                   { i.map( (i, idx) =>  <Table.Cell > {i.fieldvalue} </Table.Cell> ) } 
                                         </Table.Row>);

        console.log("--- item list table render  ------")
        console.log(listedItems)
        let hRow = listedItems[0]
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
      items: state.itemlist.items
    };
};

const dispatchObj = {addTab, getItemList}

export default  withRouter( connect(mapStateToProps, dispatchObj)(ItemListTableContainer) );