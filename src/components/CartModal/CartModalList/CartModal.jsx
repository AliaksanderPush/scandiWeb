import React, { Component } from "react";
import CartModalItem from "../CartModalItem";
import { connect } from "react-redux";
import ErrorBoundry from "../../ErrorBoundry";
import { Spinner } from "../..";
import { Query } from "react-apollo";
import { cartDetails } from "../../../graphql/querys";
import { Button } from "../..";
import { incrementProd, decrementProd } from "../../../redux/actions";
import { Link } from "react-router-dom";
import styles from "./CartModal.module.css";

class CartModal extends Component {
  constructor(props) {
    super();
  }
  getTotalSumm = () => {
    const arr = this.props.prodAttr.cart;
    let summ = arr.reduce((acc, it) => acc + it.selCurr.curr, 0);
    return summ.toFixed(2);
  };
  handleIncrement = (id) => {
    this.props.incProd(id);
  };

  handleDecrement = (id) => {
    this.props.decProd(id);
  };

  render() {
    const { prodAttr } = this.props;
    const selectedAttr = prodAttr.cart;
    const summa = this.getTotalSumm();

    return (
      <div className={styles.cart_modal_container}>
        <div className={styles.cart_modal_content}>
          <h1>
           My Bag, <span>{selectedAttr.length}items</span> 
          </h1>

          {selectedAttr.length ? (
            selectedAttr.map((item) => {
              return (
            
                  <Query key={item.id} query={cartDetails(item.id)}>
                    {({ loading, data, error }) => {
                      if (loading) return <Spinner/>;
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
            <p>{summa}</p>
          </div>
          <div className={styles.modal_btn}>
            <Link to={"/cart"}>
              <Button
                appearance={"ghost"}
                size={"l"}
                onClick={this.props.closeModalCart}
              >
                view bag
              </Button>
            </Link>
            <Button appearance={"primary"} size={"l"}>
              check out
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  prodAttr: state.cartReducer,
});
const mapDispatchToProps = (dispatch) => ({
  incProd: (prodId) => dispatch(incrementProd(prodId)),
  decProd: (prodId) => dispatch(decrementProd(prodId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
