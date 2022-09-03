import { FormContext } from "./form-context";
import styles from "./Form.module.css";

function Form({ id, onSubmit, children }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <FormContext.Provider value={id}>{children}</FormContext.Provider>
    </form>
  );
}

export default Form;
