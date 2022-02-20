import React, { Component } from "react";
import Layout from "./layout/Layout";
import { Switch, Route } from "react-router-dom";
import ProdDetails from "./components/ProductDetails/ProdDetails";
import Category from "./components/Category";
import Cart from "./components/Cart";

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path="/:category/" exact component={Category} />
            <Route path="/cart/" component={Cart} />
            <Route path="/category/:id" component={ProdDetails} />
            <Route />
          </Switch>
        </Layout>
      </>
    );
  }
}
export default App;
