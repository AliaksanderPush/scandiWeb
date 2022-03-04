import React, { PureComponent } from "react";
import { Logo, CartIcon } from "../../components";
import { NavLink } from "react-router-dom";
import { Query } from "react-apollo";
import { MENU_CATEGORIES } from "../../graphql/querys";
import { Spinner } from "../../components";
import ErrorBoundry from "../../components/ErrorBoundry";
import { connect } from "react-redux";
import { currencyLoaded } from "../../redux/actions";
import CartModal from "../../components/CartModal/CartModalList";
import { DropCurrMenu } from "../../components/DropCurrMenu/DropCurrMenu";
import { PopupDarckMode } from "../../components";
import styles from "./Header.module.css";

class Header extends PureComponent {
  state = {
    element: null,
    elemTitle: null,
    showMadalCart: false,
  };

  handleShowModal = () => {
    this.setState({ showMadalCart: !this.state.showMadalCart });
  };

  handleDropMenu = (e) => {
    const selectSingle = e.target.parentElement;
    this.setState({ element: selectSingle, elemTitle: e.target });
    if ("active" === selectSingle.getAttribute("data-state")) {
      selectSingle.setAttribute("data-state", "");
    } else {
      selectSingle.setAttribute("data-state", "active");
    }
  };

  handleLabelValue = (e) => {
    const selectSingle_label = e.target;
    let elem = this.state.elemTitle;
    elem.textContent = selectSingle_label.textContent;
    this.state.element.setAttribute("data-state", "");
    const label = elem.textContent.split(" ")[1];
    this.props.currencyList(label);
    this.setState({ element: null });
  };

  render() {
    const { showMadalCart } = this.state;
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
                        <NavLink to={`/${cat.name}`}>
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
              <DropCurrMenu
                handleDropMenu={this.handleDropMenu}
                handleLabelValue={this.handleLabelValue}
              />
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
        {showMadalCart ? (
          <PopupDarckMode closeModalCart={this.handleShowModal} overlay>
            <CartModal closeModalCart={this.handleShowModal} />
          </PopupDarckMode>
        ) : null}
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
