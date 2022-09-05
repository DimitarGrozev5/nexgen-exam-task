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

  // Setup error message
  const errMsg = inputError ? errorMsg : "";

  const [hover, setHover] = useState(false);

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

  const acceptedValues = accept ? accept.join(",") : undefined;

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

    // Make sure the file extentions match
    const extMatch = Array.from(fileList).reduce((res, { name }) => {
      const someMatchOrAcceptIsEmpty =
        accept.some((ext) => name.endsWith(ext)) || !accept.length;
      return res && someMatchOrAcceptIsEmpty;
    }, true);
    if (!extMatch) {
      setFileError("Invalid file extension!");
      return;
    }

    inputOnChange(Array.from(fileList));
  };

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

  const fileInputChangeHandler = (event) => {
    fileChangeHandler(event.target.files);
  };

  const dropAreaStyles = new Style(styles);
  dropAreaStyles.add("drop-area");
  if (hover) {
    dropAreaStyles.add("active");
  }

  return (
    <Label label={label} error={errMsg}>
      <input
        type="file"
        accept={acceptedValues}
        multiple={multiple}
        className={styles["native-file"]}
        onChange={fileInputChangeHandler}
      />
      {!inputValue && (
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

      {inputValue && (
        <div>
          <ul>
            {inputValue.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </Label>
  );
}

export default FileInput;
