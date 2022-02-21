import React, { Component } from "react";
import CartModalItem from "../CartModalItem";
import { connect } from "react-redux";
import ErrorBoundry from "../../ErrorBoundry";
import { Spinner } from "../..";
import { Query } from "react-apollo";
import { getProdDetails } from "../../../graphql/querys";
import { Button } from "../..";
import styles from "./CartModal.module.css";

class CartModal extends Component {
  getTotalSumm = () => {
    const arr = this.props.prodAttr.cart;

    let summ = arr.reduce((acc, it) => acc + it.selCurr.curr, 0);
    return summ;
  };

  render() {
    const { prodAttr } = this.props;
    const selectedAttr = prodAttr.cart;
    console.log(this.getTotalSumm());
    return (
      <div className={styles.cart_modal_container}>
        <div className={styles.cart_modal_content}>
          <h1>
            My Bag, <span>{selectedAttr.length} items</span>{" "}
          </h1>

          {selectedAttr.length ? (
            selectedAttr.map((item) => {
              return (
                <Query key={item.id} query={getProdDetails(item.id)}>
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
            <p>{this.getTotalSumm()}</p>
          </div>
          <div className={styles.modal_btn}>
            <Button appearance={"ghost"} size={"l"}>
              view bag
            </Button>
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

export default connect(mapStateToProps, null)(CartModal);
