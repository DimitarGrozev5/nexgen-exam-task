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
  const inputStyles = [styles.input];
  if (error?.length) {
    inputStyles.push(styles.error);
  }

  const inputClassName = inputStyles.join(" ");

  return (
    <Label label={label} error={error}>
      <input
        value={value}
        onChange={onChange}
        type="text"
        className={inputClassName}
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
