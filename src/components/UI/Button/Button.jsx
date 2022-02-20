import React from "react";
import styles from "./Button.module.css";
import cn from "classnames";

export const Button = ({
  appearance,
  size,
  children,
  className,
  disable,
  ...props
}) => {
  return (
    <button
      disabled={disable}
      className={cn(styles.button, className, {
        [styles.primary]: appearance === "primary",
        [styles.ghost]: appearance === "ghost",
        [styles.disabled]: disable === true,
        [styles.xl]: size === "xl",
        [styles.l]: size === "l",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
