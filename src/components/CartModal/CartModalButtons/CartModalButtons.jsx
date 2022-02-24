import React  from "react";
import {Button} from '../../UI/Button/Button';
import { Link } from "react-router-dom";
import styles from './CartModalButtons.module.css'

export const CartModalButtons = ({summa, closeModalCart}) => {
	return (
		<>
		<div className={styles.total}>
		<p>Total</p>
		<p>{summa}</p>
	  </div>
	  <div className={styles.modal_btn}>
		<Link to={"/cart"}>
		  <Button
			appearance={"ghost"}
			size={"l"}
			onClick={closeModalCart}
		  >
			view bag
		  </Button>
		</Link>
		<Button appearance={"primary"} size={"l"}>
		  check out
		</Button>
	  </div>
	  </>

	);
}