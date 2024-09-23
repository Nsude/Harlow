import React from "react";
import { useGlobalContext } from "../../components/contexts/GlobalContex";

const CartIcon: React.FC<{ selectedItems?: boolean; color?: string }> = ({ selectedItems, color }) => {
  const { colors } = useGlobalContext();
  return (
    <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.75 5.75C4.17621 5.75 2.69427 6.49097 1.75 7.75L1.625 7.91667C0.975889 8.78215 0.625 9.83481 0.625 10.9167V21.5C0.625 21.9641 0.809374 22.4092 1.13756 22.7374C1.46575 23.0656 1.91087 23.25 2.375 23.25H14.625C15.0891 23.25 15.5342 23.0656 15.8624 22.7374C16.1906 22.4092 16.375 21.9641 16.375 21.5V10.9167C16.375 9.83482 16.0241 8.78215 15.375 7.91667L15.25 7.75C14.3057 6.49097 12.8238 5.75 11.25 5.75H5.75Z"
        stroke={color || colors.black}
        strokeWidth="1.25"
      />
      <path d="M0.625 9.25H16.375" stroke={color || colors.black} strokeWidth="1.25" />
      <path
        d="M12 12.75C12 13.6783 11.6313 14.5685 10.9749 15.2249C10.3185 15.8813 9.42826 16.25 8.5 16.25C7.57174 16.25 6.6815 15.8813 6.02513 15.2249C5.36875 14.5685 5 13.6783 5 12.75"
        stroke={color || colors.black}
        strokeWidth="1.25"
      />
      {selectedItems ? (
        <circle
          cx="14"
          cy="7"
          r="5.625"
          fill="#F060E2"
          stroke={color ? colors.black : colors.offWhite}
          strokeWidth="1.25"
        />
      ) : (
        ""
      )}
    </svg>
  );
};

export default CartIcon;
