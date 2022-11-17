import React from "react";

function Layout({ children }) {
  return <main style={{ minHeight: "calc(100vh - 80px)" }}>{children}</main>;
}

export default Layout;
