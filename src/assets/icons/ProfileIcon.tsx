import React from "react";
import { IconProps } from "../../models";
import { useGlobalContext } from "../../components/contexts/GlobalContex";

const ProfileIcon: React.FC<IconProps> = ({ size, color }) => {
  const { colors } = useGlobalContext();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 21}
      height={size || 21}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || colors.black}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
};

export default ProfileIcon;
