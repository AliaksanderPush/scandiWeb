import React, { Component } from "react";
import { Query } from "react-apollo";
import { Spinner } from "../..";
import ErrorBoundry from "../../ErrorBoundry";
import { getProdDetails } from "../../../graphql/querys";
import Image from "../../UI/Image";
import ProdAttributes from "../ProdAttributes";
import { withRouter } from "react-router-dom";
import styles from "./ProdDetails.module.css";

class ProdDetails extends Component {
  state = {
    mainImage: "",
  };

  handleClick = (src) => {
    this.setState({ mainImage: src });
  };

  render() {
    const { mainImage } = this.state;
    const id = this.props.match.params.id;

    return (
      <div>
        <Query query={getProdDetails(id)}>
          {({ loading, data, error }) => {
            if (loading) return <Spinner />;
            if (error) return <ErrorBoundry />;
            return (
              <div className={styles.container_details}>
                <div className={styles.wrap_details}>
                  <div className={styles.images_details}>
                    <div className={styles.images_items}>
                      {data?.product?.gallery.map((item, index) => {
                        return (
                          <div
                            className={styles.image_item}
                            key={item + index}
                            onClick={() => this.handleClick(item)}
                          >
                            <Image src={item} />
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.image_main}>
                      <Image
                        onClick={this.handleClick}
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
                    inStock={data?.product?.inStock}
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
export default withRouter(ProdDetails);
