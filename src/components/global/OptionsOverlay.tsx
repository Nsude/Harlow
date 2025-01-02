import React, { ReactNode } from 'react'
import useCustomEffect from '../../hooks/useCustomEffect';
import { useCartContext } from '../contexts/CartContext';
import gsap from 'gsap';

interface Props {
  display?: boolean,
  children: ReactNode
}

const OptionsOverlay:React.FC<Props> = ({display, children}) => {
  
  useCustomEffect(() => {
    gsap.to(".options-overlay", {
      x: display ? "0%" : "110%",
      duration: 0.4,
    });
  }, [display]);



  return (
    // options-overlay
    <div className="options-overlay" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  )
}

export default OptionsOverlay;