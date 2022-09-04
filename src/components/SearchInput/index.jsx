import { useForm } from "../../hooks/form-hook";
import { Style } from "../../util/styles";
import Label from "../Label";
import styles from "./SearchInput.module.css";

function SearchInput({
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
    "search",
    name,
    value,
    onChange,
    validator
  );

  // Setup a change handler, to transform the Input value
  const changeHandler = (event) => inputOnChange(event.target.value);

  // Setup error message
  const errMsg = inputError ? errorMsg : "";

  // Helper function for clearing the field
  const clearField = () => inputOnChange("");

  const showClearButton = !!inputValue.length;

  // Setup input css styling
  const inputStyles = new Style(styles);
  inputStyles.add("input");
  if (inputError) {
    inputStyles.add("error");
  }
  if (showClearButton) {
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
          type="text"
          className={inputClassName}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          readOnly={readOnly}
        />
        {showClearButton && (
          <button type="button" onClick={clearField}>
            Clear
          </button>
        )}
      </div>
    </Label>
  );
}

export default SearchInput;
