import React from "react";

export const Image = ({ src, type, onClick }) => {
  return (
    <>
      <img src={src} className={type} onClick={() => onClick(src)} alt="foto" />
    </>
  );
};
