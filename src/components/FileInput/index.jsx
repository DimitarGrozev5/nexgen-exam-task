import { useEffect, useState } from "react";

import { useForm } from "../../hooks/form-hook";
import { Style } from "../../util/styles";
import Label from "../Label";
import styles from "./FileInput.module.css";

function FileInput({
  label,
  name,
  errorMsg = "",
  validator = () => true,
  initValue = null,

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
  const errMsg = inputError ? errorMsg : "";

  // Set up hover state, to change the styling of the Input when a user is dragging a file over
  const [hover, setHover] = useState(false);

  // Set up an Input error message and make it dissapear after three seconds
  const [fileError, setFileError] = useState("");
  useEffect(() => {
    let timer;
    if (fileError) {
      timer = setTimeout(() => {
        setFileError("");
      }, 3000);
    }

    return () => {
      // setFileError("");
      clearTimeout(timer);
    };
  }, [fileError]);

  // Join the accepted values
  const acceptedValues = accept ? accept.join(",") : undefined;

  // Handler for validating the provided files and passing them to the onChange function
  const fileChangeHandler = (fileList) => {
    // Make sure value is not undefined
    if (!fileList) {
      return;
    }

    // Make sure there is at least one file selected
    const hasLength = multiple ? (a) => a > 0 : (a) => a === 1;
    if (!multiple && fileList.length > 0) {
      setFileError("Only one file please!");
    }
    if (!hasLength(fileList.length)) {
      return;
    }

    // Make sure the file extentions area accepted
    const extMatch = Array.from(fileList).reduce((res, { name }) => {
      const someMatchOrAcceptIsEmpty =
        accept.some((ext) => name.endsWith(ext)) || !accept.length;
      return res && someMatchOrAcceptIsEmpty;
    }, true);

    if (!extMatch) {
      setFileError("Invalid file extension!");
      return;
    }

    // Update Form state
    inputOnChange(Array.from(fileList));
  };

  // A bunch of handlers for receiving a drag and drop file
  const dragInHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHover(true);
  };

  const dragOutHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHover(false);
  };

  const dragHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const dropHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fileChangeHandler(event.dataTransfer.files);
    setHover(false);
  };

  // A handler for the file input element
  const fileInputChangeHandler = (event) => {
    fileChangeHandler(event.target.files);
  };

  // Seting up drop area styles
  const dropAreaStyles = new Style(styles);
  dropAreaStyles.add("drop-area");
  if (hover) {
    dropAreaStyles.add("active");
  }

  // Handler for removing a file
  const removeFileHandler = (name) => () => {
    const newFiles = inputValue.filter((file) => file.name !== name);
    inputOnChange(newFiles);
  };

  return (
    <>
      <Label label={label} error={errMsg}></Label>
      <input
        type="file"
        accept={acceptedValues}
        multiple={multiple}
        className={styles["native-file"]}
        onChange={fileInputChangeHandler}
      />

      {(!inputValue || !inputValue.length) && (
        <div
          className={dropAreaStyles.className}
          onDragEnter={dragInHandler}
          onDragLeave={dragOutHandler}
          onDragOver={dragHandler}
          onDrop={dropHandler}
        >
          {fileError && (
            <span className={styles["error-msg"]}>{fileError}</span>
          )}
          {!fileError && !value && "Drop a file or click to open a dialog"}
        </div>
      )}

      {inputValue && !!inputValue.length && (
        <div className={styles["selected-files"]}>
          <ul>
            {inputValue.map((file) => (
              <li key={file.name} className={styles.file}>
                {file.name}{" "}
                <button onClick={removeFileHandler(file.name)} type="button">
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default FileInput;
