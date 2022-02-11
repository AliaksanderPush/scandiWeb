import React, { Component } from "react";
import { Query } from "react-apollo";
import { Spinner } from "..";
import ErrorBoundry from "../ErrorBoundry";
import { getProdDetails } from "../../graphql/querys";

import "./ProductDetails.css";

class ProductDetails extends Component {
  render() {
    const { ProdId } = this.props;
    return (
      <div>
        <Query query={getProdDetails(this.props.ProdId)}>
          {({ loading, data, error }) => {
            if (loading) return <Spinner />;
            if (error) return <ErrorBoundry />;
            console.log("queryDetails>>", data.product);
            return (
              <div className="spec_prod_box">
                {Object.entries(this.state.item_data).map(([k, v], key) => {
                  return (
                    <div
                      key={key}
                      id={this.props.overlay.OpenMiniCart ? "overlay" : "safe"}
                      className="spec_center_peace"
                    >
                      <div className="spec_img_box">
                        <div className="picture_buttons">
                          {v.gallery.map((x, key) => {
                            return (
                              <div
                                key={key}
                                onClick={() =>
                                  this.setState({ main_picture: x })
                                }
                                className="btn_pic"
                              >
                                <img src={x} alt={`${v.name}`} />
                              </div>
                            );
                          })}
                        </div>
                        <div className="spc_pic">
                          <img
                            src={
                              !this.state.main_picture.length
                                ? v.gallery[0]
                                : this.state.main_picture
                            }
                            alt="main_pic"
                          />
                        </div>
                      </div>
                      <div className="spec_info_box">
                        <div className="info_center_box">
                          <div className="title_box">
                            <h1>{v.brand}</h1>
                            <h3>{v.name}</h3>
                          </div>
                          <div className="categroy_det">
                            <Atributes
                              data={v.attributes}
                              prices={v.prices}
                              id={v.id}
                              inStock={v.inStock}
                              brand={v.brand}
                              gallery={v.gallery}
                              name={v.name}
                            />
                          </div>
                          <div className="description_spec">
                            {parse(v.description)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default ProductDetails;
