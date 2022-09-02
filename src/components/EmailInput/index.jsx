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
  return (
    <Label label={label} error={error}>
      <input
        value={value}
        onChange={onChange}
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
