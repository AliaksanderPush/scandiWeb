import React, { Component } from "react";
import { CartIconWhite } from "..";
import { connect } from "react-redux";
import { selectCurrensy } from "../../helpers/helpers";
import { Link } from "react-router-dom";
import { Htag, Ptag } from "..";
import styles from "./Product.module.css";

class Product extends Component {
  state = {
    curr: selectCurrensy(this.props.info.prices, this.props.currency),
  };

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      const value = selectCurrensy(this.props.info.prices, this.props.currency);
      this.setState({
        curr: value,
      });
    }
  }

  render() {
    const { id, name, brand, gallery, inStock } = this.props.info;
    const { curr } = this.state;

    return (
      <Link
        to={{
          pathname: `/category/${id}`,
          propsSearch: { currency: curr.curr, symbol: curr.symb },
        }}
      >
        <div
          className={`${styles.container_product} ${
            !inStock && styles.out_stock_overlay
          }`}
        >
          <div className={styles.image_container}>
            <img src={gallery[0]} alt={name} />
            {inStock ? (
              <div className={styles.cart_icon}>
                <CartIconWhite />
              </div>
            ) : (
              <Ptag className={styles.out_stock_text}>OUT OF STOCK</Ptag>
            )}
          </div>
          <Htag tag={"h3_brand"}>
            {brand} {name}
          </Htag>
          <Ptag size={"mx"} className={styles.price}>
            {curr.symb} {curr.curr}
          </Ptag>
        </div>
      </Link>
    );
  }
}
const mapStateToProps = (state) => ({
  currency: state.priceReducer,
});

export default connect(mapStateToProps, null)(Product);
