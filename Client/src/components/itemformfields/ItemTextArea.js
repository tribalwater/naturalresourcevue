import React, { Component } from 'react';
import { Form, TextArea} from 'semantic-ui-react'

class ItemTextArea extends Component {
    render() {
        let { label, value, onChange, rows } = this.props;
        
        return (
            <Form.Field>
                <label >{label}</label>
                <TextArea value={value} onChange={onChange} rows={rows} />
             </Form.Field>  
        );
    }
}

export default ItemTextArea;