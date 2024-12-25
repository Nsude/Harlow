import React from "react";
import { IconProps } from "../../models";
import { useGlobalContext } from "../../components/contexts/GlobalContex";

const SearchIcon: React.FC<IconProps> = ({ color }) => {
  const { colors } = useGlobalContext();

  return (
    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.231 19.25L18.481 17.5M19.356 10.0625C19.356 14.6534 15.6343 18.375 11.0435 18.375C6.45259 18.375 2.73096 14.6534 2.73096 10.0625C2.73096 5.47163 6.45259 1.75 11.0435 1.75C15.6343 1.75 19.356 5.47163 19.356 10.0625Z"
        stroke={color || colors.black}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
