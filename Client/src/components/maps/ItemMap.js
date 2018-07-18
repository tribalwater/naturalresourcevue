import React, { Component } from 'react';
import { Map as LeafletMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";

import BaseMapManager from "./BaseMapManager";
import {ItemListFeatureLayer} from "./ItemListFeatureLayer";
import {ItemPropertiesFeatureLayer} from "./ItemPropertiesFeatureLayer";


class ItemMap extends Component {
    render() {
        let height = "500px";
        console.log("item map render")
        return (
            <LeafletMap center={  [43.6, -112.4383]} zoom={6} style = {{height : this.props.height}} >  
                <BaseMapManager></BaseMapManager>   
                {this.props.children}
           </LeafletMap>
        );
    }
}

export default ItemMap;