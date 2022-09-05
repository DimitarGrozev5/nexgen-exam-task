import { useState } from "react";

import { Style } from "../../../util/styles";
import Button from "../../Button";
import styles from "./Dragable.module.css";

function Dragable({ fileChangeHandler, fileError, openFileDialog }) {
  // Set up hover state, to change the styling of the Input when a user is dragging a file over
  const [hover, setHover] = useState(false);

  // A bunch of handlers for receiving a drag and drop file
  const dragInHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHover(true);
  };

  const dragOutHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHover(false);
  };

  const dragHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const dropHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fileChangeHandler(event.dataTransfer.files);
    setHover(false);
  };

  // Seting up drop area styles
  const dropAreaStyles = new Style(styles);
  dropAreaStyles.add("drop-area");
  if (hover) {
    dropAreaStyles.add("active");
  }

  return (
    <>
      <div
        className={dropAreaStyles.className}
        onDragEnter={dragInHandler}
        onDragLeave={dragOutHandler}
        onDragOver={dragHandler}
        onDrop={dropHandler}
        onClick={openFileDialog}
      >
        {fileError && <span className={styles["error-msg"]}>{fileError}</span>}
        {!fileError && "Drop a file or click to open a dialog"}
      </div>
      <div className={styles.button}>
        <Button onClick={openFileDialog}>Add file</Button>
      </div>
    </>
  );
}
export default Dragable;
