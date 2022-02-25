import React, { Component } from "react";
import styles from "./Image.module.css";
import cn from "classnames";

export default class Image extends Component {
  constructor(props) {
    super();
  }

  render() {
    const { src, cart, classes, className, prevHandler, nextHandler } =
      this.props;

    return (
      <>
        <img
          src={src}
          className={cn(styles.image, className, {
            [styles.cart_image]: classes === "cart_image",
          })}
          alt="foto"
        />
        {cart ? (
          <div className={styles.cart_arrows}>
            <div className={styles.cart_arrow} onClick={prevHandler}>
              &#706;
            </div>
            <div className={styles.cart_arrow} onClick={nextHandler}>
              &#707;
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
