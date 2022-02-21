import React from "react";
import { Switch } from "../..";

export const CartModalSwitch = ({ value, type, selectedAttr }) => {
  console.log("find", selectedAttr);
  function onColorValue(type, value) {
    if (type === "swatch")
      return {
        backgroundColor: value,
      };
  }
  console.log("type", type);
  return (
    <Switch size={"small"} style={onColorValue(type, value)}>
      {type === "swatch" ? null : value.slice(0,3)}
    </Switch>
  );
};
