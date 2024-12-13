import React, { useRef } from 'react'
import image from "../../assets/media/images/image-section.webp";
import gsap from 'gsap';
import useCustomEffect from '../../hooks/useCustomEffect';

const ImageSection = () => {
  const span1Ref = useRef<HTMLHeadingElement | null>(null);
  const span2Ref = useRef<HTMLHeadingElement | null>(null);
  const textsCon = useRef<HTMLDivElement | null>(null);
  const imageCon = useRef<HTMLDivElement | null>(null);
  const nextSectionIn = useRef<HTMLDivElement | null>(null);

  useCustomEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
    if (!span1Ref.current || !span2Ref.current || !textsCon.current || !nextSectionIn.current || !imageCon.current) return null;
    if (window.innerWidth < 1340) return null;

    gsap.to(span1Ref.current, {
      x: -400,
      scrollTrigger: {
        trigger: '.image-section-container',
        scrub: 1,
        start: "top 60%",
        end: "max"
      }
    })

    gsap.to(span2Ref.current, {
      x: 370,
      scrollTrigger: {
        trigger: '.image-section-container',
        scrub: 1,
        start: "top 60%",
        end: "max"
      }
    })

    gsap.to(textsCon.current, {
      yPercent: -150, 
      scrollTrigger: {
        trigger: '.image-section-container',
        scrub: 1,
        start: 'top 60%'
      }
    })

    gsap.to(nextSectionIn.current, {
      yPercent: -95, 
      scrollTrigger: {
        trigger: '.image-section-container',
        scrub: 1,
        start: 'top 0%'
      }
    })

  })

  return (
    <div className="image-section-container">
      <div ref={textsCon} className="texts">
        <h2>Shop <br /> mad max II</h2>
        <div className='flex split-text-con'>
          <h2 ref={span1Ref}>colle</h2> 
          <h2 ref={span2Ref}>ction</h2>
        </div>
      </div>
      <div ref={imageCon} className="image-con">
        <img src={image} alt="images-of-a-model" />
      </div>
      <div ref={nextSectionIn} className="next-section-in"></div>
    </div>
  )
}

export default ImageSection;