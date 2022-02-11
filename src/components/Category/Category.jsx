import React, { Component } from "react";
import { Query } from "react-apollo";
import { getCategory } from "../../graphql/querys";
import { Spinner } from "..";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import Product from "../Product";
import "./Category.css";

class Category extends Component {
  constructor(props) {
    super();
  }

  render() {
    const category = this.props.history.location.pathname.slice(1);
    const newCategory = category[0].toUpperCase() + category.slice(1);
    return (
      <div className="container">
        <div className="title">
          <h1>{newCategory}</h1>
        </div>
        <div className="cards_container">
          <Query query={getCategory(category)}>
            {({ loading, data, error }) => {
              if (loading) return <Spinner />;
              if (!!error) return <ErrorBoundry />;
              console.log("query>>", data.category.products);
              return data?.category?.products.map((prod) => {
                return <Product key={prod.id} info={prod} />;
              });
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default Category;
