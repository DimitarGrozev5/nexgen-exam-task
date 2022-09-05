import styles from "./Button.module.css";

function Button({
  type = "button",
  disabled = false,
  onClick,
  children: text,
}) {
  let button = (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
      type={type}
    >
      {text}
    </button>
  );

  if (type === "submit") {
    button = (
      <div className={styles["submit-wrapper"]}>
        <button
          onClick={onClick}
          disabled={disabled}
          className={styles.button}
          type={type}
        >
          {text}
        </button>
      </div>
    );
  }

  return button;
}

export default Button;
