import { dateToInput, inputToDate } from "../../util/date";
import Label from "../Label";

function DateInput({
  label,
  name,
  error,

  max,
  min,
  step,

  value,
  onChange,
}) {
  const changeHandler = (event) => onChange(inputToDate(event.target.value));

  return (
    <Label label={label} error={error}>
      <input
        name={name}
        value={dateToInput(value)}
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
