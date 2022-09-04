import { useForm } from "../../hooks/form-hook";
import Label from "../Label";
import styles from "./RadioInput.module.css";

function RadioInput({
  label,

  name,
  options,

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
  const changeHandler = (val) => () => inputOnChange(val);

  const mapOptionToRadio = ({ val, label }) => (
    <Label label={label} textFirst={false} key={val}>
      <input
        checked={val === inputValue}
        onChange={changeHandler(val)}
        name={name}
        className={styles.radio}
        type="radio"
      />
    </Label>
  );

  return (
    <>
      <Label label={label}></Label>
      {options.map(mapOptionToRadio)}
    </>
  );
}

export default RadioInput;
