import React, { Component } from "react";
import Layout from "./layout/Layout";
import { Switch, Route } from "react-router-dom";
import Category from "./components/Category";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path="/:category/" exact component={Category} />
            <Route path="/cart/" component={Cart} />
            <Route path="/category/:id" component={ProductDetails} />
            <Route />
          </Switch>
        </Layout>
      </>
    );
  }
}
export default App;
