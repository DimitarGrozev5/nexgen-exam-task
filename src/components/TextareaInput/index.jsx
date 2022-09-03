import Label from "../Label";

function TextareaInput({
  label,
  name,
  error,

  placeholder,
  disabled,
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
      <textarea
        name={name}
        value={value}
        onChange={changeHandler}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readOnly}
        spellCheck={spellCheck}
      ></textarea>
    </Label>
  );
}

export default TextareaInput;