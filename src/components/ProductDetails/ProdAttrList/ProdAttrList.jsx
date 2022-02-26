import React, { Component } from "react";
import { Htag } from "../..";
import ProdAttrItem from "../ProdAttrItem";
import styles from "./ProdAttrList.module.css";

class ProdAttrList extends Component {
  state = {
    selectedOtherBox: false,
    selectedSwatchBox: false,
    item: "",
  };

  onSelectBox = (item, type) => {
    this.setState({
      item: item,
    });
    if (type !== "swatch") {
      this.setState({
        selectedOtherBox: true,
      });
    } else {
      this.setState({
        selectedSwatchBox: true,
      });
    }
  };

  onSelectBoxCheck = (item) => {
    if (this.state.selectedOtherBox && this.state.item === item) {
      return "black";
    } else if (this.state.selectedSwatchBox && this.state.item === item) {
      return "border";
    } else {
      return "size";
    }
  };

  render() {
    const { items, name, type, handleSelectedAttr } = this.props;

    return (
      <>
        <Htag tag={"h3"}>{name}</Htag>
        <div className={styles.sizes_details}>
          {items.length
            ? items.map((item, index) => {
                return (
                  <ProdAttrItem
                    key={item.value + index}
                    value={item.value}
                    handleSelectedAttr={handleSelectedAttr}
                    type={type}
                    name={name}
                    item={item}
                    classes={this.onSelectBoxCheck(item, type)}
                    onSelectBox={() => this.onSelectBox(item, type)}
                  />
                );
              })
            : null}
        </div>
      </>
    );
  }
}
export default ProdAttrList;
