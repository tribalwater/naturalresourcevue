import { createSelector } from 'reselect';

const itemFormFieldsSelector     = state => state.itemformfields.fields; 
const itemFormSectionsSelector   = state => state.itemformfields.sections; 

export const getVisibileFormFields = createSelector(
     itemFormFieldsSelector, itemFormSectionsSelector,
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