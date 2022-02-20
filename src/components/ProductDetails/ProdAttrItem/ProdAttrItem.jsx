import React from "react";
import { Switch } from "../../";

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
    <Switch
      appearance={classes}
      size={"large"}
      style={onColorValue(type, value)}
      onClick={() => {
        onSelectBox();
        handleSelectedAttr(value, type, name);
      }}
    >
      {type === "swatch" ? null : value}
    </Switch>
  );
};
export default ProdAttrItem;
