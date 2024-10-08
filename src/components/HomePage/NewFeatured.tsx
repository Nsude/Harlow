import React from "react";
import BigText from "./BigText";

const NewFeatured = () => {
  return (
    <div className="newfeatured-container hide-scroll">
      <BigText text="Shop" />
      <BigText text="New &" filter={"grayscale"} />
      <BigText text="Featured" />
    </div>
  );
};

export default NewFeatured;
