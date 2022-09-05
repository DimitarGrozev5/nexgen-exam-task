import styles from "./SelectedFiles.module.css";

function SelectedFiles({ inputValue, inputOnChange }) {
  // Handler for removing a file
  const removeFileHandler = (name) => () => {
    const newFiles = inputValue.filter((file) => file.name !== name);
    inputOnChange(newFiles);
  };

  return (
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
  );
}

export default SelectedFiles;
