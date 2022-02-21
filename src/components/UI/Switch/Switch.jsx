import React from "react";
import styles from "./Switch.module.css";
import cn from "classnames";

export const Switch = ({
  children,
  size,
  selected,
  className,
  appearance,
  ...props
}) => {
  return (
    <button
      className={cn(styles.size, className, {
        [styles.black]: appearance === "black",
        [styles.border]: appearance === "border",
        [styles.selected]: appearance === "selected",
        [styles.large]: size === "large",
        [styles.small]: size === "small",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
