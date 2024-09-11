import React, { useEffect, useState } from "react";
import { useNavContext } from "../contexts/NavbarContext";
import NavbarOption from "./NavbarOption";
import ArrowHeadIcon from "../../assets/icons/ArrowHeadIcon";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import { useGlobalContext } from "../contexts/GlobalContex";

const NavbarMenu = () => {
  const { menuLists, menuOpen, setMenuOpen } = useNavContext();
  const { colors } = useGlobalContext();
  const [activeOption, setActiveOption] = useState<string>("");

  return (
    <>
      {menuOpen && (
        <div className="navmenu-container">
          <button className="close-button" onClick={() => setMenuOpen(false)}>
            Close
          </button>
          {activeOption && <NavbarOption option={activeOption} setOption={setActiveOption} />}
          {/* Options Container */}
          {!activeOption && (
            <>
              <div className="options-con">
                {menuLists &&
                  menuLists.map((menu) => (
                    <button
                      key={menu.name}
                      onClick={() => setActiveOption(menu.name)}
                      className="nav-option flex jc-sb"
                    >
                      <p>{menu.name}</p>
                      {!menu.single && <ArrowHeadIcon size={14} color={colors.offWhite} />}
                    </button>
                  ))}
              </div>
              <button className="login flex cg-10">
                <ProfileIcon color={colors.offWhite} />
                <p>Login</p>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NavbarMenu;
