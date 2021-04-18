import React from "react";
import RDatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
import "../../styles/datePicker.css";
export default function DatePicker(props) {
  return (
    <div>
      <label>
        Due date:
        <span class="chakra-form__required-indicator css-1tknnrp">*</span>
      </label>
      <RDatePicker
        onChange={props.getDate}
        min={new Date()}
        defaultValue={props.defaultDate || new Date()}
        includeTime
      />
    </div>
  );
}
