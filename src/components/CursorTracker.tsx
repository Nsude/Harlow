import React, { createRef } from "react";
import useCustomEffect from "../hooks/useCustomEffect";
import useMousePos from "../hooks/useMousePos";

const CursorTracker = () => {
  const mousePos = useMousePos();
  const cursorRef = createRef<HTMLDivElement>();
  useCustomEffect(() => {
    let cursor = cursorRef.current;
    if (!cursor) return;
    cursor.style.left = `${mousePos.x}px`;
    cursor.style.top = `${mousePos.y}px`;
  }, [mousePos?.x, mousePos?.y]);

  return <div ref={cursorRef} className="cursor-tracker"></div>;
};

export default CursorTracker;
