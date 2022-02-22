import React, { Component } from "react";
import { Image } from "../../UI/Image";
import { CartModalSwitch } from "../CartModalSwitchs/CartModalSwitch";
import styles from "./CartModalItem.module.css";

class CartModalItem extends Component {
  render() {
    const {
      brand,
      gallery,
      count,
      name,
      attributes,
      selectedAttr,
      cartCurrency,
      id,
      handleIncrement,
      handleDecrement,
    } = this.props;
    const { curr, symb } = cartCurrency;
    const price = curr.toFixed(2);
    return (
      <div className={styles.cart_modal_wrap}>
        <div className={styles.modal_attributes}>
          <div className={styles.modal_title}>
            <div className={styles.modal_brand}>
              <p>{brand}</p>
              <p>{name}</p>
            </div>
            <div className={styles.modal_price}>
              {symb}
              {price}
            </div>
          </div>
          <div className={styles.modal_size}>
            {attributes.length
              ? attributes.map((attr, index) => {
                  return (
                    <div key={attr.name + index} className={styles.modal_name}>
                      {attr.items.length
                        ? attr.items.map((item) => {
                            return (
                              <div key={item.value + index}>
                                <CartModalSwitch
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
        <div className={styles.modal_counts}>
          <div className={styles.count} onClick={() => handleIncrement(id)}>
            +
          </div>
          <div>{count}</div>
          <div className={styles.count} onClick={() => handleDecrement(id)}>
            -
          </div>
        </div>
        <div className={styles.modal_image}>
          <Image src={gallery} />
        </div>
      </div>
    );
  }
}
export default CartModalItem;
