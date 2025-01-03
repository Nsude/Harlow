import React, { useState, useRef } from "react";
import gsap from "gsap";
import useCustomEffect from "../../hooks/useCustomEffect";
import AddIcon from "../../assets/icons/AddIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import RangeSlider from "./RangeSlider";
import { Product } from "../../models";
import useMinMax from "../../hooks/useMinMax";
import { useCartContext } from "../contexts/CartContext";

interface AccordionProps {
  title: string;
  children: any[];
  products?: Product[];
  productType?: string
  handleClick: (sortValue: string) => void;
}

const GlobalAccordion: React.FC<AccordionProps> = ({ title, children, products, handleClick, productType}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const {colors} = useGlobalContext();
  const { value } = useMinMax((products || []), (productType || ''));
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0});
  const {setFilterDetails, filterDetails} = useCartContext();

  /* INIT PRICERANGE VALUES */ 
  useCustomEffect(() => {
    if (!value) return;
    setPriceRange({...value})
  }, [value])

  useCustomEffect(() => {
    if (!priceRange) return;
    setFilterDetails({...filterDetails, priceRange});
  }, [priceRange])

  /* OPEN AND CLOSE ACCORDION */
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
          title.toLowerCase() === "price" ? (
            <div className="child-item">
              <div className="price-range flex jc-sb cg-15">
                <div> $ {priceRange.min} </div>
                <span>to</span>
                <div> $ {priceRange.max} </div>
              </div>
              {
                value && 
                <div onClick={() => handleClick(title)}>
                  <RangeSlider min={value.min} max={value.max} setExternalRange={setPriceRange} />
                </div>
              }
            </div>
          ) : (
            <>
            {children.map((child, i) => (
              <button key={i} className="child-item flex fd-c" onClick={() => handleClick(title)}>
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