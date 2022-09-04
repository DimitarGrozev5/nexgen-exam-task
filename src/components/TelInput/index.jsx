import { useForm } from "../../hooks/form-hook";
import Label from "../Label";

function TelInput({
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
   * Check if the Input is inside a Form Component.
   * If so, the Input can be controlled by the Form
   *
   * If the parent has passed value and onChange props,
   * the Input will be controlled not by the Form, but by the parent
   */
  const { inputValue, inputOnChange, inputError } = useForm(
    "tel",
    name,
    value,
    onChange,
    validator
  );

  // Setup a change handler, to transform the Input value
  const changeHandler = (event) => inputOnChange(event.target.value);

  // Setup error message
  const errMsg = inputError ? errorMsg : "";

  return (
    <Label label={label} error={errMsg}>
      <input
        name={name}
        value={inputValue}
        onChange={changeHandler}
        type="tel"
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readOnly}
      />
    </Label>
  );
}

export default TelInput;
