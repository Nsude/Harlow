import React, { useEffect, useRef, useState } from 'react'
import placeHolderImg from "../../assets/media/images/navmenu-image (9).webp";
import { Link } from 'react-router-dom';
import useCustomEffect from '../../hooks/useCustomEffect';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const [time, setTime] = useState("");

  useCustomEffect(() => {
    setInterval(() => {
      const NigerianTime = new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Lagos",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })

      setTime(NigerianTime);
    }, 500);
  })

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

      const scrollAnimation = gsap.to(".scroller[data-scroll='true']", {
        duration: 40,
        xPercent: -50,
        repeat: -1,
        ease: "linear",
      })

      ScrollTrigger.create({
        trigger: ".scroller",
        start: "top 22%",
        markers: true,
        end: +500,
        scrub: 1,
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          scrollAnimation.timeScale(1 + velocity / 46);
        }

      })
    }
  }, [])

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
  )
}

export default HeroSection;