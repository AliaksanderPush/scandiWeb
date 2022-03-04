import React, { PureComponent } from "react";
import ReactHtmlParser from 'react-html-parser';
import DOMPurify from 'dompurify';
import { connect } from "react-redux";
import { selectCurrensy } from "../../../helpers/helpers";
import { addToCart } from "../../../redux/actions";
import ProdAttrList from "../ProdAttrList";
import { Button, Ptag, Htag } from "../..";
import styles from "./ProdAttributes.module.css";

class ProdAttributes extends PureComponent {
  state = {
    attributes: [],
    id: "",
    checkAllSelected: 0,
    inStock: false,
    showMessage: false,
    selectedCurrensy: selectCurrensy(this.props.prices, this.props.currency),
  };

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

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      const value = selectCurrensy(this.props.prices, this.props.currency);
      this.setState({
        selectedCurrensy: value,
      });
    }
  }

  handleAddToCart = () => {
    if (this.state.checkAllSelected === this.state.attributes.length) {
      const infoProd = {
        id: this.state.id,
        attributes: this.state.attributes,
        selCurr: this.state.selectedCurrensy,
        count: 1,
        price: this.state.selectedCurrensy.curr,
      };
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

 
  componentDidMount() {
    this.setState({ id: this.props.id });
    this.setState({ checkAllSelected: this.props.attributes.length });
    this.setState({ inStock: this.props.inStock });
  }

  render() {
    const { brand, name, attributes, description  } = this.props;
    const { curr, symb } = this.state.selectedCurrensy;
    const currency = curr.toFixed(2);
    const { inStock, showMessage } = this.state;
    const cleanHTML = DOMPurify.sanitize(description);
    return (
      <div className={styles.info_details}>
        <div className={styles.wrap_info_details}>
          <Htag tag={"h1_attr"}>{brand}</Htag>
          <Htag tag={"h2_attr"}>{name}</Htag>
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

          <div className={styles.price}>
            <Htag tag={"h3"}>Price:</Htag>
            <Htag tag={"h2_attr"}>
              {symb} {currency}
            </Htag>
            <Button
              disable={!inStock}
              size={"xl"}
              appearance="primary"
              onClick={this.handleAddToCart}
            >
              {!inStock ? "out of stock" : "add to cart"}
            </Button>
            {showMessage ? (
              <Ptag className={styles.show_message}>
                Please,choose all attributes
              </Ptag>
            ) : null}
          </div>
          <div className={styles.text_details}>
           {ReactHtmlParser(cleanHTML)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProdAttributes);
