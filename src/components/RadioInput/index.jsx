import { useForm } from "../../hooks/form-hook";
import Label from "../Label";
import styles from "./RadioInput.module.css";

function RadioInput({
  label,
  name,
  errorMsg = "",
  validator = () => true,
  initValue = undefined,

  options,

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
    initValue,
    name,
    value,
    onChange,
    validator
  );

  // Setup a change handler, to transform the Input value
  const changeHandler = (val) => () => inputOnChange(val);

  // Setup error message
  const errMsg = inputError ? errorMsg : "";

  // Function that maps an Option { val, label} to a Radio Input Component
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
      <Label label={label} error={errMsg}></Label>
      {options.map(mapOptionToRadio)}
    </>
  );
}

export default RadioInput;
