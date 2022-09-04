import { useForm } from "../../hooks/form-hook";
import Label from "../Label";
import styles from "./NumberInput.module.css";

function NumberInput({
  label,
  name,
  errorMsg = "",
  validator = () => true,

  placeholder,
  max,
  min,
  step,
  maxLength,
  minLength,
  readOnly,
  spellCheck,

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
    "number",
    name,
    value,
    onChange,
    validator
  );

  // Setup a change handler, to transform the Input value
  // TODO: Allow the user to input just a minus sign
  const changeHandler = (event) => inputOnChange(+event.target.value);

  // Setup error message
  const errMsg = inputError ? errorMsg : "";

  // Function to handle the increment and decrement buttons
  const increment = (dir) => () => {
    if (isNaN(+inputValue)) {
      inputOnChange(dir);
    }
    inputOnChange(+inputValue + dir);
  };

  return (
    <Label label={label} error={errMsg}>
      <div className={styles["number-container"]}>
        <button type="button" onClick={increment(-1)} className={styles.left}>
          -
        </button>
        <input
          name={name}
          value={inputValue}
          onChange={changeHandler}
          type="number"
          placeholder={placeholder}
          max={max}
          min={min}
          step={step}
          maxLength={maxLength}
          minLength={minLength}
          readOnly={readOnly}
          spellCheck={spellCheck}
        />
        <button type="button" onClick={increment(1)} className={styles.right}>
          +
        </button>
      </div>
    </Label>
  );
}

export default NumberInput;
