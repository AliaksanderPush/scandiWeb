import React from "react";
import styles from './Spiner.module.css'

export const Spinner = () => {
  return ( 
     <div className={styles.ring}>
        <span className={styles.span} ></span>
     </div>
  )
}
