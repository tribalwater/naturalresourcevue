import React, { Component } from 'react';
import { Map as LeafletMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";

import BaseMapManager from "./BaseMapManager";
import {ItemListFeatureLayer} from "./ItemListFeatureLayer";
import {ItemPropertiesFeatureLayer} from "./ItemPropertiesFeatureLayer";


const ItemMapTest = ({height}) => {
  return   <LeafletMap center={ [43.6, -112.4383]} zoom={9} style = {{height : height}}>  
                <BaseMapManager></BaseMapManager>   
                <ItemListFeatureLayer
                      fURL = "http://waterweb.sbtribes.com/arcgis/rest/services/Allotments/FeatureServer/0" 
                      tdURL = "http://localhost:51086/api/item/part/welltag/properties/2"
                      mainHeader = "partno"
                      secondHeader = "status"
                      thirdHeader = "flexfield35"
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
               </LeafletMap>
}

export { ItemListFeatureLayer,  ItemPropertiesFeatureLayer, BaseMapManager, ItemMapTest };