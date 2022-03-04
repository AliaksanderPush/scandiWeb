import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { getCategory } from "../../graphql/querys";
import { Spinner } from "../../components";
import ErrorBoundry from "../../components/ErrorBoundry/ErrorBoundry";
import Product from "../../components/Product";
import { Htag } from "../../components";
import styles from "./Category.module.css";

class Category extends Component {
  constructor(props) {
    super();
  }

  render() {
    const category = this.props.history.location.pathname.slice(1);
    const newCategory = category[0].toUpperCase() + category.slice(1);
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <Htag tag={"h1_title"}>{newCategory}</Htag>
        </div>
        <div className={styles.cards_container}>
          <Query query={getCategory(category)}>
            {({ loading, data, error }) => {
              if (loading) return <Spinner />;
              if (error) return <ErrorBoundry />;
              return (
                <Fragment>
                  {data?.category?.products.map((prod) => {
                    return <Product key={prod.id} info={prod} />;
                  })}
                </Fragment>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default Category;
