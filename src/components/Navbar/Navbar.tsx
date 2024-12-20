import Logo from "../../assets/icons/Logo";
import { Link } from "react-router-dom";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import CartIcon from "../../assets/icons/CartIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import { MenuList, useNavContext } from "../contexts/NavbarContext";
import MobileNavbarMenu from "./MobileNavbarMenu";
import DesktopNavbarMenu, { closeNavMenuTimeout } from "./DesktopNavbarMenu";
import { useGlobalContext } from "../contexts/GlobalContex";
import { addClass, removeClass } from "../utility-functions/utils";
import { useRef, useState } from "react";
import useCustomEffect from "../../hooks/useCustomEffect";
import { gsap } from "gsap";
import Search from "../global/Search";
import { useDevice } from "../../hooks/useDevice";

const Navbar = () => {
  const { setMenuOpen, menuOpen, selectedOption, setSelectedOption, menuLists, searchOpen, setSearchOpen } = useNavContext();
  const { colors } = useGlobalContext();
  const [hideMenuBar, setHideMenuBar] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const device = useDevice();

  // get Navbar Height 
  useCustomEffect(() => {
    if (!navRef.current) return null; 
    const rect = navRef.current.getBoundingClientRect();
    setNavbarHeight(rect.height);
  }, [device.width])

  // hide / show navbar
  useCustomEffect(() => {
    let prevScrollPos = 0;
    const handleScroll = () => {
      let scrollPos = document.documentElement.scrollTop;

      // helps prevent scrollbar not being visible on mobile when scrolled to the top
      if (scrollPos < 200 || searchOpen) {
        return setHideMenuBar(false);
      }

      if (scrollPos > prevScrollPos) {
        setHideMenuBar(true);
      } else {
        setHideMenuBar(false);
      }

      prevScrollPos = scrollPos;
    };
    document.addEventListener("scroll", handleScroll);
    // clean up on Unmount
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [searchOpen]);

  // hide menu bar on scroll
  useCustomEffect(() => {
    // gsap.fromTo()
    if (!navRef.current) return;
    const animD = 0.25;
    if (hideMenuBar) {
      gsap.to(navRef.current, {
        yPercent: -100,
        duration: animD,
      });
    } else {
      gsap.to(navRef.current, {
        yPercent: 0,
        duration: animD,
      });
    }
  }, [hideMenuBar]);

  // set navbar background color
  useCustomEffect(() => {
    if (!navRef.current) return;
    // mobile
    if (menuOpen) {
      gsap.to(navRef.current, { zIndex: 0 });
    } else {
      gsap.to(navRef.current, { zIndex: 100 });
    }
  }, [selectedOption, menuOpen]);

  const menuOptionHover = (menu: MenuList, e: React.MouseEvent) => {
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
      <Search navbarHeight={navbarHeight} />

      <nav
        ref={navRef}
        onMouseEnter={() => keepMenuOpen()}
        className={`navbar-container flex jc-sb ${selectedOption ? "menu-open" : ""}`}>
        <button className="menu" onClick={() => setMenuOpen(true)}>
          Menu
        </button>

        {/* logo */}
        <div className="logo-search-con flex">
          <Logo color={colors.offWhite} />
          {/* <div className="search-box" onClick={() => setSearchOpen((prev) => !prev)}>
            <SearchIcon color={colors.offWhite} />
            <input placeholder="Search" />
          </div> */}
        </div>

        {/* Destop Links */}
        <div className="desktop-links">
          {menuLists &&
            menuLists.map((item, i) => (
              <Link
                key={item.name}
                to={`/${item.name.toLocaleLowerCase()}`}
                className={`${selectedOption ? "menu-open" : ""}`}
                onMouseEnter={(e) => {
                  menuOptionHover(item, e);
                }}
                onClick={(e) => setActiveMenu(e)}>
                {item.name}
              </Link>
            ))}
        </div>

        <div className="side-links flex cg-15">
          <button className="m-search-button" onClick={() => setSearchOpen((prev) => !prev)}>
            <SearchIcon color={colors.offWhite} />
          </button>
          <Link to={"/profile"} className="profile-link">
            <ProfileIcon color={colors.offWhite} />
          </Link>
          <Link to={"/cart"} style={{paddingTop: 2}}>
            <CartIcon color={colors.offWhite} />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
