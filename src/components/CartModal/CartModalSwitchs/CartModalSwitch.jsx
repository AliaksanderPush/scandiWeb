import React from "react";
import { Switch } from "../..";

export const CartModalSwitch = ({ value, name, type, selectedAttr }) => {
  const checkAtributes = () => {
    const res = selectedAttr.some(
      (item) => item.value === value && item.name === name
    );
    if (res) {
      if (type === "text" && res) {
        return "selected";
      } else {
        return "border";
      }
    } else {
      return res;
    }
  };

  function onColorValue() {
    if (type === "swatch")
      return {
        backgroundColor: value,
      };
  }

  return (
    <Switch size={"small"} appearance={checkAtributes()} style={onColorValue()}>
      {type === "swatch" ? null : value.slice(0, 3)}
    </Switch>
  );
};
