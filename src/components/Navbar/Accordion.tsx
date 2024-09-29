import React, { createRef, useEffect, useState } from "react";
import AddIcon from "../../assets/icons/AddIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const Accordion: React.FC<{ title: string; children: string[] }> = ({ title, children }) => {
  const { colors } = useGlobalContext();
  const [showChildren, setShowChildren] = useState<boolean>(false);

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

  return (
    <div ref={accordionConRef} className="accordion-container anim-option">
      <button onClick={() => setShowChildren(!showChildren)} className="flex jc-sb">
        <p>{title}</p>
        <AddIcon color={colors.offWhite} size={14} active={showChildren} />
      </button>
      <div ref={childrenConRef} onClick={(e) => e.stopPropagation()} className="children-con flex fd-c">
        {children &&
          children.map((child) => (
            <Link key={child} to={`/${encodeURIComponent(child)}`}>
              {child}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Accordion;
