import styles from "./InputWrapper.module.css";

function Label({ label, error, children }) {
  const inputStyles = [styles["input-container"]];
  if (error && error.length) {
    inputStyles.push(styles.error);
  }
  const inputClassNames = inputStyles.join(" ");

  return (
    <label className={styles.label}>
      {label}
      <div className={inputClassNames}>
        {children}
        {error && error.length && <div className={styles.error}>{error}</div>}
      </div>
    </label>
  );
}

export default Label;
