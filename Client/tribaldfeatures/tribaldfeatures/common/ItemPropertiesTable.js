import React from 'react'
import { Table } from 'semantic-ui-react'

const ItemPropertiesTable = ({}) => {
    return (
        <Table celled>
            <Table.Header>
            <Table.Row textAlign={'center'}>
                <Table.HeaderCell>Item Properties</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {
                this.props.fields.map( field => {
                    return <Table.Row> 
                                <Table.Cell>{field.label}</Table.Cell>
                                <Table.Cell>{field.value}</Table.Cell>     
                           </Table.Row>
                })
            }
            </Table.Body>
        </Table>    
    );
}

export default ItemPropertiesTable;