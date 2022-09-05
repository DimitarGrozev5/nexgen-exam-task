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
  onBlur,
}) {
  // Setup text input value and changeHandler
  const [text, setText] = useState("");
  const inputHandler = (event) => {
    setText(event.target.value);
  };

  // Function that takes the text from the text input and adds it to the list of emails
  const addNewEmail = () => {
    if (text.length === 0) {
      return;
    }

    const newEmail = text.replace(",", "").trim().toLowerCase();

    // If the email already exists in the list, remove it before adding it again
    const newList = value.filter((e) => e.toLowerCase() !== newEmail);
    onChange([...newList, newEmail]);
    setText("");
  };

  // Function that checks if the user has hit a specific key and then adds the new email to the list
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

  // Funtion that executes on blur
  const blurHandler = (event) => {
    addNewEmail();
    onBlur();
  };

  // Function that removes a specific email from the list
  const removeEmailHandler = (email) => () => {
    onChange(value.filter((e) => e !== email));
  };

  // Function that transforms the list of emails in to a list of Components
  const emailTextToComponent = (e) => {
    const emailStyles = new Style(styles);
    emailStyles.add("email__entered");

    // If the current email is invalid, add the *invalid* class to the Component
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
    <div>
      <Label label={label} error={errorMsg}></Label>
      <div className={styles["email-container"]}>
        {value.map(emailTextToComponent)}

        <input
          className={styles["email__input"]}
          name={name}
          value={text}
          onChange={inputHandler}
          onKeyDown={keyDownHandler}
          type="email"
          placeholder={placeholder}
          multiple
          onBlur={blurHandler}
        />
      </div>
    </div>
  );
}

export default MultipleEmail;
