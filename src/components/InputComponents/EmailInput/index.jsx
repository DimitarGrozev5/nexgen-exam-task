import { useForm } from '../../../hooks/useForm';
import Label from '../../Label';
import MultipleEmail from './MultipleEmail';

function EmailInput({
  label,
  name,
  errorMsg = '',
  validator = () => true,
  initValue = '',

  placeholder,
  maxLength,
  minLength,
  readOnly,
  multiple,

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
  const defaultInitValue = initValue || (multiple ? [] : '');
  const { inputValue, inputOnChange, inputError, inputOnBlur } = useForm(
    defaultInitValue,
    name,
    value,
    onChange,
    validator
  );

  // Setup a change handler, to transform the Input value
  const changeHandler = (event) => inputOnChange(event.target.value);

  // Setup error message
  const errMsg = inputError ? errorMsg : '';

  // Render this for a simple email input field
  let emailComponent = (
    <Label label={label} error={errMsg}>
      <input
        name={name}
        value={inputValue}
        onChange={changeHandler}
        onBlur={inputOnBlur}
        type="email"
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readOnly}
        multiple={multiple}
      />
    </Label>
  );

  // Render this for multiple email input fields
  if (multiple) {
    emailComponent = (
      <MultipleEmail
        label={label}
        name={name}
        errorMsg={errMsg}
        value={inputValue}
        onChange={inputOnChange}
        onBlur={inputOnBlur}
      />
    );
  }

  return emailComponent;
}

export default EmailInput;
