import React from "react";
import { useGlobalContext } from "../../components/contexts/GlobalContex";

const CheckmarkIcon = () => {
  const { colors } = useGlobalContext();

  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.8898 9.45847C17.8898 14.115 14.115 17.8898 9.45846 17.8898C4.80195 17.8898 1.0271 14.115 1.0271 9.45847C1.0271 4.80196 4.80195 1.02711 9.45846 1.02711C10.7813 1.02711 12.033 1.33175 13.1472 1.8747M16.3089 4.18887L8.9315 11.5663L6.82366 9.45847"
        stroke={colors.black}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckmarkIcon;
