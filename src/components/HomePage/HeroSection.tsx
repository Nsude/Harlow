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
        ease: "linear",
      });

      gsap.to(".scroller[data-scroll='true']", {
        scale: 2,
        transformOrigin: "bottom",
        ease: "linear",
        scrollTrigger: {
          start: "top 0%",
          end: +500,
          scrub: 0.8,
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

          // runs when the user stops scrolling for 200ms
          scrollerTimeout = setTimeout(() => {
            scrollAnimation.timeScale(1);
          }, 200);
        },
      });

      // CTA Container
      if (deviceRect.width > 700) {
        // desktop and tablet
        gsap.to(".cta-container", {
          bottom: 0,
          scrollTrigger: {
            scrub: 0,
          },
        });
      } else {
        gsap.to(".cta-container", {
          bottom: 25,
          transform: "translateY(0)",
          scrollTrigger: {
            scrub: 0,
          },
        });
      }

      // bottom info
      gsap.to(".bottom-info", {
        opacity: 0,
        position: "fixed",
        scrollTrigger: {
          scrub: 0.1,
        },
      });
    }
  }, []);

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
