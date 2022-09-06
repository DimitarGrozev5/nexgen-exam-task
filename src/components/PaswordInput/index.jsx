import { useState } from 'react';

import { useForm } from '../../hooks/useForm';
import { Style } from '../../util/styles';
import Label from '../Label';
import styles from './PasswordInput.module.css';

function PasswordInput({
  label,
  name,
  errorMsg = '',
  validator = () => true,
  initValue = '',

  placeholder,
  maxLength,
  minLength,
  readOnly,

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
  const { inputValue, inputOnChange, inputError, inputOnBlur } = useForm(
    initValue,
    name,
    value,
    onChange,
    validator
  );

  // Setup a change handler, to transform the Input value
  const changeHandler = (event) => inputOnChange(event.target.value);

  // Setup error message
  const errMsg = inputError ? errorMsg : '';

  // State for controlling password input visibility
  const [asText, setAsText] = useState(false);
  const toggleType = () => setAsText((t) => !t);

  // Setup labels, based on the password visibility
  const inputType = asText ? 'text' : 'password';
  const buttonCaption = asText ? 'Hide' : 'Show';

  const showButton = !!inputValue.length;

  // Setup input css styling
  const inputStyles = new Style(styles);
  inputStyles.add('input');
  if (inputError) {
    inputStyles.add('error');
  }
  if (showButton) {
    inputStyles.add('with-button');
  }
  const inputClassName = inputStyles.className;

  return (
    <Label label={label} error={errMsg}>
      <div className={styles['input-container']}>
        <input
          name={name}
          value={inputValue}
          onChange={changeHandler}
          onBlur={inputOnBlur}
          type={inputType}
          className={inputClassName}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          readOnly={readOnly}
        />
        {showButton && (
          <button
            className={inputError ? styles.error : ''}
            type="button"
            onClick={toggleType}
          >
            {buttonCaption}
          </button>
        )}
      </div>
    </Label>
  );
}

export default PasswordInput;
