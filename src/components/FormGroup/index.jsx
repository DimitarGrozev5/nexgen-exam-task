import styles from "./FormGroup.module.css";

function FormGroup({ onSubmit, children }) {
  return <div className={styles.group} onSubmit={onSubmit}>{children}</div>;
}

export default FormGroup;
