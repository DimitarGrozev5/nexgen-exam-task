import Label from "../Label";

function TelInput({
  label,
  name,
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
        name={name}
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
