import { useEffect, useRef, useState } from 'react';

import { useForm } from '../../../hooks/useForm';
import Label from '../../Label';
import Dragable from './Dragable';
import styles from './FileInput.module.css';
import SelectedFiles from './SelectedFiles';

function FileInput({
  label,
  name,
  errorMsg = '',
  validator = () => true,
  initValue = [],

  accept = [],
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
  const { inputValue, inputOnChange, inputError } = useForm(
    initValue,
    name,
    value,
    onChange,
    validator
  );

  // Setup error message for form validation
  const errMsg = inputError ? errorMsg : '';

  // Join the accepted values
  const acceptedValues = accept ? accept.join(',') : undefined;

  // Set up an Input error message and make it dissapear after three seconds
  const [fileError, setFileError] = useState('');
  useEffect(() => {
    let timer;
    if (fileError !== '') {
      timer = setTimeout(() => {
        setFileError('');
      }, 3000);
    }

    return () => {
      // setFileError("");
      clearTimeout(timer);
    };
  }, [fileError]);

  // Handler for validating the provided files and passing them to the onChange function
  const fileChangeHandler = (fileList) => {
    // Make sure value is not undefined
    if (!fileList) {
      return;
    }

    // Make sure there is at least one file selected
    const hasLength = multiple ? (a) => a > 0 : (a) => a === 1;
    if (!multiple && fileList.length > 0) {
      setFileError('Only one file please!');
    }
    if (!hasLength(fileList.length)) {
      return;
    }

    // Make sure the file extentions area accepted
    const extMatch = [...fileList].reduce((res, { name }) => {
      const someMatchOrAcceptIsEmpty =
        accept.some((ext) => name.endsWith(ext)) || !accept.length;
      return res && someMatchOrAcceptIsEmpty;
    }, true);

    if (!extMatch) {
      setFileError('Invalid file extension!');
      return;
    }

    // Update Form state
    inputOnChange([...fileList]);
  };

  // A handler for the file input element
  const fileInputChangeHandler = (event) => {
    fileChangeHandler(event.target.files);
  };

  // Get ref for file input
  const fileInputRef = useRef();
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <Label label={label} error={errMsg}></Label>
      <input
        type="file"
        accept={acceptedValues}
        multiple={multiple}
        className={styles['native-file']}
        onChange={fileInputChangeHandler}
        ref={fileInputRef}
      />

      {!inputValue?.length && (
        <Dragable
          fileChangeHandler={fileChangeHandler}
          fileError={fileError}
          openFileDialog={openFileInput}
        />
      )}

      {!!inputValue?.length && (
        <SelectedFiles inputValue={inputValue} inputOnChange={inputOnChange} />
      )}
    </div>
  );
}

export default FileInput;
