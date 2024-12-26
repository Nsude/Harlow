import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useCustomEffect from "../../hooks/useCustomEffect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage1 from "../../assets/media/images/hero-image(1).webp";
import heroImage2 from "../../assets/media/images/hero-image(2).webp";
import heroImage3 from "../../assets/media/images/hero-image(3).webp";
import heroImage4 from "../../assets/media/images/hero-image(4).webp";
import heroImage5 from "../../assets/media/images/hero-image(5).webp";
import { useDevice } from "../../hooks/useDevice";
import { scrambleText } from "../utility-functions/scrambleText";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const [time, setTime] = useState("");
  const deviceRect = useDevice();

  // scroll into view on refresh
  useCustomEffect(() => {
    const hero = document.querySelector(".hero-section-container");
    const handleLoad = () => {
      if (!hero) return;
      // hero.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useCustomEffect(() => {
    setInterval(() => {
      const NigerianTime = new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Lagos",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setTime(NigerianTime);
    }, 500);
  });

  const imagesDuplicated = useRef(false);
  useCustomEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || deviceRect.width < 1339) {
      // Clean up animations
      gsap.killTweensOf(".scroller, .hero-scroller, .cta-container, .bottom-info");
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return null;
    }

    const scroller = document.querySelector(".scroller");
    const heroImges = document.querySelector(".hero-images");

    const clone = heroImges?.cloneNode(true) as HTMLDivElement;
    if (!imagesDuplicated.current) {
      scroller?.appendChild(clone);
      imagesDuplicated.current = true;
    }

    // Define animations
    const scrollAnimation = gsap.to(".scroller", {
      duration: 40,
      xPercent: -50,
      repeat: -1,
      ease: "linear",
    });

    gsap.to(".hero-scroller", {
      scale: 1.7,
      transformOrigin: "left bottom",
      ease: "linear",
      scrollTrigger: {
        start: "top 0%",
        end: +500,
        scrub: 1,
      },
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
        scrollAnimation.timeScale(1 + velocity / 80);

        // Restore speed after 200ms
        scrollerTimeout = setTimeout(() => {
          scrollAnimation.timeScale(1);
        }, 200);
      },
    });

    gsap.to(".cta-container", {
      bottom: 0,
      scrollTrigger: {
        trigger: ".scroller",
        start: "top 20%",
        scrub: true,
      },
    });

    gsap.to(".bottom-info", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".scroller",
        start: "top 30%",
        scrub: 1,
      },
    });

    // Cleanup on component unmount
    return () => {
      gsap.killTweensOf(".scroller, .hero-scroller, .cta-container, .bottom-info");
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [deviceRect.width]);

  // get link widths
  const anchorElems = useRef<(HTMLAnchorElement | null)[]>([]);
  useCustomEffect(() => {
    if (!anchorElems.current) return;
    anchorElems.current.forEach((elem) => {
      if (!elem) return;
      const rect = elem.getBoundingClientRect();
      elem.style.setProperty("--width", `${rect.width}px`);
    });
  }, []);

  const ctaMouseEnter = (e: React.MouseEvent, text: string) => {
    let target = e.target as HTMLAnchorElement;
    scrambleText(target, text);
  };

  return (
    <div className="hero-section-container">
      <div className="cta-container">
        <Link ref={(el) => anchorElems.current.push(el)} onMouseEnter={(e) => ctaMouseEnter(e, "Shop Now")} to={"/"}>
          Shop Now
        </Link>
        <Link
          ref={(el) => anchorElems.current.push(el)}
          onMouseEnter={(e) => ctaMouseEnter(e, "41% Discount")}
          to={"/"}>
          41% Discount
        </Link>
        <Link ref={(el) => anchorElems.current.push(el)} onMouseEnter={(e) => ctaMouseEnter(e, "Collection")} to={"/"}>
          Collection
        </Link>
      </div>

      <div className="hero-scroller">
        <div className="scroller">
          <div className="hero-images">
            <img src={heroImage1} alt="hero-section-image" />
            <img src={heroImage2} alt="hero-section-image" />
            <img src={heroImage3} alt="hero-section-image" />
            <img src={heroImage4} alt="hero-section-image" />
            <img src={heroImage5} alt="hero-section-image" />
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
