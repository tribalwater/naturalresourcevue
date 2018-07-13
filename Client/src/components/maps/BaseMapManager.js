import React, { Component } from 'react';
import { LayersControl, Map as LeafletMap, TileLayer } from "react-leaflet";

const { BaseLayer, Overlay } = LayersControl;  
class BaseMapManager extends Component {
    render() {
        return (
            <LayersControl position="topright">
                <BaseLayer checked name="ESRI Topo">
                    <TileLayer
                        attribution="&Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                    />
                </BaseLayer>
                <BaseLayer checked name="ESRI Street">  
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
                        url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
                    />
                </BaseLayer>
                <BaseLayer checked name="ESRI Imagery">  
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    />
                </BaseLayer>
             </LayersControl>   
        );
    }
}

export default BaseMapManager;