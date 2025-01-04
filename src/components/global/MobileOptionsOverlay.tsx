import React, { ReactNode } from "react";
import useCustomEffect from "../../hooks/useCustomEffect";

interface Props {
  children: ReactNode;
  display: boolean;
}

const MobileOptionsOverlay: React.FC<Props> = ({ children, display }) => {
  useCustomEffect(() => {
    document.body.style.overflowY = display ? "hidden" : "scroll";
  }, [display]);

  if (!display) return null;

  return (
    // mobile options
    <div className="mo-overlay">
      <div className="backdrop"></div>
      <div className="overlay">{children}</div>
    </div>
  );
};

export default MobileOptionsOverlay;
