import Label from "../Label";

function EmailInput({
  label,
  error,

  placeholder,
  maxLength,
  minLength,
  readOnly,
  multiple,

  value,
  onChange,
}) {
  const changeHandler = (event) => onChange(event.target.value);

  return (
    <Label label={label} error={error}>
      <input
        value={value}
        onChange={changeHandler}
        type="email"
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readOnly}
        multiple={multiple}
      />
    </Label>
  );
}

export default EmailInput;
