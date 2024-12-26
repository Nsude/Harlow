import React, { useRef } from "react";
import sneakerImage from "../../assets/media/images/sneaker-title.webp";
import apparelImage from "../../assets/media/images/apparel-title.webp";
import accessImage from "../../assets/media/images/access-title.webp";
import angel_1 from "../../assets/media/images/angel-1.webp";
import angel_2 from "../../assets/media/images/angel-2.webp";
import angel_3 from "../../assets/media/images/angel-3.webp";
import FeaturedImage from "../global/FeaturedImage";

interface Props {
  angel: boolean;
}

const Featured: React.FC<Props> = ({ angel }) => {
  return (
    <div className="featured-container">
      {!angel ? <h2 className="title">Featured</h2> : ""}
      <div className="images hide-scroll">
        <div className="box">
          <FeaturedImage
            title={angel ? "Shop" : "Sneakers"}
            image={angel ? angel_2 : sneakerImage}
            buttonText={angel ? "Women" : ""}
            angel={angel}
          />
        </div>

        <div className="box">
          <FeaturedImage
            title={angel ? "Angel" : "Apparel"}
            image={angel ? angel_1 : apparelImage}
            buttonText={angel ? "Men" : ""}
            angel={angel}
          />
        </div>

        <div className="box">
          <FeaturedImage
            title={angel ? "Collection" : "Accessories"}
            image={angel ? angel_3 : accessImage}
            buttonText={angel ? "Kids" : ""}
            angel={angel}
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
