import styles from "./InputWrapper.module.css";

function Label({ label, error, children }) {
  return (
    <label className={styles.label}>
      {label}
      <div className={styles["input-container"]}>
        {children}
        {error?.length && <div className={styles.error}>{error}</div>}
      </div>
    </label>
  );
}

export default Label;
