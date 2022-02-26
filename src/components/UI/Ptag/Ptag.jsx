import styles from "./Ptag.module.css";
import cn from "classnames";

export const Ptag = ({ size = "m", children, className, ...props }) => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.s]: size === "s",
        [styles.m]: size === "m",
        [styles.mx]: size === "mx",
        [styles.l]: size === "l",
        [styles.sx]: size === "sx",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
