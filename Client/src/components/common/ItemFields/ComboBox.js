import React from "react";
import { Select, Input } from "semantic-ui-react";

// combination between a select box and a input field
// user can either select a value from list
// or enter a value manually
const ComboBox = ({ comboBoxOptions }) => (
  //<Input placeholder="select" type="text" />
  <Select placeholder="Select your country" options={comboBoxOptions} />
);

export default ComboBox;
