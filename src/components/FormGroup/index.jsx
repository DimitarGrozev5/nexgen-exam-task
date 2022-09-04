import styles from "./FormGroup.module.css";

function FormGroup({ onSubmit, children }) {
  // TODO: Add group title
  return <div className={styles.group} onSubmit={onSubmit}>{children}</div>;
}

export default FormGroup;
