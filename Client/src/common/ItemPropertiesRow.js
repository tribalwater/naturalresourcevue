import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class ItemPropertiesRow extends Component {
    render() {

        let {displayname, tooltip, fieldvalue, fieldtype} = this.props;


       
        return (
           <Table.Row title = { tooltip || "" } > 
            <ItemPropertiesLabelCell displayname = {displayname} />
            <Table.Cell width={13}>{field.fieldvalue}</Table.Cell>     
           </Table.Row>
        );
    }
}

export default ItemPropertiesRow;


class ItemPropertiesLabelCell extends Component {
    
    // handleLinkFields(fieldtype, linkType, parentTable){
    //     let tableCellValue;
    //     switch(linkType) {
    //         case "email":
    //            fieldvalue ="email link Field Type not yet implemented"
    //             break;
    //         case "drilldown":
    //             fieldvalue ="Approval Field Type note yet implemented"
    //             break;
    //         case "url":
    //             fieldvalue ="label Field Type not yet implemented"
    //              break;
    //          case "approval":
    //              fieldvalue ="Approval Field Type note yet implemented"
    //              break;    
    //         default:
    //             code block
    //     }

    //     return tableCellValue;
    // }
    render(){
        let { fieldvalue, fieldtype, linktype, linklocation } = this.props;

        let tableCellValue;
        switch(fieldtype) {
            case "label":
               fieldvalue ="label Field Type not yet implemented"
                break;
            case "approval":
                fieldvalue ="Approval Field Type note yet implemented"
                break;
            case "approval":
                fieldvalue ="Grid Field Type note yet implemented"
                break;    
            case "link":
                let linkNavPath = `/sdfsd/sdf/${linklocation}`;
                fieldvalue =<Link to={{ pathname: linkNavPath}}>Player #7</Link>
                break;
             case "formattedtext":
                 fieldvalue = <span>{fieldvalue}</span>
                 break;    
            default:
                 fieldvalue ={fieldvalue}
        }
        return (  <Table.Cell width={13}>{field.fieldvalue}</Table.Cell>   ); 
    }
}

const ItemPropertiesLabelCell = (displayname) => (
  <Table.Cell  width={3}>{displayname}</Table.Cell> 
);



let secitons = [

    {
        startIndex: 3,
        endIndex: 5
    },
]

import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [
        {
          id: 1,
          date: "2014-04-18",
          total: 121.0,
          status: "Shipped",
          name: "A",
          points: 5,
          percent: 50
        },
        {
          id: 2,
          date: "2014-04-21",
          total: 121.0,
          status: "Not Shipped",
          name: "B",
          points: 10,
          percent: 60
        },
        {
          id: 3,
          date: "2014-08-09",
          total: 121.0,
          status: "Not Shipped",
          name: "C",
          points: 15,
          percent: 70
        },
        {
          id: 4,
          date: "2014-04-24",
          total: 121.0,
          status: "Shipped",
          name: "D",
          points: 20,
          percent: 80
        },
        {
          id: 5,
          date: "2014-04-26",
          total: 121.0,
          status: "Shipped",
          name: "E",
          points: 25,
          percent: 90
        }
      ],
      expandedRows: [],
      isVisible: false,
      sections: {
        section1: {
          startIndex: 2,
          endIndex: 5
        }
      }
    };

    this.toggleSection = this.toggleSection.bind(this);
  }

  componentWillMount() {
    console.log("--- will mount ----");
    let dataCopy = this.state.data.slice();
    // label index + 1
    let newExpanded = dataCopy.splice(2, 3);
    this.setState({ expandedRows: dataCopy });
  }

  toggleSection(sectionId) {
    let { startIndex, endIndex, isVisible } =
      this.state.sections[sectionId];
    //  alert(this.state.data[3].name)
    let newExpanded = this.state.expandedRows.slice();
    if (isVisible) {
      newExpanded.splice(startIndex);
    } else {
      let toAdd = this.state.data.slice(startIndex, endIndex);
      newExpanded.splice(startIndex, 0, ...toAdd);
    }
    let sectionsCopy = Object.assign({}, this.state.sections);
    sectionsCopy[sectionId].isVisible = !sectionsCopy[sectionId].isVisible;
    console.log("--- section copy ----");
    console.log(sectionsCopy);
    this.setState({
      expandedRows: newExpanded,
      sections: sectionsCopy
    });

    //console.log(expandCopy);
  }
  render() {
    console.log("rendeer");
    let rows = this.state.expandedRows.map(d => <tr> {d.name} </tr>);
    console.log(rows);
    return (
      <table>
        <button
          onClick={() => this.toggleSection("section1")}>
          toggle
        </button>
        <tr> lol </tr>
        <tr visibility="hidden"> lol </tr>
        {rows}
      </table>
    );
  }

}


render(<ParentComponent />, document.getElementById("root"));
