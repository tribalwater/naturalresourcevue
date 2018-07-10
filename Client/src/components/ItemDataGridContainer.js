import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import {Segment} from "semantic-ui-react";

import ItemDataGrid from "./ItemDataGrid";
import  MainPageHeader  from "./MainPageHeader.1";
import  ItemListButtons  from "./ItemListButtons";

import {getItemList} from "../actions/items";
import {itemArrayListedSortedSelector, itemArrayListedSelector, itemListDataGridCols}  from "../selectors/itemlist";


class ItemDataGridContainer extends Component {
    constructor(props){
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.state = {
            cols: []
        }
    }
    componentWillMount(){
        let url      = this.props.match.url;
        let urlArr   = url.split("/");
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
                let {listedItems, listedJsonItems, items, display,  match, dataGridCols} = this.props;        
                let dt = <div>...loading</div>;
                let h = this.props.height + "px";
                let {params} = this.props.match;
              
                if(listedItems.length > 1){
                    dt = <ItemDataGrid 
                    gridHeight = {h}
                    listedItems = {listedItems}
                    handleRowClick = {this.handleRowClick}
                    cols = {dataGridCols}
                  />
                }
                return (
                    <div>       
                        <MainPageHeader
                            buttonGroupTwo = { <ItemListButtons itemtype={params.itemtype} subtype={params.itemsubtype} height={this.props.height}  /> }
                        />
                        <Segment  className="page-container" style={{height: this.props.height}}>  
                        {
                            dt
                            }
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
      dataGridCols : itemListDataGridCols(state),
      items: state.itemlist.items,
      display: state.itemlist.display
    };
};


const dispatchObj = {getItemList}
export default  withRouter( connect(mapStateToProps, dispatchObj)(ItemDataGridContainer) );
