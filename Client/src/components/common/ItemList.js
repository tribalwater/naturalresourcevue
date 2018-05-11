import React from 'react'
import { List } from 'semantic-ui-react'
// maybe use custom render method thats 
// on the redux middle ware class repo
 const ItemList = ({items}) => {
  
    return (
       <List items={items}></List>
    )
}