import React, { Component } from 'react';
import { connect } from "react-redux";

import {ItemPropertiesFeatureLayer} from "./ItemPropertiesFeatureLayer";
import ItemMap from "./ItemMap";
import {getItemMapMeta} from "../../actions/itemmaps";


class ItemPropertiesMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            fUrl : null,
            bounds :null 
        }
    }

    componentDidMount(){
        let {itemtype, subtype} = this.props;
        this.props.getItemMapMeta({itemtype: itemtype, itemsubtype : subtype});
    }
    componentWillReceiveProps(nextProps){
        console.log("--- item properties map receiving props ----");
        console.log(nextProps)
        if(nextProps.itemMap.url !== null && ( this.state.fUrl == null ||  nextProps.itemMap.url !== this.props.itemMap.url )   ){
            console.log(nextProps.itemMap.url)
            
            this.setState({fUrl : nextProps.itemMap.url}, () => console.log(this.state));
        }
    }
    render() {

        let theField = this.props.itemfields.filter(f => f.fieldname == this.props.itemMap.tdfield);
        console.log("--- the field ---- ", theField)
        return (
            <div>
                    { this.state.fUrl != null && theField.length  > 0 ?  
                            <ItemMap height= {this.props.height} bounds={this.state.bounds}> 
                                <ItemPropertiesFeatureLayer
                                    fURL = {this.state.fUrl} 
                                    tdURL = "http://localhost:51086/api/item/part/welltag/properties/2"
                                    mainHeader = "partno"
                                    secondHeader = "status"
                                    thirdHeader = "flexfield35"
                                    onLoad = { (e) => console.log("---- loaded ----",JSON.stringify(e.bounds))}
                                    whereCond = {   `${this.props.itemMap.gisfield}='${theField[0].fieldvalue}'` } 
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
     itemfields : state.itemproperties.fields
    };
};

const dispatchObj = {getItemMapMeta}

export default  connect(mapStateToProps, dispatchObj)(ItemPropertiesMap) ;
  