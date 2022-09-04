import { useForm } from "../../hooks/form-hook";
import { dateToInput, inputToDate } from "../../util/date";
import Label from "../Label";

function DateInput({
  label,
  name,
  errorMsg = "",
  validator = () => true,

  max,
  min,
  step,

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
    "date",
    name,
    value,
    onChange,
    validator
  );

  // Setup a change handler, to transform the Input value
  const changeHandler = (event) =>
    inputOnChange(inputToDate(event.target.value));

  // Setup error message
  const errMsg = inputError ? errorMsg : "";

  return (
    <Label label={label} error={errMsg}>
      <input
        name={name}
        value={dateToInput(inputValue)}
        onChange={changeHandler}
        type="date"
        max={max}
        min={min}
        step={step}
      />
    </Label>
  );
}

export default DateInput;
