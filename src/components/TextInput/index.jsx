import Label from "../Label";

function TextInput({
  label,
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
