import Label from "../Label";
import styles from "./TextInput.module.css";

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
  return (
    <Label label={label} error={error}>
      <input
        value={value}
        onChange={onChange}
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
