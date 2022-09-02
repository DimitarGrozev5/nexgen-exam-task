import { useState } from "react";
import Label from "../Label";

function TelInput({
  label,
  error,

  placeholder,
  maxLength,
  minLength,
  readOnly,

  value,
  onChange,
}) {
  const changeHandler = (event) => onChange(event.target.value);

  return (
    <Label label={label} error={error}>
      <input
        value={value}
        onChange={changeHandler}
        type="tel"
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readOnly}
      />
    </Label>
  );
}

export default TelInput;
