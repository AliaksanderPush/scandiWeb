import React, { Component } from "react";
import { Query } from "react-apollo";
import { Spinner } from "..";
import ErrorBoundry from "../ErrorBoundry";
import { getProdDetails } from "../../graphql/querys";
import { Image } from "../UI/Image";
import ProdAttributes from "./ProdAttributes/ProdAttributes";
import { withRouter } from "react-router-dom";

import "./ProductDetails.css";

class ProductDetails extends Component {
  state = {
    mainImage: "",
  };

  handleClick = (src) => {
    this.setState({ mainImage: src });
  };

  render() {
    const { mainImage } = this.state;
    console.log("detailsProps>>", this.props);
    const id = this.props.match.params.id;

    return (
      <div>
        <Query query={getProdDetails(id)}>
          {({ loading, data, error }) => {
            if (loading) return <Spinner />;
            if (error) return <ErrorBoundry />;
            console.log("queryDetails>>", data.product);
            return (
              <div className="container_details">
                <div className="wrap_details">
                  <div className="images_details">
                    <div className="images_items">
                      {data?.product?.gallery.map((item, index) => {
                        return (
                          <div
                            className="image_item"
                            key={item + index}
                            onClick={() => this.handleClick(item)}
                          >
                            <Image src={item} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="image_main">
                      <Image
                        src={
                          mainImage.length
                            ? mainImage
                            : data?.product?.gallery[0]
                        }
                      />
                    </div>
                  </div>
                  <ProdAttributes
                    id={id}
                    brand={data?.product?.brand}
                    prices={data?.product?.prices}
                    name={data?.product?.name}
                    attributes={data?.product?.attributes}
                    description={data?.product?.description}
                  />
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default withRouter(ProductDetails);
