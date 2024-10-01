import { useState } from "react";
import useCustomEffect from "./useCustomEffect";

const useMousePos = (relativeElement?: Element | null) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useCustomEffect(() => {
    const handleGetMousePos = (event: MouseEvent) => {
      if (relativeElement) {
        const elemRect = relativeElement.getBoundingClientRect();
        const relativeX = event.clientX - elemRect.left;
        const relativeY = event.clientY - elemRect.top;
        setMousePos({ x: relativeX, y: relativeY });
      } else {
        setMousePos({ x: event.clientX, y: event.clientY });
      }
    };

    const target = relativeElement || document;
    target.addEventListener("mousemove", handleGetMousePos as EventListener);

    return () => {
      target.removeEventListener("mousemove", handleGetMousePos as EventListener);
    };
  }, []);

  return mousePos;
};

export default useMousePos;
