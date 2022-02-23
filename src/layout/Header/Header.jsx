import React, { Component } from "react";
import { Logo, CartIcon } from "../../components";
import { NavLink } from "react-router-dom";
import { Query } from "react-apollo";
import { MENU_CATEGORIES } from "../../graphql/querys";
import { Spinner } from "../../components";
import ErrorBoundry from "../../components/ErrorBoundry";
import { connect } from "react-redux";
import { currencyLoaded } from "../../redux/actions";
import CartModal from "../../components/CartModal/CartModalList";
import Currensy from "../Currency/Currency";
import styles from "./Header.module.css";

class Header extends Component {
 constructor(props) {
   super()
 this.state = {
    value: "",
    showMadalCart: false,
  };
   this.myRef = React.createRef();
 }
  


  handleChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.currencyList(e.target.value);
  };

  handleShowModal = () => {
    this.setState({ showMadalCart: !this.state.showMadalCart });
  };
  
  
  handleChangeInput =(e) => {
    console.log(e.target.value)
    this.setState({ value: e.target.value });
    /*
// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    console.log(selectSingle_title.textContent)
    selectSingle.setAttribute('data-state', '');
  });
}
*/


  }


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
              <Currensy
                


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
