import { useForm } from "../../hooks/form-hook";
import Label from "../Label";
import styles from "./EmailInput.module.css";

function EmailInput({
  label,
  name,
  errorMsg = "",
  validator = () => true,

  placeholder,
  maxLength,
  minLength,
  readOnly,
  multiple,

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
    "email",
    name,
    value,
    onChange,
    validator
  );

  // Setup a change handler, to transform the Input value
  const changeHandler = (event) => inputOnChange(event.target.value);

  // Setup error message
  const errMsg = inputError ? errorMsg : "";

  // Render this for a simple email input field
  let emailComponent = (
    <Label label={label} error={errMsg}>
      <input
        name={name}
        value={inputValue}
        onChange={changeHandler}
        type="email"
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readOnly}
        multiple={multiple}
      />
    </Label>
  );

  // Render this for multiple email input fields
  if (multiple) {
    emailComponent = (
      <Label label={label} error={errMsg}>
        <div className={styles["email-container"]}>
          <div className={styles["emails-entered"]}></div>
          <input
            name={name}
            value={inputValue}
            onChange={changeHandler}
            type="email"
            placeholder={placeholder}
            multiple={multiple}
          />
        </div>
      </Label>
    );
  }

  return emailComponent;
}

export default EmailInput;
