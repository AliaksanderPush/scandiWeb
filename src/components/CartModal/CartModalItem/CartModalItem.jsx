import React, { Component } from "react";
import { Image } from "../../UI/Image";
import { CartModalSwitch } from "../CartModalSwitchs/CartModalSwitch";
import styles from "./CartModalItem.module.css";

class CartModalItem extends Component {
  checkAtributes = (selected, value) => {
    if (value.attributes === "Size") {
      const res = value.items.find(
        (item) => item.value === selected.attributes.value
      );
    }
  };

  render() {
    const { brand, gallery, name, attributes, selectedAttr } = this.props;
    console.log("props in Item atr>>", attributes);
    console.log("props in Item>>", selectedAttr);
    return (
      <div className={styles.cart_modal_wrap}>
        <div className={styles.modal_attributes}>
          <div className={styles.modal_brand}>
            <p>{brand}</p>
            <p>{name}</p>
          </div>
          <div className={styles.modal_price}>$50</div>
          <div className={styles.modal_size}>
            {attributes.length
              ? attributes.map((attr, index) => {
                  return (
                    <span key={attr.name + index}>
                      <span className={styles.modal_name}>{attr.name}</span>
                      {attr.items.length
                        ? attr.items.map((item) => {
                            return (
                              <CartModalSwitch
                                key={item.value + index}
                                selectedAttr={this.checkAtributes(
                                  selectedAttr,
                                  attributes
                                )}
                                value={item.value}
                                type={attr.type}
                              />
                            );
                          })
                        : null}
                    </span>
                  );
                })
              : null}
          </div>
        </div>
        <div className={styles.modal_counts}>
          <div className={styles.count}>+</div>
          <div>1</div>
          <div className={styles.count}>-</div>
        </div>
        <div className={styles.modal_image}>
          <Image src={gallery} />
        </div>
      </div>
    );
  }
}
export default CartModalItem;
