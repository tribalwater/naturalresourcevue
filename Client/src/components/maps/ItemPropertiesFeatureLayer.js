import React, { Component } from 'react';
import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import { basemapLayer, featureLayer } from 'esri-leaflet';
import axios from "axios"


class ItemPropertiesFeatureLayer extends MapLayer {
     
    constructor(){
        super();
        this.state= {
            data: {

            },
            featureLayer: null,
            goingTo: false,
            bounds: {}
        }
        this.addPClick = this.addPClick.bind(this);
        this.setMapBounds = this.setMapBounds.bind(this);
        this.help = this.help.bind(this)
    }
    setMapBounds(bounds){
        console.log(this.featureLayer)
        if(!this.goingTo){
            this.context.map.flyToBounds(this.state.bounds)
        }
        this.setState({goingTo: true});
      
    }
    help() {
            alert("help!!!!!!!")
    }
    addPClick(){
        let nav = document.getElementById("navp");
        nav.addEventListener("click", this.hello)
    }
	createLeafletElement(props) {
        console.log("----- create leflet element ---")
        const { fURL, tdURL, whereCond } = props;
        const pointStyle = this.props.pointStyle ||  {
            color: 'white',
            weight: 1,
            fillColor: 'darkorange',
            fillOpacity: 0.6
        };
        const defaultStyleFunc =  () => {
            return {
                color: 'white',
                weight: 1,
                fillColor: 'darkorange',
                fillOpacity: 0.6
            }
        };  
        const styleFunc = this.props.styleFunc || defaultStyleFunc;
        let fLayer = featureLayer({
            url: `${fURL}`,
            fields: ["*"],
            where: `${whereCond}`,
            pointToLayer:  (geojson, latlng) => {
                console.log("points to  layer ---")
               
                console.log(latlng)
             
                return L.circleMarker(latlng, pointStyle);
            },
            onEachFeature: (feature, layer) => {
                console.log("---- arguements ---")
                console.log(arguments)
                console.log('wtf as fuck')
                console.log(feature.geometry)
                console.log(layer)
                if(feature.geometry.type == "Point"){
                    console.log("poly ")
                    this.context.map.flyTo(layer._latlng);
                }else{
                    this.context.map.flyToBounds(layer._bounds)    
                }
                return "";
            },

            style: styleFunc || null    
        });
       
        
        fLayer.on("load", (e) => {
            console.log("---- f layer ----");
            console.log(e)
           this.props.onLoad(e)
         
        })
        

        
        return  fLayer.addTo(this.context.map)
    }
    
    render(){
        console.log("item map render")
    }

    componentDidUpdate(prevProps, prevState){

        if(prevState.bounds != this.state.bounds){
             setTimeout(() => {
             this.setMapBounds();   
             }, 50);
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.goingTo){
            return false 
        }
        return true;
    }
}


export { MapLayer, ItemPropertiesFeatureLayer};
