import Logo from "../../assets/icons/Logo";
import { Link } from "react-router-dom";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import CartIcon from "../../assets/icons/CartIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import { MenuList, useNavContext } from "../contexts/NavbarContext";
import MobileNavbarMenu from "./MobileNavbarMenu";
import DesktopNavbarMenu, { closeNavMenuTimeout } from "./DesktopNavbarMenu";
import { useGlobalContext } from "../contexts/GlobalContex";
import { addClass, removeClass } from "../utils";

const Navbar = () => {
  const { setMenuOpen, selectedOption, setSelectedOption, menuLists } = useNavContext();
  const { colors } = useGlobalContext();

  const menuOptionHover = (menu: MenuList) => {
    if (!menu.items) return;
    setSelectedOption(menu.name);
  };

  const setActiveMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    removeClass("active-nav-menu");
    addClass(e.target as HTMLAnchorElement, "active-nav-menu");
  };

  const keepMenuOpen = () => {
    if (!selectedOption) return;
    clearTimeout(closeNavMenuTimeout);
  };

  return (
    <>
      <MobileNavbarMenu />
      <DesktopNavbarMenu />

      <nav
        onMouseEnter={() => keepMenuOpen()}
        className={`navbar-container flex jc-sb ${selectedOption ? "menu-open" : ""}`}
      >
        <button className="menu" onClick={() => setMenuOpen(true)}>
          Menu
        </button>

        {/* logo */}
        <div className="logo-search-con flex">
          <Logo color={selectedOption ? colors.offWhite : ""} />
          <div className="search-box">
            <input type="text" placeholder="Search" />
          </div>
        </div>

        {/* Destop Links */}
        <div className="desktop-links">
          {menuLists &&
            menuLists.map((item) => (
              <Link
                key={item.name}
                to={`/${item.name.toLocaleLowerCase()}`}
                className={`${selectedOption ? "menu-open" : ""}`}
                onMouseEnter={() => {
                  menuOptionHover(item);
                }}
                onClick={(e) => setActiveMenu(e)}
              >
                {item.name}
              </Link>
            ))}
        </div>

        <div className="side-links flex cg-15">
          <button className="m-search-button">
            <SearchIcon />
          </button>
          <Link to={"/profile"} className="profile-link">
            <ProfileIcon color={selectedOption ? colors.offWhite : ""} />
          </Link>
          <Link to={"/cart"}>
            <CartIcon color={selectedOption ? colors.offWhite : ""} />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
