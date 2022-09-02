import Label from "../Label";
import styles from "./EmailInput.module.css";

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
        type="email"
        className={inputClassName}
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
