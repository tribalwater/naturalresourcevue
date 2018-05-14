import React from 'react'
import { Table, Button, Icon, Header } from 'semantic-ui-react'
import ItemPropertiesRow from './ItemPropertiesRow'

const  ItemPropertiesTable = ({fields, sections, toggleSection}) =>   {
    
      return (
         <div>
        <Header  className="prop-table-label-row" as="h1" textAlign="left"> Item Properties </Header>   
        <Table celled striped >
            <Table.Body>
            {  
               fields.map( field => {
                    if(field){
                        if(field.fieldtype == 'label' ){
                            let { startIndex, endIndex, isVisible } = sections[field.id];
                            return <Table.Row  key={field.fieldname}> 
                                        <Table.Cell width={3} className="prop-table-label-row"  > 
                                            <Button primary onClick={() => toggleSection(field.id)} key={field.fieldname} fluid size="tiny">
                                            <Icon name= {isVisible ? 'chevron down': 'chevron right' } />
                                            </Button> 
                                            
                                        </Table.Cell>
                                        <Table.Cell width={13}  className="prop-table-label-row">
                                             <Header  className="prop-table-label-row" as="h3" textAlign="center">{field.displayname}</Header> 
                                     </Table.Cell>                           
                                  </Table.Row>
                        }else {
                            return <ItemPropertiesRow   key={field.fieldname} {...field} />
                      
                        }  
                    }
                          
                })
            }
            </Table.Body>
         </Table>  
         </div>  
      );
  }
  

export default ItemPropertiesTable;