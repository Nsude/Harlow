import { createRef, useEffect, useRef, useState } from "react";
import { MenuList, useNavContext } from "../contexts/NavbarContext";
import DesktopMenuITem from "./DesktopMenuITem";
import placeholderDisplayImage from "../../assets/media/images/navmenu-image (9).webp";
import NFImage from "../../assets/media/images/navmenu-image (2).webp";
import footwearImage from "../../assets/media/images/navmenu-image (5).webp";
import allClothingImage from "../../assets/media/images/navmenu-image (7).webp";
import sizesImage from "../../assets/media/images/navmenu-image (8).webp";
import accessoriesImage from "../../assets/media/images/navmenu-image (4).webp";
import brands from "../../assets/media/images/navmenu-image (3).webp";
import useCustomEffect from "../../hooks/useCustomEffect";
import gsap from "gsap";

export let closeNavMenuTimeout: any;
const DNavTitleReveal = "desktop-navmenu-title-reveal-anim";
const DNavItemsReveal = "desktop-navmenu-items-reveal-anim";

const DesktopNavbarMenu = () => {
  const { selectedOption, setSelectedOption, menuLists } = useNavContext();
  const [currentMenu, setCurrentMenu] = useState<MenuList>();
  const [displayImage, setDisplayImage] = useState("");

  const navMenuDisplayImage = [
    {
      title: "New & Featured",
      image: NFImage,
    },
    {
      title: "Footwear",
      image: footwearImage,
    },
    {
      title: "All Clothing",
      image: allClothingImage,
    },
    {
      title: "Sizes",
      image: sizesImage,
    },
    {
      title: "Accessories",
      image: accessoriesImage,
    },
    {
      title: "Brands",
      image: brands,
    },
  ];

  // image change animation
  const displayImageRef = createRef<HTMLImageElement>();
  useCustomEffect(() => {
    if (!displayImage) return;
    const tl = gsap.timeline({ defaults: { duration: 0.7 } });
    tl.fromTo(displayImageRef.current, { opacity: 0 }, { opacity: 1 });
  }, [displayImage]);

  const updateDisplayImage = (title: string) => {
    const matchedTitle = navMenuDisplayImage.find((child) => child.title.includes(title));
    if (!matchedTitle) return;
    setDisplayImage(matchedTitle.image);
  };

  /* Set the hovered or clicked menu to currentMenu */
  useCustomEffect(() => {
    if (!selectedOption) return;
    const matchedMenu = menuLists.find((menu) => menu.name === selectedOption);
    if (!matchedMenu) return;
    setCurrentMenu(matchedMenu);
  }, [selectedOption]);

  /* Menu Open and Close animations */
  const desktopNavmenuCon = createRef<HTMLDivElement>();
  const revealRef = useRef(false);
  useCustomEffect(() => {
    const stagger = 0.15;
    if (selectedOption) {
      gsap.to(".hide-before-anim", {
        opacity: 1,
        duration: 0.1,
        delay: 0.2,
      });

      gsap.to(desktopNavmenuCon.current, {
        height: "76%",
      });

      if (revealRef.current) return;
      gsap.fromTo(
        `.${DNavTitleReveal}`,
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 0.25,
          stagger,
        }
      );

      gsap.fromTo(
        `.${DNavItemsReveal}`,
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger,
        }
      );

      revealRef.current = true;
    } else {
      revealRef.current = false;
      gsap.to(".hide-before-anim", {
        opacity: 0,
        duration: 0.1,
      });

      gsap.to(desktopNavmenuCon.current, {
        height: 0,
      });
    }
  }, [currentMenu]);

  const closeMenu = () => {
    closeNavMenuTimeout = setTimeout(() => {
      setSelectedOption("");
      setCurrentMenu(undefined);
    }, 50);
  };

  return (
    <>
      <div ref={desktopNavmenuCon} onMouseLeave={() => closeMenu()} className="desktop-navmenu-container">
        <div
          className={`menulist hide-before-anim ${currentMenu?.name.toLowerCase().includes("kids") ? "extend-menulist-columns" : ""}`}>
          {currentMenu &&
            currentMenu.items?.map((item) =>
              !item.title.includes("Sizes") || currentMenu.name.toLowerCase().includes("kids") ? (
                <div
                  key={item.title}
                  onMouseEnter={() => updateDisplayImage(item.title)}
                  onMouseLeave={() => setDisplayImage(placeholderDisplayImage)}
                  className="menu-item">
                  <h2 className={`${DNavTitleReveal}`}>{item.title}</h2>
                  <div className={`menu-item-children ${DNavItemsReveal} `}>
                    {item.children.map((child) => (
                      <DesktopMenuITem key={child} name={child} />
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )
            )}
        </div>

        <div className={`navmenu-image-container hide-before-anim`}>
          <img ref={displayImageRef} src={displayImage || placeholderDisplayImage} alt="menu-dispay-image" />
        </div>
      </div>
    </>
  );
};

export default DesktopNavbarMenu;
