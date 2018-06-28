import React, { Component } from 'react';
import { Form, Input,  Modal, Button} from 'semantic-ui-react';


class ItemPickWindow extends Component {
    render() {
        let { label, onChange } = this.props;
        let selectedvalue = "my value";
        return (
            <Form.Field>
                 <label >{label}</label>
                <Modal trigger={<Button fluid>Select {label}</Button>} centered={true} size="fullscreen" style= {{ 'margin-top': '20px', 'color': "green"}} className="fuck" >
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                        PickWindow Coming Soon
                    </Modal.Content>
                </Modal>
                <Input value={selectedvalue}  type="text" readonly></Input>    
            </Form.Field>
            
        );
    }
}

export default ItemPickWindow;