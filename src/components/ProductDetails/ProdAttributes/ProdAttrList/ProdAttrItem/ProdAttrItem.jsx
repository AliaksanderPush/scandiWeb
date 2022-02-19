import React from "react";

import "./ProdAttrItem.css";

export const ProdAttrItem = ({
  value,
  type,
  handleSelectedAttr,
  name,
  classes,
  onSelectBox,
}) => {
  function onColorValue(type, value) {
    if (type === "swatch")
      return {
        backgroundColor: value,
      };
  }

  return (
    <div
      className={classes}
      style={onColorValue(type, value)}
      onClick={() => {
        onSelectBox();
        handleSelectedAttr(value, type, name);
      }}
    >
      {type === "swatch" ? null : value}
    </div>
  );
};
export default ProdAttrItem;
