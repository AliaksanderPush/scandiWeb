import React, { Component } from "react";
import { connect } from "react-redux";
import { selectCurrensy } from "../../../helpers/helpers";
import ProdAttrList from "./ProdAttrList";

class ProdAtributes extends Component {
  state = {
    attributes: [],
  };

  handleSelectedAttr(value, type, name) {
    // this.setState(...this.state.attributes, { value, type, name });
    // console.log("Значение>", this.state.attributes);
    console.log("name", name);
  }

  render() {
    const { brand, name, attributes, prices, description } = this.props;

    const { curr, symb } = selectCurrensy(prices, this.props.currency);
    return (
      <div className="info_details">
        <div className="wrap_info_details">
          <h1>{brand}</h1>
          <h2>{name}</h2>
          {attributes.length
            ? attributes.map((attr) => {
                return (
                  <ProdAttrList
                    key={attr.name}
                    handleSelectedAttr={this.handleSelectedAttr}
                    name={attr.name}
                    {...attr}
                  />
                );
              })
            : null}

          <div className="price">
            <h3>Price:</h3>
            <h2>
              {symb} {curr}
            </h2>
            <button>add to cart</button>
          </div>
          <div className="text_details">
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.priceReducer,
});

export default connect(mapStateToProps, null)(ProdAtributes);
