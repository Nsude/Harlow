import React, { ReactNode, useRef } from 'react'
import useCustomEffect from '../../hooks/useCustomEffect';
import { useCartContext } from '../contexts/CartContext';
import gsap from 'gsap';

interface Props {
  display?: boolean
  children: ReactNode
  rmPadding?: boolean
}

const OptionsOverlay:React.FC<Props> = ({display, children, rmPadding}) => {
  const containerRef = useRef(null);
  
  useCustomEffect(() => {
    gsap.to(containerRef.current, {
      x: display ? "0%" : "110%",
      duration: 0.4,
    });
  }, [display]);



  return (
    // options-overlay
    <div ref={containerRef} className='options-overlay' style={{paddingBottom: rmPadding ? 0 : 110}} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  )
}

export default OptionsOverlay;