import { useRef } from "react";
import useCustomEffect from "../../hooks/useCustomEffect";
import { moveSectionOnScroll } from "../utility-functions/utils";
import { Link } from "react-router-dom";

const footerContent = [
  {
    title: "Reach us",
    children: ["info@harlow.shop", "+234 8149 2853 60"],
  },
  {
    title: "Company",
    children: ["About", "FAQ", "Contact us"],
  },
  {
    title: "Shop",
    children: ["Men", "Women", "Kids", "Sale", "Launches"],
  },
  {
    title: "Legal",
    children: ["Returns & Exchanges", "Shipping Policy"],
  },
];

const Footer = () => {
  const container = useRef(null);

  useCustomEffect(() => {
    if (window.innerWidth < 1340 || !container.current) return null;
  });

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
                <div key={item.title} className="link-block">
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
        <div className="image"></div>
        <div className="flex jc-sb">
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
          <p>{"2024"}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
