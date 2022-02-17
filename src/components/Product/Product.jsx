import React, { Component } from "react";
import { CartIconWhite } from "..";
import { connect } from "react-redux";
import { selectCurrensy } from "../../helpers/helpers";
import { Link } from "react-router-dom";
import "./Product.css";

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
          className={`${"container_product"} ${
            !inStock && "out_stock_overlay"
          }`}
        >
          <div className="image_container">
            <img src={gallery[0]} alt={name} />
            {inStock ? (
              <div className="cart_icon">
                <CartIconWhite />
              </div>
            ) : (
              <p className="out_stock_text">OUT OF STOCK</p>
            )}
          </div>
          <h3 className="brand_and_name">
            {brand} {name}
          </h3>
          <p className="price">
            {curr.symb} {curr.curr}
          </p>
        </div>
      </Link>
    );
  }
}
const mapStateToProps = (state) => ({
  currency: state.priceReducer,
});

export default connect(mapStateToProps, null)(Product);
