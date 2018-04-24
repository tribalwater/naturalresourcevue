import React from 'react'
import { Table } from 'semantic-ui-react'

const ItemPropertiesTable = ({fields}) => {
    fields = fields ? fields : [];
    return (
        <Table celled striped>
            <Table.Body>
            {  

                fields.map( field => {
                    return <Table.Row> 
                                <Table.Cell >{field.displayname}</Table.Cell>
                                <Table.Cell>{field.fieldvalue}</Table.Cell>     
                           </Table.Row>
                })
            }
            </Table.Body>
        </Table>    
    );
}

export default ItemPropertiesTable;