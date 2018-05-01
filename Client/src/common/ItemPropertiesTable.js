import React from 'react'
import { Table } from 'semantic-ui-react'

const ItemPropertiesTable = ({fields}) => {
    fields = fields ? fields : [];
    return (
        <Table celled striped >
            <Table.Body>
            {  

                fields.map( field => {
                    if(field.fieldtype == 'label' ){
                        return <Table.Row style={{height: 700, background: "white"}}> <button> {field.displayname} </button> </Table.Row>
                    }else {
                    return <Table.Row style={{height: 50}}> 
                                <Table.Cell style={{background: "grey"}} width={3}>{field.displayname}</Table.Cell>
                                <Table.Cell width={13}>{field.fieldvalue}</Table.Cell>     
                           </Table.Row>
                    }        
                })
            }
            </Table.Body>
        </Table>    
    );
}

export default ItemPropertiesTable;