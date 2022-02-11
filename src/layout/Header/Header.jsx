import React, { Component } from "react";
import { Logo, CartIcon } from "../../components";
import { NavLink } from "react-router-dom";
import { Query } from "react-apollo";
import { MENU_CATEGORIES, GET_CURRENCIES } from "../../graphql/querys";
import { Spinner } from "../../components";
import ErrorBoundry from "../../components/ErrorBoundry";
import { connect } from "react-redux";
import { currencyLoaded } from "../../redux/actions";
import "./Header.css";

class Header extends Component {
  state = {
    value: "",
  };
  handleChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.currencyList(e.target.value);
  };

  render() {
    const { value } = this.state;
    return (
      <div className="outer_header">
        <div className="inner_header">
          <div>
            <div className="cat_selectors">
              <ul className="cat_menu">
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
          </div>
          <div className="logo_box">
            <div className="logo">
              <Logo />
            </div>
          </div>
          <div className="cart_menu">
            <div className="arrow_menu">
              <select name="select" value={value} onChange={this.handleChange}>
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
            <div className="cart">
              <CartIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencyList: (value) => dispatch(currencyLoaded(value)),
});

export default connect(null, mapDispatchToProps)(Header);
