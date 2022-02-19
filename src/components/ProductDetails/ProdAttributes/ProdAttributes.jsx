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
      checkAllSelected: 0,
      inStock: false,
      showMessage: false,
    };
  }

  handleSelectedAttr = (valueAttr, typeAttr, nameAttr) => {
    const attr = this.state.attributes;
    const index = attr.findIndex((item) => item.name === nameAttr);
    if (index === -1) {
      const newAttr = {
        name: nameAttr,
        value: valueAttr,
        type: typeAttr,
      };
      this.setState(({ attributes }) => {
        const newProduct = [...attributes, newAttr];
        return { attributes: newProduct };
      });
    } else {
      this.setState(({ attributes }) => {
        const newSelectAttr = [...attributes];
        newSelectAttr[index].value = valueAttr;
        return { attributes: newSelectAttr };
      });
    }
  };

  handleAddToCart = () => {
    if (this.state.checkAllSelected === this.state.attributes.length) {
      const infoProd = { id: this.state.id, attributes: this.state.attributes };
      this.props.addAttrToCart(infoProd);
    } else {
      this.setState({ showMessage: true });
      this.showMessage();
    }
  };

  showMessage = () => {
    setTimeout(() => {
      this.setState({ showMessage: false });
    }, 2000);
  };

  renderMyProps() {
    return { __html: this.props.description };
  }

  componentDidMount() {
    this.setState({ id: this.props.id });
    this.setState({ checkAllSelected: this.props.attributes.length });
    this.setState({ inStock: this.props.inStock });
  }

  render() {
    const { brand, name, attributes, prices } = this.props;
    const { curr, symb } = selectCurrensy(prices, this.props.currency);
    const { inStock, showMessage } = this.state;
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
            <button
              disabled={!inStock}
              onClick={this.handleAddToCart}
              className={
                !inStock ? "add_to_cart_btn disabled" : "add_to_cart_btn"
              }
            >
              {!inStock ? "out of stock" : "add to cart"}
            </button>
            {showMessage ? (
              <p className="show_message">Please,choose all attributes</p>
            ) : null}
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
