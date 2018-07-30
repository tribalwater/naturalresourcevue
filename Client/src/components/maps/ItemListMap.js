import React, { Component } from 'react';
import { connect } from "react-redux";

import ItemMap from "./ItemMap";
import {ItemListFeatureLayer} from "./ItemListFeatureLayer";
import {getItemMapMeta} from "../../actions/itemmaps";
import {searchItemType} from "../../actions/itemsearch";


import axios from "axios";
class ItemListMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            fUrl : null,
            bounds :null 
        }
        this.onPopUp = this.onPopUp.bind(this);
      
        this.resolveClick = this.resolveClick.bind(this);
    }
    
    resolveClick(itemid){
        console.log(" ---- helll you bastards ---", itemid);
        this.props.onFeatureCLick(itemid);
    }
    onPopUp(e, popup){
        let {itemtype, subtype, itemMap} = this.props;
        let gisField = itemMap.gisfield;
        let tdField  = itemMap.tdfield;
        let gisVal   = e.layer.feature.properties[gisField]
        
       
        let cols = [];
        let vals = [];
        let itemTable = `${itemtype}_properties`;
        cols.push(tdField);
        vals.push(gisVal);
        console.log("---- gisVal -----", gisVal)
        
        let resolvePopup = () => {

            return (successPromise) =>{
                console.log(" --- popup p  ---", popup, successPromise);   
                successPromise
                     .then( (res) => res[0])
                     .then(rec => {
                         console.log(" ----- rec ------", rec);
                         console.log(this.props)
                         let itemId   = rec.ITEMID || "";
                         popup.setContent(
                            `<div class="ui card">
                                <div class="content">
                                <div class="header">
                                    ${this.props.itemMap.mainheaderlabel} :  ${rec[this.props.itemMap.mainheader]}
                                </div>
                                <div class="meta">
                                    ${this.props.itemMap.secondheaderlabel}:  ${rec[this.props.itemMap.secondheader]}
                                </div>
                                <div class="description">
                                ${this.props.itemMap.thirdheaderlabel} :  ${rec[this.props.itemMap.thirdheader]}
                                </div>
                                </div>
                                <div class="extra content">
                                    <div class="ui basic teal  button" id = "navp">View Properties</div>
                                </div>
                            </div>`
                         ) 
                        return itemId;
                     })
                     .then(itemId => {
                        setTimeout(() => {
                       
                            let button = document.getElementById("navp").addEventListener("click", () => this.resolveClick(itemId));
                           
                            console.log(button, "--- button ---")
                         }, 10);
                         
                     })

                    
                    
            }
        }

        let rP = resolvePopup();
        this.props.searchItemType({
            itemtype: itemtype,
            itemsubtype: subtype,
            data: {
                    "cols"  : cols,
                    "likevals" :vals,
                    "itemtable" : itemTable ,
                    "subtype" : subtype
            },
            asyncCb : rP    
        })
        
    }
    componentDidMount(){
        console.log("------ item list map mounted -----", this.props);
        let {itemtype, subtype} = this.props;
        this.props.getItemMapMeta({itemtype: itemtype, itemsubtype : subtype});
    }
    componentWillReceiveProps(nextProps){
        console.log("---- item list map recieve props ----")
        if(nextProps.itemMap.url !== null && ( this.state.fUrl == null ||  nextProps.itemMap.url !== this.props.itemMap.url )   ){
            console.log(nextProps.itemMap.url)
            
            this.setState({fUrl : nextProps.itemMap.url}, () => console.log(this.state));
        }
    }
    render() {
        return (
            <div>
                { this.state.fUrl != null  ?  
                            <ItemMap height= {this.props.height} bounds={this.state.bounds}> 
                                <ItemListFeatureLayer
                                    fURL = {this.state.fUrl} 
                                    tdURL = "http://localhost:51086/api/item/part/welltag/properties/2"
                                    mainHeader = {this.props.mainheader}
                                    secondHeader = {this.props.secondheader}
                                    thirdHeader = {this.props.thirdheader}
                                    onLoad = { (e) => console.log("---- loaded ----",JSON.stringify(e.bounds))}
                                    onPopUp = {this.onPopUp} 
                                    styleFnc =   { () => {
                                        return {
                                            color: 'white',
                                            weight: 1,
                                            fillColor: 'darkorange',
                                            fillOpacity: 0.2
                                        }
                                       } 
                                   } 
                                />            
                           </ItemMap> :
                           <div> ...loading</div> 
                        }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
     itemMap :  state.itemmapmeta,
     searchResults: state.itemsearch
    };
};

const dispatchObj = {getItemMapMeta, searchItemType}

export default  connect(mapStateToProps, dispatchObj)(ItemListMap) ;
  
