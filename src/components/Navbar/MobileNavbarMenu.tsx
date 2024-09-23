import { createRef, useEffect, useRef, useState } from "react";
import { useNavContext } from "../contexts/NavbarContext";
import NavbarOption from "./NavbarOption";
import ArrowHeadIcon from "../../assets/icons/ArrowHeadIcon";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import { gsap } from "gsap";

export const menuOpenAnim = "nav-menu-open-a";
const menuSwitch = "nav-menu-switch-a";

const MobileNavbarMenu = () => {
  const { menuLists, menuOpen, setMenuOpen } = useNavContext();
  const { colors } = useGlobalContext();
  const [activeOption, setActiveOption] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);

  /* Get Page Height */
  const adjustHeight = () => {
    const vh = window.innerHeight / 100;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    adjustHeight();
    window.addEventListener("resize", adjustHeight);

    return window.removeEventListener("resize", adjustHeight);
  }, []);

  /* Menu Open Animations */
  useEffect(() => {
    if (menuOpen) {
      const tl = gsap.timeline();
      tl.to(".navmenu-container", {
        x: "0"
      });

      // Stagger Elements
      tl.fromTo(
        `.${menuOpenAnim}`,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06
        }
      );
    } else {
      const tl = gsap.timeline({ defaults: { duration: 0.3 } });
      // stagger elements
      tl.to(`.${menuOpenAnim}`, {
        y: 30,
        opacity: 0,
        stagger: 0.03
      });

      tl.to(".navmenu-container", {
        x: "-110%"
      }).then(() => setActiveOption(""));
    }
  }, [menuOpen]);

  /* Menu Switch Animations */
  const menuItemsRef = createRef<HTMLDivElement>();
  const loginRef = createRef<HTMLButtonElement>();
  const triggerCount = useRef(0);
  useEffect(() => {
    triggerCount.current += 1;
    if (triggerCount.current < 3) return;
    if (!activeOption) {
      setShowOptions(false);
    } else {
      if (!document.querySelector(`.${menuSwitch}`)) return;
      gsap
        .to(`.${menuSwitch}`, {
          x: -15,
          stagger: 0.01,
          opacity: 0
        })
        .then(() => {
          setShowOptions(true);
        });
    }
  }, [activeOption]);

  // adds the class for the switch screen animations
  const addSwitchAnimClass = () => {
    updateChildClasses(menuItemsRef.current, menuSwitch, true);
    loginRef.current?.classList.add(menuSwitch);
  };

  const updateChildClasses = (container: HTMLElement | null, className: string, add: boolean) => {
    if (!container?.childNodes) return;
    const menuItems = container.childNodes;
    menuItems?.forEach((child) => {
      if (!(child instanceof HTMLButtonElement)) return;
      add ? child.classList.add(className) : child.classList.remove(className);
    });
  };

  return (
    <>
      <div className="navmenu-container">
        <button className={"close-button " + menuOpenAnim} onClick={() => setMenuOpen(false)}>
          Close
        </button>
        {showOptions && <NavbarOption option={activeOption} setOption={setActiveOption} />}
        {/* Options Container */}
        {!showOptions && (
          <>
            <div className="options-con" ref={menuItemsRef}>
              {menuLists &&
                menuLists.map((menu) => (
                  <button
                    key={menu.name}
                    onClick={() => {
                      addSwitchAnimClass();
                      setActiveOption(menu.name);
                    }}
                    className={"nav-option flex jc-sb " + menuOpenAnim}
                  >
                    <p>{menu.name}</p>
                    {menu.items && <ArrowHeadIcon size={14} color={colors.offWhite} />}
                  </button>
                ))}
            </div>
            <button ref={loginRef} className={"login flex cg-10 " + menuOpenAnim}>
              <ProfileIcon color={colors.offWhite} />
              <p>Login</p>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default MobileNavbarMenu;
