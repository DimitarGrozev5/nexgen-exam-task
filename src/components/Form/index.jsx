import { useFormData } from "../../hooks/form-hook";
import { FormContext } from "./form-context";
import styles from "./Form.module.css";

function Form({ id, onSubmit, children }) {
  const formData = useFormData(id);
  const formOnSubmit = (event) => {
    event.preventDefault();
    console.log(formData.isValid());
    console.log(formData.getVals());
  };

  return (
    <form className={styles.form} onSubmit={formOnSubmit}>
      <FormContext.Provider value={id}>{children}</FormContext.Provider>
    </form>
  );
}

export default Form;
