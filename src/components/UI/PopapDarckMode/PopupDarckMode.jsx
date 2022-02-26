import React from "react";
import styles from "./PopupDarckMode.module.css";

export const PopupDarckMode = ({ overlay, closeModalCart, children }) => {
  return (
    <>
      {overlay && (
        <div className={styles.overlay} onClick={closeModalCart}></div>
      )}
      <div className={styles.popup_container}>{children}</div>
    </>
  );
};
