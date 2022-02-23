import React, { Component } from "react";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { Spinner } from "../../components";
import ErrorBoundry from "../../components/ErrorBoundry";
import { cartDetails } from "../../graphql/querys";
import CartModalItem from "../../components/CartModal/CartModalList";
import styles from "./Cart.module.css";

class Cart extends Component {
  render() {
    const { prodAttr } = this.props;
    const selectedAttr = prodAttr.cart;
    console.log(prodAttr);
    return (
      <div className={styles.cart_container}>
        <h2 className={styles.title}>Cart</h2>
        {selectedAttr.length ? (
          selectedAttr.map((item) => {
            return (
              <Query key={item.id} query={cartDetails(item.id)}>
                {({ loading, data, error }) => {
                  if (loading) return <Spinner />;
                  if (error) return <ErrorBoundry />;
                  //console.log("CartDetails>>", data.product);
                  return (
                    <CartModalItem
                      name={data?.product?.name}
                      brand={data?.product?.brand}
                      gallery={data?.product?.gallery[0]}
                      attributes={data?.product?.attributes}
                      selectedAttr={item.attributes}
                      cartCurrency={item.selCurr}
                      count={item.count}
                      handleIncrement={this.handleIncrement}
                      handleDecrement={this.handleDecrement}
                      id={item.id}
                    />
                  );
                }}
              </Query>
            );
          })
        ) : (
          <div>Cart is empty</div>
        )}
        <div className={styles.total}>
          <p>Total</p>
          <p>50</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  prodAttr: state.cartReducer,
});

export default connect(mapStateToProps, null)(Cart);
