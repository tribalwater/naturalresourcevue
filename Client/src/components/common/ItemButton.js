import React from 'react'
import {Button} from  'semantic-ui-react'

const ItemButton= ({text, icon, onClick}) => {
    return ( 
        <Button icon={icon} onClick={onClick}>{text}</Button>
    );
}

export default ItemButton;