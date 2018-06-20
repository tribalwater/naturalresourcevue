import React, { Component } from 'react';
import { Button, Header, Image, Modal, Form, Input, TextArea } from 'semantic-ui-react'

var isOpen = false;

setTimeout(() => {
    isOpen = true;
}, 500);
class ItemFormModel extends Component {
    constructor(props){
        super(props);
        this.state = {isOpen: false};
    }

    componentWillMount(){
        setTimeout(() => {
           this.setState({isOpen: true})
        }, 10500);
    }
    render() {
        return (
            <Modal open={isOpen}  centered={true} size="fullscreen" style= {{ 'margin-top': '20px', 'color': "green"}} className="fuck" >
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                <Form>
                    <Form.Group widths='equal'>
                    <Form.Field
                        id='form-input-control-first-name'
                        control={Input}
                        label='First name'
                        placeholder='First name'
                    />
                    <Form.Field
                        id='form-input-control-last-name'
                        control={Input}
                        label='Last name'
                        placeholder='Last name'
                    />
                    </Form.Group>
                    <Form.Field
                    id='form-textarea-control-opinion'
                    control={TextArea}
                    label='Opinion'
                    placeholder='Opinion'
                    />
                    <Form.Field
                    id='form-button-control-public'
                    control={Button}
                    content='Confirm'
                    label='Label with htmlFor'
                    />
                </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative>No</Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Yes' />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default ItemFormModel;