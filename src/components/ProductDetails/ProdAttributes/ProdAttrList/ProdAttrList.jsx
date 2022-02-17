import React from "react";
import ProdAttrItem from "./ProdAttrItem";
import "./ProdAttrList.css";

export const ProdAttrList = ({ items, name, type, handleSelectedAttr }) => {
  return (
    <>
      <h3>{name}</h3>
      <div className="sizes_details">
        {items.length
          ? items.map((item, index) => {
              return (
                <ProdAttrItem
                  key={item.value + index}
                  value={item.value}
                  handleSelectedAttr={handleSelectedAttr}
                  type={type}
                  name={name}
                />
              );
            })
          : null}
      </div>
    </>
  );
};
export default ProdAttrList;
