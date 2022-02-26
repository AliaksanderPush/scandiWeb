import styles from "./Htag.module.css";

export const Htag = ({ tag, children }) => {
  switch (tag) {
    case "h1":
      return <h1 className={styles.h1}>{children}</h1>;
    case "h1_cart":
      return <h1 className={styles.h1_cart}>{children}</h1>;
    case "h1_title":
      return <h1 className={styles.h1_title}>{children}</h1>;
    case "h1_attr":
      return <h1 className={styles.h1_attr}>{children}</h1>;
    case "h2_attr":
      return <h2 className={styles.h2_attr}>{children}</h2>;
    case "h2_cart":
      return <h2 className={styles.h2_cart}>{children}</h2>;
    case "h3":
      return <h3 className={styles.h3}>{children}</h3>;
    case "h3_brand":
      return <h3 className={styles.h3_brand_and_name}>{children}</h3>;

    default:
      return <></>;
  }
};
