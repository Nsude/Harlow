import React from "react";

const ArrowIcon: React.FC<{ size?: number; color?: string }> = ({ size, color }) => {
  return (
    <svg width={size || 20} height={size || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10H17.5M17.5 10L11.5 4M17.5 10L11.5 16" stroke={color || "#171717"} strokeWidth="1.25" />
    </svg>
  );
};

export default ArrowIcon;
