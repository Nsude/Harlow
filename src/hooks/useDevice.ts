import { useState } from "react";
import useCustomEffect from "./useCustomEffect";

export const useDevice = () => {
  const [deviceRect, setDeviceRect] = useState<DOMRect>(document.documentElement.getBoundingClientRect());

  useCustomEffect(() => {
    const handleResize = () => setDeviceRect(document.documentElement.getBoundingClientRect());
    window.addEventListener("resize", () => {
      handleResize();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceRect;
};
