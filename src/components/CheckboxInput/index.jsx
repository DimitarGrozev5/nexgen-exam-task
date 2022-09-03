import Label from "../Label";
import styles from "./CheckboxInput.module.css";

function CheckboxInput({
  label,
  name,

  value,
  onChange,
}) {
  const changeHandler = (event) => onChange(!value);

  return (
    <Label label={label} textFirst={false}>
      <input
        name={name}
        checked={value}
        onChange={changeHandler}
        className={styles.checkbox}
        type="checkbox"
      />
    </Label>
  );
}

export default CheckboxInput;
