import React, { Component } from 'react';
import { Form, Dropdown } from 'semantic-ui-react'

class ItemPickList extends Component {
    constructor(props){
        super(props);
        this.mapSelectOptions = this.mapSelectOptions.bind(this);
    }
    mapSelectOptions(field, idx, arr){
        return  { text: field["optionvalue"], value : field["optionvalue"] }
    }
    render() {
        
        let {selectOpions, label, value, onChange} = this.props;
        let formattedOptions = selectOpions.map(this.mapSelectOptions);
        return (
              <Form.Field>
                        <label>{label}</label>
                        <Dropdown
                            value={value} 
                            options={formattedOptions} 
                            name={label} 
                            onChange={onChange} 
                            fluid selection 
                    />
               </Form.Field>
        );
    }
}


export default ItemPickList;