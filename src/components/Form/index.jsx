import styles from "./Form.module.css";

function Form({ onSubmit, children }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
