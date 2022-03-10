import React, { PureComponent } from "react";
import CartModalItem from "../CartModalItem";
import { connect } from "react-redux";
import ErrorBoundry from "../../ErrorBoundry";
import { Spinner } from "../..";
import { Query } from "react-apollo";
import { getProdDetails } from "../../../graphql/querys";
import { incrementProd, decrementProd } from "../../../redux/actions";
import { CartModalButtons } from "../CartModalButtons/CartModalButtons";
import { Htag } from "../..";
import styles from "./CartModal.module.css";

class CartModal extends PureComponent {
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
    const { prodAttr, cart } = this.props;
    const selectedAttr = prodAttr.cart;
    const summa = this.getTotalSumm();
   
    return (
      <div
        className={cart ? styles.cart_container : styles.cart_modal_container}
      >
        {cart ? <hr /> : null}
        <div className={cart ? styles.cart_content : styles.cart_modal_content}>
          {!cart ? (
            <Htag tag={"h1"}>
              My Bag, <span>{selectedAttr.length}items</span>
            </Htag>
          ) : null}

          {selectedAttr.length ? (
            selectedAttr.map((item) => {
              return (
                <Query key={item.id} query={getProdDetails(item.id)}>
                  {({ loading, data, error }) => {
                    if (loading) return <Spinner />;
                    if (error) return <ErrorBoundry />;
                    return (
                      <CartModalItem
                        cart={cart ? true : false}
                        name={data?.product?.name}
                        brand={data?.product?.brand}
                        gallery={data?.product?.gallery}
                        attributes={data?.product?.attributes}
                        prices={data?.product?.prices}
                        selectedAttr={item.attributes}
                        cartCurrency={item.selCurr}
                        selCurr = {item.selCurr}
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

          {!cart ? (
            <CartModalButtons
              summa={summa}
              closeModalCart={this.props.closeModalCart}
            />
          ) : null}
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
