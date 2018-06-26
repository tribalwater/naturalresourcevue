
import React, { Component } from 'react';
import { Input, Form} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class ExampleCustomInput extends Component {

    render () {
        let {onClick, value, label} = this.props;
      return (
        <Form.Field  onClick = {onClick}>
            <label >{label}</label>
           <Input placeholder='Search...'  value={value} icon="calendar alternate outline" type="text"/>
        </Form.Field>
      )
    }
}
class ItemDate extends Component {
    render() {
        let { label, value, onChange, selectedDate } = this.props;
        return (
            <DatePicker
                        customInput={<ExampleCustomInput  label={label}/>}
                        selected={selectedDate}
                        onChange={onChange}
                        label={label}
                        className = "full-width"
            />
        );
    }
}

export default ItemDate;