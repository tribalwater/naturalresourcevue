import React from 'react'
import { Tab } from 'semantic-ui-react'

const ItemTab = ({}) => {
    return (
        <Tab.Pane>{this.props.children}</Tab.Pane>
    );
}

export default ItemTab;