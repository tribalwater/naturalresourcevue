import React from 'react'
import { Tab } from 'semantic-ui-react'

const ItemTabGroup = ({panes}) => {
    return (
          <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
    );
}


export default ItemTabGroup;