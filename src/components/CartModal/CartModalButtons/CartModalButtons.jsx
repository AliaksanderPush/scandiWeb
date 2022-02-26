import React from "react";
import { Button } from "../../UI/Button/Button";
import { Link } from "react-router-dom";
import { Ptag } from "../..";
import styles from "./CartModalButtons.module.css";

export const CartModalButtons = ({ summa, closeModalCart }) => {
  return (
    <>
      <div className={styles.total}>
        <Ptag size={"sx"}>Total</Ptag>
        <Ptag size={"sx"}>{summa}</Ptag>
      </div>
      <div className={styles.modal_btn}>
        <Link to={"/cart"}>
          <Button appearance={"ghost"} size={"l"} onClick={closeModalCart}>
            view bag
          </Button>
        </Link>
        <Button appearance={"primary"} size={"l"}>
          check out
        </Button>
      </div>
    </>
  );
};
