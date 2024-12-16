import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Utility to kill all animations and ScrollTriggers
export const killAnimations = () => {
  // Kill all GSAP tweens
  gsap.killTweensOf("*");

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

// Utility to refresh ScrollTriggers
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};
