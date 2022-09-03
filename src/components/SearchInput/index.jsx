import Label from "../Label";
import styles from "./SearchInput.module.css";

function SearchInput({
  label,
  name,
  error,

  placeholder,
  maxLength,
  minLength,
  readOnly,

  value,
  onChange,
}) {
  const changeHandler = (event) => onChange(event.target.value);

  // Helper function for clearing the field
  const clearField = () => onChange("");

  const showClearButton = !!value.length;

  const inputStyles = [styles.input];
  if (error?.length) {
    inputStyles.push(styles.error);
  }

  const inputClassName = inputStyles.join(" ");

  return (
    <Label label={label} error={error}>
      <div className={styles["input-container"]}>
        <input
          name={name}
          value={value}
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
