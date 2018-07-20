import React, { Component } from 'react';
import { connect } from "react-redux";

import ItemMap from "./ItemMap";
import {ItemListFeatureLayer} from "./ItemListFeatureLayer";
import {getItemMapMeta} from "../../actions/itemmaps";

import axios from "axios";
class ItemListMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            fUrl : null,
            bounds :null 
        }
        this.onPopUp = this.onPopUp.bind(this);
    }
    
    onPopUp(){
        return axios.get("http://localhost:51086/api/item/part/welltag/properties/243606")
        .then( (res) => res.data.records[0])
        .then(rec => {
            return (
            `<div class="ui card">
                <div class="content">
                <div class="header">
                    Well Tag NO :  ${rec.partno.fieldvalue}
                </div>
                <div class="meta">
                    Orginal Owner:  ${rec.cbrn.fieldvalue}
                </div>
                <div class="description">
                    Well Uses :  ${rec.flexfield7.fieldvalue}
                </div>
                </div>
                <div class="extra content">
                    <div class="ui basic teal  button" id = "navp">View Properties</div>
                </div>
            </div>`
            );
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
     itemMap :  state.itemmapmeta
    };
};

const dispatchObj = {getItemMapMeta}

export default  connect(mapStateToProps, dispatchObj)(ItemListMap) ;
  
