import React, { SetStateAction } from "react";
import ArrowHeadIcon from "../../assets/icons/ArrowHeadIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import Accordion from "./Accordion";
import { useNavContext } from "../contexts/NavbarContext";

interface Props {
  option: string;
  setOption: React.Dispatch<SetStateAction<string>>;
}

const NavbarOption: React.FC<Props> = ({ option, setOption }) => {
  const { colors } = useGlobalContext();
  const { menuLists } = useNavContext();
  const activeMenu = menuLists.find((menu) => menu.name === option);

  return (
    <div className="nav-option-container">
      <button onClick={() => setOption("")} className="previous flex cg-10">
        <div>
          <ArrowHeadIcon size={14} color={colors.offWhite} />
        </div>
        <p>{option}</p>
      </button>

      <div className="nav-options">
        {activeMenu?.items &&
          activeMenu.items.map((item) =>
            !item.title.includes("Sizes") ? (
              <Accordion title={item.title} children={item.children} />
            ) : activeMenu.name.includes("Kids") ? (
              <Accordion title={item.title} children={item.children} />
            ) : (
              ""
            )
          )}
      </div>
    </div>
  );
};

export default NavbarOption;
