import styles from "./Button.module.css";

function Button({ type = "button", children: text }) {
  let button = (
    <button className={styles.button} type={type}>
      {text}
    </button>
  );

  if (type === "submit") {
    button = (
      <div className={styles["submit-wrapper"]}>
        <button className={styles.button} type={type}>
          {text}
        </button>
      </div>
    );
  }

  return button;
}

export default Button;
