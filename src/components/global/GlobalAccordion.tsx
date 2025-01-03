import React, { useState, useRef } from "react";
import gsap from "gsap";
import useCustomEffect from "../../hooks/useCustomEffect";
import AddIcon from "../../assets/icons/AddIcon";
import { useGlobalContext } from "../contexts/GlobalContex";

interface AccordionProps {
  title: string;
  children: any[];
}

const GlobalAccordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const {colors} = useGlobalContext();

  useCustomEffect(() => {
    const tl = gsap.timeline();
    if (isOpen) {
      tl.to(containerRef.current, {
        gridTemplateRows: "60px 1fr",
        paddingBottom: 20,
      });

      tl.to(contentRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(contentRef.current, {
        opacity: 0,
      });

      gsap.to(containerRef.current, {
        gridTemplateRows: "60px 0fr",
        paddingBottom: 0,
        delay: 0.25,
      });
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="global-accordion">
      <button onClick={() => setIsOpen(!isOpen)} className="flex jc-sb">
        <p>{title}</p>
        <AddIcon color={colors.black} size={14} active={isOpen} />
      </button>
      <div ref={contentRef} onClick={(e) => e.stopPropagation()} className="content">
        {
          title.toLowerCase() === "prices" ? (
            <div className="child-item">
              
            </div>
          ) : (
            <>
            {children.map((child, i) => (
              <button key={i} className="child-item flex fd-c">
                {child}
              </button>
              ))}
            </>
          )
        }
      </div>
    </div>
  );
};

export default GlobalAccordion;