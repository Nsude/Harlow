import React, { PropsWithChildren } from "react";
import HeroSection from "./HeroSection";
import ShowcaseArea from "./ShowcaseArea";
import Featured from "./Featured";
import NewFeatured from "./NewFeatured";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <HeroSection />
      <ShowcaseArea />
      <Featured angel={false} />
      <NewFeatured />
      <Featured angel={true} />
    </div>
  );
};

export default Homepage;
