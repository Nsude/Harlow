import React, { PropsWithChildren } from "react";
import Navbar from "../Navbar/Navbar";
import { NavbarContextProvider } from "../contexts/NavbarContext";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <NavbarContextProvider>
        <Navbar />
      </NavbarContextProvider>
    </div>
  );
};

export default Homepage;
