import React, { useEffect, useRef, useState } from "react";
import placeHolderImg from "../../assets/media/images/navmenu-image (9).webp";
import { Link } from "react-router-dom";
import useCustomEffect from "../../hooks/useCustomEffect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGlobalContext } from "../contexts/GlobalContex";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { colors } = useGlobalContext();
  const [time, setTime] = useState("");

  useCustomEffect(() => {
    setInterval(() => {
      const NigerianTime = new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Lagos",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      setTime(NigerianTime);
    }, 500);
  });

  const imagesDuplicated = useRef(false);
  useCustomEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const scroller = document.querySelector(".scroller");
      const heroImges = document.querySelector(".hero-images");

      scroller?.setAttribute("data-scroll", "true");
      const clone = heroImges?.cloneNode(true) as HTMLDivElement;
      if (!imagesDuplicated.current) {
        scroller?.appendChild(clone);
        imagesDuplicated.current = true;
      }

      // images scroll animation
      const scrollAnimation = gsap.to(".scroller[data-scroll='true']", {
        duration: 40,
        xPercent: -50,
        repeat: -1,
        ease: "linear"
      });

      let scrollerTimeout: any;
      ScrollTrigger.create({
        trigger: ".scroller",
        start: "top 22%",
        end: +500,
        scrub: 0.8,
        onUpdate: (self) => {
          clearTimeout(scrollerTimeout);
          const velocity = self.getVelocity();
          scrollAnimation.timeScale(1 + velocity / 40);

          // runs when the user stops scrolling for 200ms
          scrollerTimeout = setTimeout(() => {
            scrollAnimation.timeScale(1);
          }, 200);
        }
      });

      // CTA Container
      gsap.to(".cta-container", {
        bottom: 0,
        scrollTrigger: {
          scrub: 0.2
        }
      });

      // bottom info
      gsap.to(".bottom-info", {
        opacity: 0,
        position: "fixed",
        scrollTrigger: {
          scrub: 0.1
        }
      });

      const links = document.querySelector(".cta-container")?.children;
      if (!links) return;
      gsap.to(links, {
        color: colors.black,
        scrollTrigger: {
          scrub: 0.2
        }
      });
    }
  }, []);

  return (
    <div className="hero-section-container">
      <div className="cta-container">
        <Link to={"/"}>Shop Now</Link>
        <Link to={"/"}>41% Discount</Link>
        <Link to={"/"}>Collection</Link>
      </div>

      <div className="hero-scroller">
        <div className="scroller">
          <div className="hero-images">
            <img src={placeHolderImg} alt="hero-section-image" />
            <img src={placeHolderImg} alt="hero-section-image" />
            <img src={placeHolderImg} alt="hero-section-image" />
            <img src={placeHolderImg} alt="hero-section-image" />
            <img src={placeHolderImg} alt="hero-section-image" />
          </div>
        </div>
      </div>

      <div className="bottom-info flex jc-sb">
        <p>Scroll</p>
        <p>{time || "00:00:00"}</p>
      </div>
    </div>
  );
};

export default HeroSection;
