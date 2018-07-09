import React from 'react'
import { Table, Button, Icon, Header } from 'semantic-ui-react'
import ItemPropertiesRow from './ItemPropertiesRow'
import ItemPropertiesLabelRow from './ItemPropertiesLabelRow';

const  ItemPropertiesTable = ({fields, sections, toggleSection}) =>  { 
  let table;
  if(fields.length > 0 && sections){
    table = <div>
    <Header  className="prop-table-label-row" as="h1" textAlign="left"> Item Properties </Header>   
      <Table celled striped >
        <Table.Body>
          {  
            fields.map( field => {
             if(field){
               if(field.fieldtype == 'label' ){
                 let { isVisible } = sections[field.id];
                  return <ItemPropertiesLabelRow field={field} isVisible = {isVisible} toggleSection={toggleSection} />
                }else {
                   return <ItemPropertiesRow   key={field.fieldname} {...field} />           
                }  
              }
                           
             })
          }
         </Table.Body>
      </Table>  
    </div>  
  }else{
    table= <div> ... loading</div>
  } 

 return table
};
  
  

export default ItemPropertiesTable;