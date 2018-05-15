import { createSelector } from 'reselect';

const itemPropertiesFieldsSelector = state => state.itemproperties.fields; 
const itemPropertiesSectionsSelector   = state => state.itemproperties.sections; 
const isFetched                    = state => state.itemproperties.simplefields;


export const getVisibileItemFields = createSelector(
     itemPropertiesFieldsSelector, itemPropertiesSectionsSelector,
     (fields, sections) => {  
        let visibleFields  = fields.slice();
        for (const key in sections) {
            if (sections.hasOwnProperty(key)) {
                let { startIndex, endIndex, isVisible }= sections[key];         
                if (!isVisible) {

                        for (let index = startIndex; index <  endIndex ; index++) {
                            visibleFields[index] = null    
                        }

                } else {

                        for (let index = startIndex; index <  endIndex ; index++) {
                            visibleFields[index] =  fields[index] 
                        }
                }
            }
        }     
        return visibleFields
     }
)