import styles from './FormGroup.module.css';

/**
 * FormGroup organizes it's child components in a single Card,
 * that provides default styling
 */
function FormGroup({ onSubmit, children }) {
  // TODO: Maybe add group title?
  return (
    <div className={styles.group} onSubmit={onSubmit}>
      {children}
    </div>
  );
}

export default FormGroup;
