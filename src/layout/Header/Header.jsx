import React, { Component } from "react";
import { Logo, CartIcon } from "../../components";
import { NavLink } from "react-router-dom";
import { Query } from "react-apollo";
import { MENU_CATEGORIES, GET_CURRENCIES } from "../../graphql/querys";
import { Spinner } from "../../components";
import ErrorBoundry from "../../components/ErrorBoundry";
import { connect } from "react-redux";
import { currencyLoaded } from "../../redux/actions";
import CartModal from "../../components/CartModal/CartModalList";
import styles from "./Header.module.css";

class Header extends Component {
  state = {
    value: "",
    showMadalCart: false,
  };
  handleChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.currencyList(e.target.value);
  };

  handleShowModal = () => {
    this.setState({ showMadalCart: !this.state.showMadalCart });
  };

  render() {
    const { value, showMadalCart } = this.state;
    const { prodAttr } = this.props;
    const selectedAttr = prodAttr.cart;
    return (
      <div className={styles.outer_header}>
        <div className={styles.inner_header}>
          <div className={styles.cat_selectors}>
            <ul className={styles.cat_menu}>
              <Query query={MENU_CATEGORIES}>
                {({ loading, data, error }) => {
                  if (loading) return <Spinner />;
                  if (error) return <ErrorBoundry />;
                  return data?.categories.map((cat) => {
                    return (
                      <li key={cat.name}>
                        <NavLink
                          className={styles.nav_linck}
                          to={`/${cat.name}`}
                        >
                          {cat.name.toUpperCase()}
                        </NavLink>
                      </li>
                    );
                  });
                }}
              </Query>
            </ul>
          </div>
          <div className={styles.logo_box}>
            <div className={styles.logo}>
              <Logo />
            </div>
          </div>
          <div className={styles.cart_menu}>
            <div className={styles.arrow_menu}>
              <select
                name={styles.select}
                value={value}
                onChange={this.handleChange}
              >
                <Query query={GET_CURRENCIES}>
                  {({ loading, data, error }) => {
                    if (loading) return "Loading...";
                    if (error) return "Error";
                    return data?.currencies.map((curr) => {
                      return (
                        <option key={curr.label} value={curr.label}>
                          {curr.symbol} {curr.label}
                        </option>
                      );
                    });
                  }}
                </Query>
              </select>
            </div>
            <div className={styles.cart} onClick={this.handleShowModal}>
              <CartIcon />
              {selectedAttr.length > 0 ? (
                <div className={styles.product_count}>
                  {selectedAttr.length}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {showMadalCart ? <CartModal /> : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencyList: (value) => dispatch(currencyLoaded(value)),
});
const mapStateToProps = (state) => ({
  prodAttr: state.cartReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
