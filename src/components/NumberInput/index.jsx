import { useForm } from "../../hooks/form-hook";
import { Style } from "../../util/styles";
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
  const changeHandler = (event) => inputOnChange(+event.target.value);

  // Setup error message
  const errMsg = inputError ? errorMsg : "";

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
