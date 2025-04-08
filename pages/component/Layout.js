// Layout.js
import React from "react";
const Layout = ({ visible, children }) => {
  return (
    <div>
      <img src="https://my.syriatel.sy/images/logo.png"
      style={{width:"calc(100vw - 40px)"}}/>
      <div className="loader" style={{ visibility: `${visible}` }}></div>
      {children}
    </div>
  );
};

export default Layout;
