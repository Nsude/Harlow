import { useRef, useState } from "react";
import useCustomEffect from "../../hooks/useCustomEffect";
import { Link } from "react-router-dom";
import NFImage from "../../assets/media/images/navmenu-image (2).webp";
import allClothingImage from "../../assets/media/images/navmenu-image (7).webp";
import sizesImage from "../../assets/media/images/navmenu-image (8).webp";
import accessoriesImage from "../../assets/media/images/navmenu-image (4).webp";
import brands from "../../assets/media/images/navmenu-image (3).webp";
import socialsImage from "../../assets/media/images/contacts-image.webp";
import gsap from "gsap";

const footerContent = [
  {
    title: "Reach us",
    children: ["info@harlow.shop", "+234 8149 2853 60"],
    image: NFImage,
  },
  {
    title: "Company",
    children: ["About", "FAQ", "Contact us"],
    image: allClothingImage,
  },
  {
    title: "Shop",
    children: ["Men", "Women", "Kids", "Sale", "Launches"],
    image: accessoriesImage,
  },
  {
    title: "Legal",
    children: ["Returns & Exchanges", "Shipping Policy"],
    image: sizesImage,
  },
];

const Footer = () => {
  const container = useRef(null);
  const [displayImage, setDisplayImage] = useState(brands);

  useCustomEffect(() => {
    gsap.fromTo(".footer-container .image-con", { opacity: 0 }, { opacity: 1 });
  }, [displayImage]);

  const updateDisplayImage = (title: string) => {
    const matchedContent = footerContent.find((child) => child.title === title);
    if (!matchedContent) return null;
    setDisplayImage(matchedContent.image);
  };

  return (
    <div ref={container} className="footer-container">
      <h2>
        &nbsp;&nbsp;&nbsp;&nbsp; Express yourself in style, wear Harlow and showcase your pride in African heritage.
        Shop now and join a movement that celebrates tradition, creativity, and beauty.
      </h2>

      <div className="contents">
        <div className="links">
          {footerContent
            ? footerContent.map((item) => (
                <div key={item.title} onMouseEnter={() => updateDisplayImage(item.title)} className="link-block">
                  <h3>{item.title}</h3>
                  {item.children.map((child) => (
                    <Link to={"/"} key={child}>
                      {child}
                    </Link>
                  ))}
                </div>
              ))
            : ""}
        </div>
        <div className="image-con">
          <img src={displayImage} alt="random images appearing as you hover on these links" />
        </div>
        <div onMouseEnter={() => setDisplayImage(socialsImage)} className="flex jc-sb">
          <div className="flex cg-10">
            <Link to={"https://www.instagram.com/"} target="_blank">
              Instagram
            </Link>
            <Link to={"https://www.youtube.com/"} target="_blank">
              Youtube
            </Link>
            <Link to={"https://www.facebook.com/"} target="_blank">
              Facebook
            </Link>
          </div>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
