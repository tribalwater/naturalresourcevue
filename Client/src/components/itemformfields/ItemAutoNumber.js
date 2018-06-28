import React, { Component } from 'react';
import { Form, Input} from 'semantic-ui-react';


class ItemAutoNumber extends Component {
    render() {
        let { label } = this.props;
        return (
           <Form.Field>
             <label >{label}</label>
             <Input value={"(AutoNumber)"}  type="text" readonly ></Input>
            </Form.Field>
        );
    }
}

export default ItemAutoNumber;