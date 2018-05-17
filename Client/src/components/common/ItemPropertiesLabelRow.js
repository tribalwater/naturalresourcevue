import React from 'react'
import { Table, Button, Icon, Header } from 'semantic-ui-react'


const ItemPropertiesLabelRow=  ({isVisible, field, toggleSection}) => (
    <Table.Row  key={field.fieldname}> 
    <Table.Cell width={3} className="prop-table-label-row"  > 
     <Button primary onClick={() => toggleSection(field.id)} key={field.fieldname} fluid size="tiny">
      <Icon name= {isVisible ? 'chevron down': 'chevron right' } />
     </Button>                                     
    </Table.Cell>
    <Table.Cell width={13}  className="prop-table-label-row">
      <Header  className="prop-table-label-row" as="h3" textAlign="center">{field.displayname}</Header> 
    </Table.Cell>                           
  </Table.Row>
);

export default ItemPropertiesLabelRow;