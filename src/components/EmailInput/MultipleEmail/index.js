import styles from "./EmailInput.module.css";
import Label from "../../Label";
import { useState } from "react";
import { Style } from "../../../util/styles";

function MultipleEmail({
  label,
  name,
  errorMsg = "",

  placeholder,

  value,
  onChange,
}) {
  const [text, setText] = useState("");
  const inputHandler = (event) => {
    setText(event.target.value);
  };

  const addNewEmail = () => {
    const newEmail = text.replace(",", "").trim().toLowerCase();
    if (newEmail.length === 0) {
      return;
    }

    const newList = value.filter((e) => e.toLowerCase() !== newEmail);
    onChange([...newList, newEmail]);
    setText("");
  };
  const keyDownHandler = (event) => {
    if (
      event.code === "Space" ||
      event.code === "Enter" ||
      event.code === "Tab" ||
      event.code === "Comma"
    ) {
      event.preventDefault();
      addNewEmail();
    }
  };

  const removeEmailHandler = (email) => () => {
    onChange(value.filter((e) => e !== email));
  };

  const enteredEmail = (e) => {
    const emailStyles = new Style(styles);
    emailStyles.add("email__entered");

    if (!/^.+@.+\..+$/.test(e)) {
      emailStyles.add("email__entered-invalid");
    }
    // TODO: change the container style if the errorMsg is not empty

    return (
      <div className={emailStyles.className} key={e}>
        {e}
        <button
          onClick={removeEmailHandler(e)}
          type="button"
          className={styles["email__remove-btn"]}
        >
          X
        </button>
      </div>
    );
  };

  return (
    <>
      <Label label={label} error={errorMsg}></Label>
      <div className={styles["email-container"]}>
        {value.map(enteredEmail)}

        <input
          className={styles["email__input"]}
          name={name}
          value={text}
          onChange={inputHandler}
          onKeyDown={keyDownHandler}
          type="email"
          placeholder={placeholder}
          multiple
          onBlur={addNewEmail}
        />
      </div>
    </>
  );
}

export default MultipleEmail;
