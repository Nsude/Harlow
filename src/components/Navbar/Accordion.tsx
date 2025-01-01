import React, { createRef, useEffect, useState } from "react";
import AddIcon from "../../assets/icons/AddIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useNavContext } from "../contexts/NavbarContext";

interface Props {
  title: string;
  children: string[];
  activeOption: string;
}

const Accordion: React.FC<Props> = ({ title, children, activeOption }) => {
  const { colors } = useGlobalContext();
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setMenuOpen } = useNavContext();

  /* Element Refs */
  const accordionConRef = createRef<HTMLDivElement>();
  const childrenConRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const tl = gsap.timeline();
    if (showChildren) {
      tl.to(accordionConRef.current, {
        gridTemplateRows: "60px 1fr",
        paddingBottom: 20,
      });

      tl.to(childrenConRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(childrenConRef.current, {
        opacity: 0,
      });

      gsap.to(accordionConRef.current, {
        gridTemplateRows: "60px 0fr",
        paddingBottom: 0,
        delay: 0.25,
      });
    }
  }, [showChildren]);

  const handleClick = (product: string, title: string) => {
    if (!product) return;
    navigate(`/view-products/${activeOption}/${title}/${product}`);
    setMenuOpen(false);
  };

  return (
    <div ref={accordionConRef} className="accordion-container anim-option">
      <button onClick={() => setShowChildren(!showChildren)} className="flex jc-sb">
        <p>{title}</p>
        <AddIcon color={colors.offWhite} size={14} active={showChildren} />
      </button>
      <div ref={childrenConRef} onClick={(e) => e.stopPropagation()} className="children-con flex fd-c">
        {children &&
          children.map((child, i) => (
            <button key={i} className="child-item" onClick={() => handleClick(child, title)}>
              {child}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Accordion;
