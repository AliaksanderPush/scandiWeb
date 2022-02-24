import React from "react";
 import Header from "./Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="content">
       <Header />
      <main id="main">{children}</main>
    </div>
  );
};
export default Layout;
