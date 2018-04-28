import React from 'react'
import { Table } from 'semantic-ui-react'

const ItemPropertiesTable = ({fields}) => {
    fields = fields ? fields : [];
    return (
        <Table celled striped inverted>
            <Table.Body>
            {  

                fields.map( field => {
                    return <Table.Row> 
                                <Table.Cell  width={3}>{field.displayname}</Table.Cell>
                                <Table.Cell width={13}>{field.fieldvalue}</Table.Cell>     
                           </Table.Row>
                })
            }
            </Table.Body>
        </Table>    
    );
}

export default ItemPropertiesTable;