import React, { Component } from "react";
import { connect } from "react-redux";
import { selectCurrensy } from "../../../helpers/helpers";
import { addToCart } from "../../../redux/actions";
import ProdAttrList from "./ProdAttrList";

class ProdAtributes extends Component {
  constructor(props) {
    super();
    this.state = {
      attributes: [],
      id: "",
    };
  }

  handleSelectedAttr = (valueAttr, typeAttr, nameAttr) => {
    console.log("Priletelo>>", nameAttr, valueAttr, typeAttr);
    const newAttr = {
      name: nameAttr,
      value: valueAttr,
      type: typeAttr,
    };

    this.setState(({ attributes }) => {
      const newProduct = [...attributes, newAttr];
      return { attributes: newProduct };
    });
  };

  handleAddToCart = () => {
    this.props.addAttrToCart(this.state.id);
  };

  renderMyProps() {
    return { __html: this.props.description };
  }

  componentDidMount() {
    this.setState({ id: this.props.id });
  }

  render() {
    const { brand, name, attributes, prices } = this.props;
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
            <button onClick={this.handleAddToCart}>add to cart</button>
          </div>
          <div className="text_details">
            <div dangerouslySetInnerHTML={this.renderMyProps()} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.priceReducer,
});
const mapDispatchToProps = (dispatch) => ({
  addAttrToCart: (value) => dispatch(addToCart(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProdAtributes);
