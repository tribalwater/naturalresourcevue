import React, { Component } from 'react';
import { featureLayer } from 'esri-leaflet';
import { MapLayer } from 'react-leaflet';
import L from 'leaflet';


class ItemListFeatureLayer extends MapLayer {
    
    constructor(props){
        super(props);
        this.handleLayerClick = this.handleLayerClick.bind(this);
    }
    
    getPopUp(e){
        let popUpPromise =  this.props.onPopUp(e, this.state.featureLayer.getPopup());
        console.log(this.state.featureLayer.getPopup())
        //popUpPromise.then( (popup) =>  this.state.featureLayer.getPopup().setContent(popup) ) ;
    }


    handleLayerClick(e){
        this.getPopUp(e);
    }
    createLeafletElement(props) {
        const { fURL, tdURL, whereCond, styleFnc } = props;
        let fLayer = featureLayer({
            url: `${fURL}`,
            fields: ["*"],
            pointToLayer: function (geojson, latlng) {
                return L.circleMarker(latlng, {
                    color: 'white',
                    weight: 1,
                    fillColor: 'darkorange',
                    fillOpacity: 0.6
                  });
            },
            style: styleFnc || null
        }); 
        fLayer.bindPopup(() => "...loading")
        fLayer.on("click", (e) => this.handleLayerClick(e));
        fLayer.once("load", (evt) =>{
            // create a new empty Leaflet bounds object
            var bounds = L.latLngBounds([]);
            // loop through the features returned by the server
            fLayer.eachFeature(function(layer) {
            // get the bounds of an individual feature
                console.log("--- layer ---", layer)
                var layerBounds = layer._bounds || layer._latlng;
                // extend the bounds of the collection to fit the bounds of the new feature
                bounds.extend(layerBounds);
                });

            // once we've looped through all the features, zoom the map to the extent of the collection
            this.context.map.fitBounds(bounds);
        });    
        this.setState({featureLayer : fLayer});
        return  fLayer.addTo(this.context.map)
    }
  
}

export { MapLayer, ItemListFeatureLayer};