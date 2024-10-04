import React, { PropsWithChildren } from "react";
import HeroSection from "./HeroSection";
import ShowcaseArea from "./ShowcaseArea";
import Featured from "./Featured";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <HeroSection />
      <ShowcaseArea />
      <Featured />
    </div>
  );
};

export default Homepage;
