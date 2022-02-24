import React, { Component } from "react";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { Spinner } from "../../components";
import ErrorBoundry from "../../components/ErrorBoundry";
import { cartDetails } from "../../graphql/querys";
import CartModal from '../../components/CartModal/CartModalList';
import styles from "./Cart.module.css";

class Cart extends Component {
  render() {
    const { prodAttr } = this.props;
    const selectedAttr = prodAttr.cart;
    console.log(prodAttr);
    return (
        <>
       <div className={styles.cart_container}>
         <h2 className={styles.title}>Cart</h2>
         <CartModal flag={true} />
       </div>
        </>  
     );
  }
}

const mapStateToProps = (state) => ({
  prodAttr: state.cartReducer,
});

export default connect(mapStateToProps, null)(Cart);
