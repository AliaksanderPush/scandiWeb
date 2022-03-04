import React, { PureComponent } from "react";
import Image from "../../UI/Image";
import { CartModalSwitch } from "../CartModalSwitchs/CartModalSwitch";
import { Ptag } from "../..";
import { selectCurrensy } from "../../../helpers/helpers";
import { connect } from "react-redux";
import { productLoaded } from "../../../redux/actions";
import styles from "./CartModalItem.module.css";

class CartModalItem extends PureComponent {
  state = {
    index: 0,
    selectedCurrensy: selectCurrensy(this.props.prices, this.props.currency),
  };

  nextHandler = () => {
    if (this.state.index < this.props.gallery.length - 1)
      this.setState((state) => ({ index: state.index + 1 }));
  };

  prevHandler = () => {
    if (this.state.index > 0)
      this.setState((state) => ({ index: state.index - 1 }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      const value = selectCurrensy(this.props.prices, this.props.currency);
      this.setState({
        selectedCurrensy: value,
      });
    }
  }

  currensyUpdate = () => {
    const { curr } = this.state.selectedCurrensy;
    const count = this.props.count;
    const res = curr * count;
    this.props.currUpdate(this.props.id, res);
    return res.toFixed(2);
  };

  render() {
    const {
      brand,
      gallery,
      count,
      name,
      attributes,
      selectedAttr,
      id,
      handleIncrement,
      handleDecrement,
      cart,
    } = this.props;
    const { symb } = this.state.selectedCurrensy;
    const price = this.currensyUpdate();
    console.log("cartItem", this.currensyUpdate());
    return (
      <>
        <div className={cart ? styles.cart_wrap : styles.cart_modal_wrap}>
          <div
            className={
              cart
                ? `${styles.modal_attributes} ${styles.cart_attributes}`
                : styles.modal_attributes
            }
          >
            <div className={cart ? styles.cart_title : styles.modal_title}>
              <div className={cart ? styles.cart_brand : styles.modal_brand}>
                <Ptag size={cart ? "l" : "s"}>{brand}</Ptag>
                <Ptag size={cart ? "m" : "s"}>{name}</Ptag>
              </div>
              <div className={cart ? styles.cart_price : styles.modal_price}>
                {symb}
                {price}
              </div>
            </div>
            <div className={styles.modal_size}>
              {attributes.length
                ? attributes.map((attr, index) => {
                    return (
                      <div
                        key={attr.name + index}
                        className={
                          cart
                            ? `${styles.modal_name} ${styles.cart_name}`
                            : styles.modal_name
                        }
                      >
                        {attr.items.length
                          ? attr.items.map((item) => {
                              return (
                                <div key={item.value + index}>
                                  <CartModalSwitch
                                    cart={cart ? true : false}
                                    value={item.value}
                                    type={attr.type}
                                    name={attr.name}
                                    selectedAttr={selectedAttr}
                                  />
                                </div>
                              );
                            })
                          : null}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>

          <div className={styles.wrapper_cart}>
            <div
              className={
                cart
                  ? `${styles.modal_counts} ${styles.cart_counts}`
                  : styles.modal_counts
              }
            >
              <div
                className={
                  cart ? `${styles.count} ${styles.cart_count}` : styles.count
                }
                onClick={() => handleIncrement(id)}
              >
                +
              </div>
              <div>{count}</div>
              <div
                className={
                  cart ? `${styles.count} ${styles.cart_count}` : styles.count
                }
                onClick={() => handleDecrement(id)}
              >
                -
              </div>
            </div>
            <div className={cart ? styles.cart_image : styles.modal_image}>
              <Image
                src={gallery[this.state.index]}
                cart={cart ? true : false}
                prevHandler={cart ? this.prevHandler : null}
                nextHandler={cart ? this.nextHandler : null}
              />
            </div>
          </div>
        </div>
        {cart ? <hr /> : null}
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  currUpdate: (id, coast) => dispatch(productLoaded(id, coast)),
});

const mapStateToProps = (state) => ({
  currency: state.priceReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartModalItem);
