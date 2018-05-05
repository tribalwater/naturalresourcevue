import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class ItemPropertiesRow extends Component {
    render() {

        let {displayname, tooltip, fieldvalue, fieldtype} = this.props;
       
        return (
           <Table.Row title = { tooltip || "" } > 
            <ItemPropertiesLabelCell displayname = {displayname} />
            <ItemPropertiesValuelCell {...this.props}/>
           </Table.Row>
        );
    }
}

export default ItemPropertiesRow;


class ItemPropertiesValuelCell extends Component {
   constructor(){
     super();
     this.handleLinkType = this.handleLinkType.bind(this);
   }    
   handleLinkType(linkTo, linkToType, fieldvalue){
    let linkNavPath;
    switch (linkToType) {
      case "tabNavigate":
        linkNavPath = `/tabs/currenttab/item/properites/${linkTo.link}`
        break;
      
      case "tabAddNew":
        linkNavPath = `/tabs/newtab/item/properites/${linkTo.link}`
      
      case "propPopup":
        linkNavPath = `/tabs/popup/item/properites/${linkTo.link}`  
        break;
      default:
        break;
    }
    //<Link to={{ pathname: linkNavPath}}>{fieldvalue}</Link>
    return <a href ={linkNavPath}>{fieldvalue}</a>
   }
   
    render(){
        let { fieldvalue, fieldtype, linkToType, linkTo, isLinkType } = this.props;
        let tableCellValue;
        if(isLinkType){
            fieldvalue = this.handleLinkType(linkTo, linkToType, fieldvalue);
        }else{
          switch(fieldtype) {
            case "formattedtext":
                 fieldvalue = <span>{fieldvalue}</span>
                 break;    
            default:
                 fieldvalue =fieldvalue
        }
        }
     
        return (  <Table.Cell className="prop-table-value-cell" width={13}>{fieldvalue}</Table.Cell>   ); 
    }
}

const ItemPropertiesLabelCell = ({displayname}) => (
  <Table.Cell className="prop-table-label-cell" width={3}>{displayname}</Table.Cell> 
);

