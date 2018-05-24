import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';

import ReactTable from "react-table";
import "react-table/react-table.css";

import  DataGrid from "./DataGrid"

import {getItemList} from "../actions/items";
import {itemArrayListedSortedSelector, itemArrayListedSelector}  from "../selectors/itemlist";



class ItemDataGrid extends Component {
    
    constructor(props){
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.state = {
            cols: []
        }
    }
    componentWillMount(){
        let url      = this.props.match.url;
        let urlArr           = url.split("/");
        let {params} = this.props.match
        
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
        let {listedItems, listedJsonItems, items, display,  match} = this.props;        
        let cols =  listedItems.length > 1 && getCols(listedItems[0]) || [];
        let dt;
        console.log(listedItems[0])
        console.log("----- columns ------");
        console.log(cols)
        //console.log(display)
        if(listedItems.length > 1){
           dt =  <ReactTable
            data={listedItems}
            columns={cols}
            defaultPageSize={10}
            className="-striped -highlight"
            minRows={0}
            style={{
                height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
              }}
            getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    console.log("A Td Element was clicked!");
                    console.log("it produced this event:", e);
                    console.log("It was in this column:", column);
                    console.log("It was in this row:", rowInfo);
                    console.log("It was in this table instance:", instance);
                    let itemid = rowInfo.original.find(item => item.fieldname === "itemid");
                    console.log("---- item id -----")
                    console.log(itemid)
                    this.handleRowClick(itemid)
            
                    // IMPORTANT! React-Table uses onClick internally to trigger
                    // events like expanding SubComponents and pivots.
                    // By default a custom 'onClick' handler will override this functionality.
                    // If you want to fire the original onClick handler, call the
                    // 'handleOriginal' function.
                    if (handleOriginal) {
                      handleOriginal();
                    }
                  }
                };
              }}  
        />           
        }
        return (
            <div>
             
                {
                   dt
                }
                
            </div>
        );
    }
}


function getCols(listedItemsFirst) {

    let filterdCols = listedItemsFirst.filter(item => item.fieldname !== "itemid");
    var cols =  filterdCols.map( (li, idx) => {
        console.log("----- col -----");
        console.log(li)
        let colObj = {};
        colObj.Header = li.displayname;
        colObj.accessor = getDFunc(idx);
        colObj.id = li.fieldname;
        if(li.fieldname !== "itemid"){
            return colObj;
        }
       
    })

  
 
    return cols;
  }
  
  function getDFunc(idx){
    console.log("---- accesor -----");
    console.log(arguments)
    return d => d[idx].fieldvalue
  }


const mapStateToProps = state => {
    return {
      tabs : state.tabs,
      listedItems: itemArrayListedSortedSelector(state),
      listedJsonItems: itemArrayListedSelector(state),
      items: state.itemlist.items,
      display: state.itemlist.display
    };
};


const dispatchObj = {getItemList}

export default  withRouter( connect(mapStateToProps, dispatchObj)(ItemDataGrid) );