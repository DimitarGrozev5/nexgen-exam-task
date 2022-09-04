import { useState } from "react";

import { useForm } from "../../hooks/form-hook";
import { Style } from "../../util/styles";
import Label from "../Label";
import styles from "./PasswordInput.module.css";

function PasswordInput({
  label,
  name,
  errorMsg = "",
  validator = () => true,

  placeholder,
  maxLength,
  minLength,
  readOnly,

  value,
  onChange,
}) {
  /**
   * Pass data to Form hook. If the Input is in a Form component,
   * the Form hook will control this Input. If the Input is NOT in
   * a Form component, it will be controlled by it's parent
   * through the value and onChange props
   */
  const { inputValue, inputOnChange, inputError } = useForm(
    "password",
    name,
    value,
    onChange,
    validator
  );

  // Setup a change handler, to transform the Input value
  const changeHandler = (event) => inputOnChange(event.target.value);

  // Setup error message
  const errMsg = inputError ? errorMsg : "";

  // State for controlling password input visibility
  const [asText, setAsText] = useState(false);
  const toggleType = () => setAsText((t) => !t);
  const inputType = asText ? "text" : "password";
  const buttonCaption = asText ? "Hide" : "Show";

  const showButton = !!inputValue.length;

  const inputStyles = new Style(styles);
  inputStyles.add("input");
  if (inputError) {
    inputStyles.add("error");
  }
  if (showButton) {
    inputStyles.add("with-button");
  }

  const inputClassName = inputStyles.className;

  return (
    <Label label={label} error={errMsg}>
      <div className={styles["input-container"]}>
        <input
          name={name}
          value={inputValue}
          onChange={changeHandler}
          type={inputType}
          className={inputClassName}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          readOnly={readOnly}
        />
        {showButton && (
          <button type="button" onClick={toggleType}>
            {buttonCaption}
          </button>
        )}
      </div>
    </Label>
  );
}

export default PasswordInput;
