import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, withRouter } from 'react-router-dom';
import {Segment} from "semantic-ui-react";

import ItemDataGrid from "./ItemDataGrid";
import MainPageHeader  from "./MainPageHeader.1";
import ItemListButtons  from "./ItemListButtons";
import {ItemListMap} from "./maps";

import {getItemList} from "../actions/items";
import {itemArrayListedSortedSelector, itemArrayListedSelector, itemListDataGridCols}  from "../selectors/itemlist";


class ItemDataGridContainer extends Component {
    constructor(props){
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleFeautureLayerClick = this.handleFeautureLayerClick.bind(this);
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
    handleFeautureLayerClick(itemid){
        let {history, tabs} = this.props;
        let {params}  = this.props.match;
        let cameFromTab =  history.location.state && history.location.state.cameFromTab;
        let url      = this.props.match.url;
        if(cameFromTab){             
            history.push({ 
                pathname: `/tabs/${params.tabid}/item/properties/${params.itemtype}/${params.itemsubtype}/${itemid}`, 
                state : {cameFromTab: true, cameFromLocation : url, name : history.location.state.name} 
            });
        }else{
            history.push({ 
                pathname: `/tabs/0/item/properties/${params.itemtype}/${params.itemsubtype}/${itemid}`, 
                state : {cameFromTab: true, cameFromLocation : url, name: history.location.name} 
        });

        }
    }
    handleRowClick(rowInfo){
        let {history, tabs} = this.props;
        let {params}  = this.props.match
        let url      = this.props.match.url;
        let cameFromTab =  history.location.state && history.location.state.cameFromTab;
        let item = rowInfo.original.find(item => item.fieldname === "itemid");
        if(cameFromTab){             
            history.push({ 
                pathname: `/tabs/${params.tabid}/item/properties/${params.itemtype}/${params.itemsubtype}/${item.fieldvalue}`, 
                state : {cameFromTab: true, cameFromLocation : url, name : history.location.state.name} 
            });
        }else{
            history.push({ 
                pathname: `/tabs/0/item/properties/${params.itemtype}/${params.itemsubtype}/${item.fieldvalue}`, 
                state : {cameFromTab: true, cameFromLocation : url, name: history.location.name} 
        });

        }

      
    }
    render() {
                let {listedItems, listedJsonItems, items, display,  match, dataGridCols} = this.props;      
                let {params}  = this.props.match  
                let {itemtype, itemsubtype} = params;
                let dt = <div>...loading</div>;
                let h = this.props.height + "px";
               
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
                         buttonGroupTwo = {<ItemListButtons  itemtype={params.itemtype}  subtype={params.itemsubtype}  height={this.props.height} tabid={params.tabid}  history={this.props.history}  />  }
                        />
                        <Segment  className="page-container" style={{height: this.props.height}}>             
                            <Switch>
                                <Route exact path="/tabs/:tabid/item/datagrid/:itemtype/:itemsubtype" 
                                            render = { () =>  <FunctionalDataGrid   gridHeight = {h} listedItems = {listedItems} rowClick = {this.handleRowClick} cols = {dataGridCols} />  }   
                                />
                                <Route exact path="/tabs/:tabid/item/datagrid/:itemtype/:itemsubtype/map" 
                                            render = { () =>  <ItemListMap  itemtype = {itemtype} subtype = {itemsubtype} 
                                                                            height={this.props.height } tabid={params.tabid} 
                                                                            onFeatureCLick={this.handleFeautureLayerClick} />  }   
                                />                  
                            </Switch> 
                        </Segment>
                    </div>
                );
        }
      
    
}

const FunctionalDataGrid = ({listedItems, h, rowClick, cols}) => {
    if (listedItems.length > 1) {
        return <ItemDataGrid 
                    gridHeight = {h}
                    listedItems = {listedItems}
                    handleRowClick = {rowClick}
                    cols = {cols}
                />
    }else{
      return  <div>...loading</div>
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
