import React, { PropsWithChildren } from "react";
import HeroSection from "./HeroSection";
import ShowcaseArea from "./ShowcaseArea";
import Featured from "./Featured";
import NewFeatured from "./NewFeatured";
import ImageSection from "./ImageSection";
import MenFootwear from "./MenFootwear";
import WomenFootwear from "./WomenFootwear";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <HeroSection />
      <ShowcaseArea />
      <Featured angel={false} />
      <NewFeatured />
      <Featured angel={true} />
      <ImageSection />
      <MenFootwear />
      <WomenFootwear />
    </div>
  );
};

export default Homepage;
