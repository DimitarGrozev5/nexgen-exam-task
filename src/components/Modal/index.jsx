import ReactDOM from "react-dom";
import Button from "../Button";

import styles from "./Modal.module.css";

function Modal({ title, message, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <header>{title}</header>
        <main>{message}</main>
        <footer>
          <Button onClick={onClose}>OK</Button>
        </footer>
      </div>
    </>,
    document.getElementById("root-free")
  );
}

export default Modal;
