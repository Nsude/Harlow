import React, { PropsWithChildren } from "react";
import HeroSection from "./HeroSection";
import ShowcaseArea from "./ShowcaseArea";
import Featured from "./Featured";
import NewFeatured from "./NewFeatured";
import ImageSection from "./ImageSection";

const Homepage = () => {

  return (
    <div className="homepage-container">
      <HeroSection />
      <ShowcaseArea />
      <Featured angel={false} />
      <NewFeatured />
      <Featured angel={true} />
      <ImageSection />
    </div>
  );
};

export default Homepage;
