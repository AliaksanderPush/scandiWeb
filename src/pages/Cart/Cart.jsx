import React, { Component } from "react";
import { connect } from "react-redux";
import CartModal from "../../components/CartModal/CartModalList";
import styles from "./Cart.module.css";

class Cart extends Component {
  render() {
    return (
      <>
        <div className={styles.cart_container}>
          <h2 className={styles.title}>Cart</h2>
          <CartModal cart={true} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  prodAttr: state.cartReducer,
});

export default connect(mapStateToProps, null)(Cart);
