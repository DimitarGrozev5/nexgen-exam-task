import styles from "./InputWrapper.module.css";
import { Style } from "../../util/styles";

function Label({ label, error, children: inputComponent, textFirst = true }) {
  // Setup input styles
  const inputStyles = new Style(styles);
  inputStyles.add("input-container");
  if (error && error.length) {
    inputStyles.add("error");
  }
  if (!textFirst) {
    inputStyles.add("single-line");
  }
  const inputClassNames = inputStyles.className;

  // Setup label html structure

  // Default value is a Label with text, an input component and an error message
  let labelContent = (
    <>
      {label}
      <div className={inputClassNames}>
        {inputComponent}
        {error && error.length && <div className={styles.error}>{error}</div>}
      </div>
    </>
  );

  // With text first the label drops the error message and displays after the Input element
  if (!textFirst) {
    labelContent = (
      <>
        <div className={inputClassNames}>
          {inputComponent}
          {label}
        </div>
      </>
    );
  }

  return <label className={styles.label}>{labelContent}</label>;
}

export default Label;
