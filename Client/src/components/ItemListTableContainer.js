import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import {Table}        from "semantic-ui-react";
import {Segment} from "semantic-ui-react";

import {getItemList} from "../actions/items";
import {addTab} from "../actions/tabs";
import {itemArrayListedSortedSelector, itemArrayListedSelector}  from "../selectors/itemlist";
import ItemFormModal            from "./ItemFormModel";
import MainPageHeader           from "./MainPageHeader.1";
import ItemListButtons          from "./ItemListButtons";

class ItemListTableContainer extends Component {

    constructor(props){
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
    }
    componentWillMount(){
        let url      = this.props.match.url;
        let urlArr           = url.split("/");
        let {params} = this.props.match;
        this.props.getItemList({itemtype: params.itemtype, itemsubtype: params.itemsubtype}); 
    }

    componentWillReceiveProps(nextProps){
        let {params} = this.props.match;
        let newParams = nextProps.match.params;
        if(params.itemtype !== newParams.itemtype || params.itemsubtype !== newParams.itemsubtype){
            this.props.getItemList({itemtype: newParams.itemtype, itemsubtype: newParams.itemsubtype}); 
        }   
    }
    
    handleRowClick( item){
        let {history, tabs} = this.props;
        let {params}  = this.props.match
        let url      = this.props.match.url;
        let cameFromTab =  history.location.state && history.location.state.cameFromTab;
        
        if(cameFromTab){             
            history.push({ 
                pathname: `/tabs/${params.tabid}/item/properties/${params.itemtype}/${params.itemsubtype}/${item.fieldvalue}`, 
                state : {cameFromTab: true, cameFromLocation : url, name : history.location.state.name} 
            });
        }else{
            history.push({ 
                pathname: `/item/properties/${params.itemtype}/${params.itemsubtype}/${item.fieldvalue}`, 
                state : {cameFromTab: true, cameFromLocation : url, name: history.location.name} 
            });

        } 
    }
    
    render() {

        let {listedItems, listedJsonItems, items,  match} = this.props;
        let {params} = this.props.match;
        let listedRows  = listedItems.map( (i, idx) =>  <Table.Row key={idx} onClick = {() => this.handleRowClick(i[0])}> 
                                                   { i.map( (field, idx) => {                 
                                                       let cell;
                                                     if(field.fieldtype == "itemid") {
                                                        cell =  <Table.Cell key = {idx} style={{display :"none"}}>  </Table.Cell> 
                                                     }else{
                                                       cell =  <Table.Cell  key = {idx}> {field.fieldvalue}  </Table.Cell> 
                                                     }
                                                     return cell
                                                   })} 
                                         </Table.Row>);

        let hRow = this.props.listedItems[0] || [];
        hRow = hRow.filter(f => f.fieldtype !== "itemid") 
        let headerRow = hRow && hRow.map( (i, idx) => <Table.HeaderCell  key = {idx}> {i.displayname} </Table.HeaderCell>) || [];
        return (
            <div>

             <MainPageHeader
              buttonGroupTwo = { <ItemListButtons itemtype={params.itemtype} subtype={params.itemsubtype}  /> }
             />
            <Segment  className="page-container" style={{height: this.props.height}}>  
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
            </Segment>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      tabs : state.tabs,
      listedItems: itemArrayListedSortedSelector(state),
      listedJsonItems: itemArrayListedSelector(state),
      items: state.itemlist.items
    };
};

const dispatchObj = {addTab, getItemList}

export default  withRouter( connect(mapStateToProps, dispatchObj)(ItemListTableContainer) );