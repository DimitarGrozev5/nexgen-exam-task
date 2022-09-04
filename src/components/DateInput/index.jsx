import { useForm } from "../../hooks/form-hook";
import { dateToInput, inputToDate } from "../../util/date";
import Label from "../Label";

function DateInput({
  label,
  name,
  errorMsg = "",
  validator = () => true,
  initValue = undefined,

  max,
  min,
  step,

  value,
  onChange,
}) {
  /**
   * 
   */
  const { inputValue, inputOnChange, inputError, inputOnBlur } = useForm(
    initValue,
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
          onBlur={inputOnBlur}
        type="date"
        max={max}
        min={min}
        step={step}
      />
    </Label>
  );
}

export default DateInput;
