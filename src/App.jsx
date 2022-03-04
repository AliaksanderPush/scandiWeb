import React, { Component } from "react";
import Layout from "./layout/Layout";
import { Switch, Route } from "react-router-dom";
import ProdDetails from "./components/ProductDetails/ProdDetails";
import Category from "./pages/Category/Category";
import Cart from "./pages/Cart";
import { withRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.history.push("/all");
  }
  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path="/cart/" exact component={Cart} />
            <Route path="/category/:id"  component={ProdDetails} />
            <Route path="/:category/"  component={Category} />
            <Route />
          </Switch>
        </Layout>
      </>
    );
  }
}
export default withRouter(App);
