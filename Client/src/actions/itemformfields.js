import * as actions from "../consts/ActionTypes";

export const  receiveItemFormFields  = (payload) => {
  console.log("recieve item form fields")
  console.log(payload)
   return ({
    type: actions.RECEIVE_ITEM_FORM_FIELDS,
    payload:  payload.sort( (a,b) => a.sortorder - b.sortorder)
   })
};

export const receiveItemFormFieldsSections = (payload) => ({
  type: actions.RECEIVE_ITEM_FORM_FIELDS_SECTIONS,
  payload : getFieldSections( getLabelFields(payload), payload)
})

export const toggleSection = (sectionid) => ({
  type: actions.TOGGLE_ITEM_FORM_FIELDS_SECTION,
  payload : sectionid
});

export const getItemFormFields = (payload) =>  dispatch =>{
  console.log(payload)
   dispatch({
    type: actions.API,
    payload: {
      url: `/item/${payload.itemtype}/${payload.itemsubtype}/formfields`,
      //schema: [schema.books],
      success:(payload) => [
        receiveItemFormFields(payload)
       
      ] ,
      label: 'itemformfields',
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