import { useState } from "react";
import Label from "../Label";
import styles from "./PasswordInput.module.css";

function PasswordInput({
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

  // State for controlling password input visibility
  const [asText, setAsText] = useState(false);
  const toggleType = () => setAsText((t) => !t);
  const inputType = asText ? "text" : "password";
  const buttonCaption = asText ? "Hide" : "Show";

  const showButton = !!value.length;

  const inputStyles = [styles.input];
  if (error?.length) {
    inputStyles.push(styles.error);
  }

  const inputClassName = inputStyles.join(" ");

  return (
    <Label label={label} error={error}>
      <div className={styles["input-container"]}>
        <input
          value={value}
          onChange={changeHandler}
          type={inputType}
          className={inputClassName}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          readOnly={readOnly}
        />
        {showButton && (
          <button onClick={toggleType}>{buttonCaption}</button>
        )}
      </div>
    </Label>
  );
}

export default PasswordInput;
