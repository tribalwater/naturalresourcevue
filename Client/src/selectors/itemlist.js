import { createSelector } from 'reselect';

const itemListSelector = state => state.itemlist.items; 


export const itemArraySelector = createSelector(
    itemListSelector,
    items => items.reduce( (acc, item) => {
        let  fields = Object.values(item);
        acc.push(fields);
        return acc;
     }, [] ) 
);


export const itemArrayListedSelector  = createSelector(
    itemArraySelector,
    items => items.map( (fields) => {
        let  filterdFields  = fields.filter( i => i.islisted  && i.islisted == "Y" || i.fieldtype == "itemid");
        return filterdFields;
     }) 
);


export const itemArrayListedSortedSelector  = createSelector(
    itemArrayListedSelector,
    items => items.map( (fields) => {
         fields.sort( (a, b) => a.sortorder - b.sortorder)
        return fields;
     }) 
);

