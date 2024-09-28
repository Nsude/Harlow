import React, { PropsWithChildren } from "react";
import HeroSection from "./HeroSection";
import ShowcaseArea from "./ShowcaseArea";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <HeroSection />
      <ShowcaseArea />
    </div>
  );
};

export default Homepage;
