import React, { SetStateAction, useEffect, useState } from "react";
import ArrowHeadIcon from "../../assets/icons/ArrowHeadIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import Accordion from "./Accordion";
import { useNavContext } from "../contexts/NavbarContext";
import { gsap } from "gsap";
import { menuOpenAnim } from "./MobileNavbarMenu";
import useCustomEffect from "../../hooks/useCustomEffect";

interface Props {
  option: string;
  setOption: React.Dispatch<SetStateAction<string>>;
}

const NavbarOption: React.FC<Props> = ({ option, setOption }) => {
  const { colors } = useGlobalContext();
  const { menuLists } = useNavContext();
  const activeMenu = menuLists.find((menu) => menu.name === option);
  const [switchMenu, setSwitchMenu] = useState(false);

  /* On Page Load Animation */
  useCustomEffect(() => {
    // prettier-ignore
    gsap.fromTo(".anim-option",{
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.06
      }
    );
  }, []);

  /* Menu Page Switch Animation */
  useEffect(() => {
    if (switchMenu) {
      // prettier-ignore
      gsap.to(".switch-prev", {
          x: 15,
          opacity: 0,
          duration: 0.2
        })
        .then(() => setOption(""));
    }
  }, [switchMenu]);

  return (
    <div className="nav-option-container">
      <button
        onClick={() => setSwitchMenu(true)}
        className={"previous flex cg-10 anim-option switch-prev " + menuOpenAnim}>
        <div>
          <ArrowHeadIcon size={14} color={colors.offWhite} />
        </div>
        <p>{option}</p>
      </button>

      <div className={"nav-options switch-prev " + menuOpenAnim}>
        {activeMenu?.items &&
          activeMenu.items.map((item, i) =>
            !item.title.includes("Sizes") ? (
              <Accordion key={i} title={item.title} children={item.children} activeOption={activeMenu.name} />
            ) : activeMenu.name.includes("Kids") ? (
              <Accordion key={i} title={item.title} children={item.children} activeOption={activeMenu.name} />
            ) : (
              ""
            )
          )}
      </div>
    </div>
  );
};

export default NavbarOption;
