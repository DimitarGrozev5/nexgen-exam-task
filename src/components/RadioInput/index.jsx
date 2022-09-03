import Label from "../Label";
import styles from "./RadioInput.module.css";

function RadioInput({
  label,

  name,
  options,

  value,
  onChange,
}) {
  const changeHandler = (val) => () => onChange(val);

  const mapOptionToRadio = ({ val, label }) => (
    <Label label={label} textFirst={false} key={val}>
      <input
        checked={val === value}
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
