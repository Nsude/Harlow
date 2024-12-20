import React from "react";
import { useGlobalContext } from "../../components/contexts/GlobalContex";

const CartIcon: React.FC<{ selectedItems?: boolean; color?: string }> = ({ selectedItems, color }) => {
  const { colors } = useGlobalContext();
  return (
    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.56247 7.8133V6.96455C6.56247 4.9958 8.14622 3.06205 10.115 2.8783C12.46 2.6508 14.4375 4.49705 14.4375 6.7983V8.0058M13.5585 11.6021H13.5664M7.43266 11.6021H7.44052M7.87497 20.3521H13.125C16.6425 20.3521 17.2725 18.9433 17.4562 17.2283L18.1125 11.9783C18.3487 9.8433 17.7362 8.10205 14 8.10205H6.99997C3.26372 8.10205 2.65122 9.8433 2.88747 11.9783L3.54372 17.2283C3.72747 18.9433 4.35747 20.3521 7.87497 20.3521Z" stroke={color || colors.black} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {
        selectedItems ? (
          <circle cx="17" cy="6.10205" r="4.625" fill={colors.accent} stroke={colors.black} strokeWidth="1.25"/>
        ) : ''
      }
    </svg>
  );
};

export default CartIcon;
