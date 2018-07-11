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


export const itemListDataGridCols  =  createSelector(
    itemArrayListedSortedSelector, 
    (listedItems) => {
        let cols = [];
        if(listedItems && listedItems.length > 0){
            let listedItemsFirst  = listedItems[0];
            let filterdCols = listedItemsFirst;
            cols =  filterdCols.map( (li, idx) => {
                let colObj = {};
                colObj.Header = li.displayname;
                colObj.accessor = getDFunc(idx);
                colObj.id = li.fieldname;
                if(li.fieldname == "itemid"){
                    colObj.show = false;
                }
                return colObj;
            });    
        }   
        return cols;
   }
); 
function getDFunc(idx){
    
    return d => d[idx].fieldvalue
}
