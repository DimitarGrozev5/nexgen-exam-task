import { useForm } from "../../hooks/form-hook";
import Label from "../Label";
import styles from "./CheckboxInput.module.css";

function CheckboxInput({
  label,
  name,

  value,
  onChange,
}) {
  /**
   * 
   */
  const { inputValue, inputOnChange } = useForm(
    "checkbox",
    name,
    value,
    onChange,
    () => true
  );

  // Setup a change handler, to transform the Input value
  const changeHandler = () => inputOnChange(!inputValue);

  return (
    <Label label={label} textFirst={false}>
      <input
        name={name}
        checked={inputValue}
        onChange={changeHandler}
        className={styles.checkbox}
        type="checkbox"
      />
    </Label>
  );
}

export default CheckboxInput;
