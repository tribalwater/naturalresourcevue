import React, { Component } from 'react';
import { Form, Input} from 'semantic-ui-react'

class ItemCheckBox extends Component {
    render() {
        let {checkboxes, label} = this.props
        let checkBoxes = checkboxes.map(c => <Form.Checkbox label={c.optionvalue} />)
        return (
            <Form.Group>
                 <Form.Field>
                  <label >{label} : </label>
                 </Form.Field>
                  
                {checkBoxes}
            </Form.Group>
                
        );
    }
}

export default ItemCheckBox;