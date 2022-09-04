import { useForm } from "../../hooks/form-hook";
import Label from "../Label";
import MultipleEmail from "./MultipleEmail";

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
      <MultipleEmail
        label={label}
        name={name}
        errorMsg={errMsg}
        value={inputValue}
        onChange={inputOnChange}
      />
    );
  }

  return emailComponent;
}

export default EmailInput;
