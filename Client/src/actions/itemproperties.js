import * as actions from "../consts/ActionTypes";

export const receiveItemProperties  = (payload) => {
   return ({
    type: actions.RECEIVE_ITEM_PROPETIES,
    payload : {...payload, records : fieldObjToArr(payload.records[0], payload.display), sections: getFieldSections( getLabelFields(fieldObjToArr(payload.records[0], payload.display)) , fieldObjToArr(payload.records[0], payload.display))}
   })
};

export const receiveItemPropertiesSections = (payload) => ({
  type: actions.RECEIVE_ITEM_PROPETIES_SECTIONS,
  payload : getFieldSections( getLabelFields(fieldObjToArr(payload.records[0], payload.display)) , fieldObjToArr(payload.records[0], payload.display))
})

export const toggleSection = (sectionid) => ({
  type: actions.TOGGLE_ITEMPROPERTIES_SECTION,
  payload : sectionid
});

export const getItemProperties = (payload) =>  dispatch =>{
   dispatch({
    type: actions.API,
    payload: {
      url: `/item/${payload.itemtype}/${payload.itemsubtype}/properties/${payload.itemid}`,
      //schema: [schema.books],
      success:(payload) => [
        receiveItemProperties(payload)
        //receiveItemPropertiesSections(payload)
      ] ,
      label: 'itemproperties',
      method: "GET"
    } 
  })
};

const getLabelFields = (fields) => {
  let labelArr = fields.reduce( (acc, field, idx, labelArr)  =>  {    
      if(field.fieldtype == 'label') {
          field.id =  `section${idx}`; 
          acc.push({ startIndex : idx + 1, id : `section${idx}` }); 
      }    
      return acc;
   }, []);
  return labelArr;
}

const getFieldSections =   (labelArr, fields) => {
  let sectionsObj = labelArr.reduce( 
      (acc, field, idx, labelArr) => {
        field.endIndex = (idx < labelArr.length - 1) ? labelArr[idx + 1].startIndex - 1 : fields.length;  
        field.isVisible = true;
        acc[field.id]  = field;
        return acc; 
  }, {})

  return sectionsObj;
}


const fieldObjToArr =  (fields, display) => {
       
  let newFields = [];

  for (const key in fields) {
    if (fields.hasOwnProperty(key)) {
      if(display.hasOwnProperty(key))
        newFields.push(fields[key])
      
    }
  }

  for (const key in display) {
    if (display.hasOwnProperty(key)) {
      const element = display[key];
      if(element.fieldtype === 'label'){
        newFields.push(element)
      }
    }
  }

  newFields.sort( (a,b) => a.sortorder - b.sortorder);

  return newFields;
}