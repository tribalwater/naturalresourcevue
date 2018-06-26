import React, { Component } from 'react';
import { Form, Input} from 'semantic-ui-react'

class ItemHidden extends Component {
    render() {
        let { label, value, onChange } = this.props;
        return (
           <Form.Field>
             <label >{label}</label>
             <Input value={value} onChange={onChange} type="hidden"></Input>
            </Form.Field>
        );
    }
}

export default ItemHidden;