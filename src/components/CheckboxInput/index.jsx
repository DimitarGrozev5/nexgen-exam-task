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
   * Pass data to Form hook. If the Input is in a Form component,
   * the Form hook will control this Input. If the Input is NOT in
   * a Form component, it will be controlled by it's parent
   * through the value and onChange props
   */
  const { inputValue, inputOnChange } = useForm(
    "email",
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
