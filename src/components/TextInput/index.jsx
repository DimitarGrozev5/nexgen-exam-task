import Label from "../Label";

function TextInput({
  label,
  name,
  error,

  placeholder,
  maxLength,
  minLength,
  readOnly,
  spellCheck,

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
        type="text"
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readOnly}
        spellCheck={spellCheck}
      />
    </Label>
  );
}

export default TextInput;
