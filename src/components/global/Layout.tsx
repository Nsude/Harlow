import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { NavbarContextProvider } from "../contexts/NavbarContext";
import Cart from "./Cart";

const Layout = () => {
  return (
    <div>
      <NavbarContextProvider>
        <Navbar />
        <Cart />
        <main>
          <Outlet />
        </main>
        <Footer />
      </NavbarContextProvider>
    </div>
  );
};

export default Layout;
