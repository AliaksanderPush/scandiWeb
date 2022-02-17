import React from "react";

import "./ProdAttrItem.css";

export const ProdAttrItem = ({ value, type, handleSelectedAttr, name }) => {
  let divClasses = ["size"];

  function isSelected() {
    if (divClasses.indexOf("black") === -1) {
      divClasses.push("black");
    } else {
      divClasses = divClasses.filter((item) => item !== "black");
    }
  }

  function colorValue(type, value) {
    if (type === "swatch")
      return {
        backgroundColor: value,
      };
  }

  return (
    <div
      className={divClasses.join()}
      style={colorValue(type, value)}
      onClick={() => handleSelectedAttr(value, type, name)}
      onClick={isSelected}
    >
      {type === "swatch" ? null : value}
    </div>
  );
};
export default ProdAttrItem;
