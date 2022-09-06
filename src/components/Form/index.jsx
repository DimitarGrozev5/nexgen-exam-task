import { useFormData } from "../../hooks/useForm";
import { FormContext } from "./form-context";
import styles from "./Form.module.css";

/**
 * Form Component is used to wrap Input Components in an html form
 * The Component also wraps it's child elements in a Form Context, this
 * way the child components know they are in a Form and can allow the
 * form to control them
 */

function Form({ id, onSubmit, children }) {
  // Use formData, to get access to the state of the form - isValid and getVals
  const formData = useFormData(id);

  // Submit handler checks if all fields are valid and if so, trgiggers the passed onSubmit function
  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(formData.isValid());
    // console.log(formData.getVals());

    if (formData.isValid() && onSubmit) {
      onSubmit(formData.getVals());
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <FormContext.Provider value={id}>{children}</FormContext.Provider>
    </form>
  );
}

export default Form;
