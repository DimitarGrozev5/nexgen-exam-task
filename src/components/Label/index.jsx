import styles from "./InputWrapper.module.css";
import { Style } from "../../util/styles";

function Label({ label, error, children, textFirst = true }) {
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
  console.log(inputClassNames.className);

  // Setup label html structure
  let labelContent = (
    <>
      {label}
      <div className={inputClassNames}>
        {children}
        {error && error.length && <div className={styles.error}>{error}</div>}
      </div>
    </>
  );
  if (!textFirst) {
    labelContent = (
      <>
        <div className={inputClassNames}>
          {children}
          {label}
        </div>
      </>
    );
  }

  return <label className={styles.label}>{labelContent}</label>;
}

export default Label;
