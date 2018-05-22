import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';

import ReactTable from "react-table";
import "react-table/react-table.css";


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
        if(history.location.state.cameFromTab){             
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
        // console.log("----- listed items -----");
        // console.log(listedItems)
        // console.log("----- listed json items -----");
        // console.log(listedJsonItems)
        console.log("----- display items -----");
        
        let cols =  listedItems.length > 1 && getCols(listedItems[0]) || [];
        let dt;
       console.log(listedItems[0])
        //console.log(display)
        if(listedItems.length > 1){
           dt =  <ReactTable
            data={listedItems}
            columns={cols}
            defaultPageSize={10}
            className="-striped -highlight"
        />           
        }
        return (
            <div>
                data grid 
                {
                   dt
                }
                
            </div>
        );
    }
}


function getCols(listedItemsFirst) {

    var cols = listedItemsFirst.map( (li, idx) => {
        let colObj = {};
        colObj.Header = li.displayname;
        colObj.accessor = getDFunc(idx);
        colObj.id = li.fieldname;
        return colObj;
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