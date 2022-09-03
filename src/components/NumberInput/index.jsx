import Label from "../Label";
import styles from "./NumberInput.module.css";

function NumberInput({
  label,
  error,

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
  const changeHandler = (event) => onChange(event.target.value);

  const increment = (dir) => () => {
    if (isNaN(+value)) {
      onChange(dir);
    }
    onChange(+value + dir);
  };

  return (
    <Label label={label} error={error}>
      <div className={styles["number-container"]}>
        <button type="button" onClick={increment(-1)} className={styles.left}>
          -
        </button>
        <input
          value={value}
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
