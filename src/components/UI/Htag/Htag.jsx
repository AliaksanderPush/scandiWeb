import styles from "./Htag.module.css";

export const Htag = ({ tag, children }) => {
  switch (tag) {
    case "h1":
      return <h1 className={styles.h1}>{children}</h1>;
    case "h1_cart":
      return <h1 className={styles.h1_cart}>{children}</h1>;
    case "h2":
      return <h2 className={styles.h2}>{children}</h2>;
    case "h2_cart":
      return <h2 className={styles.h2_cart}>{children}</h2>;

    default:
      return <></>;
  }
};
