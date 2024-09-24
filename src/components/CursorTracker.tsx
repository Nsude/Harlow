import React, { createRef } from "react";
import useCustomEffect from "../hooks/useCustomEffect";
import useMousePos from "../hooks/useMousePos";
import gsap from "gsap";

const CursorTracker = () => {
  const mousePos = useMousePos();
  const cursorRef = createRef<HTMLDivElement>();
  useCustomEffect(() => {
    let cursor = cursorRef.current;
    if (!cursor) return;
    gsap.to(".cursor-tracker", {
      left: mousePos.x,
      top: mousePos.y,
      duration: .2
    })

  }, [mousePos?.x, mousePos?.y]);

  return <div ref={cursorRef} className="cursor-tracker"></div>;
};

export default CursorTracker;
