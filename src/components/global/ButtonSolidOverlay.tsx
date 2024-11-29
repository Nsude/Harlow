import {gsap} from "gsap"
import useMousePos from "./hooks/useMousePos";
import { useGlobalContext } from "./contexts/globalContext"; 
import { useRef } from "react";
import useCustomEffect from "./hooks/useCustomEffect";
import LinkArrowIcon from "../assets/icons/LinkArrowIcon";

interface Props {
  arrowIcon?: boolean,
  text?: string,
  bg?: string, // bg color
  overlay?: string, // overlay color
  fg?: string, // text color after overlay
  defaultColor?: string //default text color
  iconFill?: string, // sets the link icon fill
  noBg?: boolean, // bg or no-bg
}

const ButtonSolidOverlay:React.FC<Props> = ({
  arrowIcon, text, bg, overlay, fg, defaultColor, iconFill, noBg
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkArrowRef = useRef<HTMLDivElement>(null)
  
  const mousePos = useMousePos();
  const {colors} = useGlobalContext();

  
  useCustomEffect(() => {
    if (!buttonRef.current) return;

    bg ? buttonRef.current.style.setProperty("--bg", `${bg}`) : "";
    fg ? buttonRef.current.style.setProperty("--fg", `${fg}`) : "";
    overlay ? buttonRef.current.style.setProperty("--overlay", `${overlay}`) : "";

    // set bg status
    if (!noBg) return;
    buttonRef.current.classList.add("no-bg")

  }, [])

  const getRelativePos = () => {
    const button = buttonRef.current;
    if (!button) return {rX: 0, rY: 0};
    
    const rect = button.getBoundingClientRect();
    const rX = mousePos.x - rect.left;
    const rY = mousePos.y - rect.top;
    return {rX, rY};
  }

  const growOverlay = () => {
    const { rX, rY } = getRelativePos();

    gsap.to(spanRef.current, {
      clipPath: `circle(0% at ${rX}px ${rY}px)`,
      duration: 0
    })

    // animate arrow icon
    const arrowTl = gsap.timeline();
    arrowTl.to(linkArrowRef.current, {
      xPercent: 100, 
      yPercent: -100,
      duration: .1
    })

    arrowTl.to(linkArrowRef.current, {
      xPercent: -100,
      yPercent: 100,
      duration: 0
    })

    arrowTl.to(linkArrowRef.current, {
      xPercent: 0,
      yPercent: 0,
      duration: .1
    })

    gsap.to(textRef.current, {
      color: fg || colors.ivory,
      duration: 0
    })

    gsap.to(spanRef.current, {
      clipPath: `circle(110% at ${rX}px ${rY}px)`,
      duration: .3
    })
  }

  const moveOverlay = () => {
    const { rX, rY } = getRelativePos();

    gsap.to(textRef.current, {
      color: fg || colors.ivory,
      duration: 0
    })

    gsap.to(spanRef.current, {
      clipPath: `circle(110% at ${rX}px ${rY}px)`,
      duration: .3
    })
  }

  const shrinkOverlay = () => {
    const { rX, rY } = getRelativePos();

    gsap.to(textRef.current, {
      color: defaultColor || colors.black
    })

    // animate arrow icon
    const arrowTl = gsap.timeline();
    arrowTl.to(linkArrowRef.current, {
      xPercent: -100, 
      yPercent: 100,
      duration: .1
    })

    arrowTl.to(linkArrowRef.current, {
      xPercent: 100,
      yPercent: -100,
      duration: 0
    })

    arrowTl.to(linkArrowRef.current, {
      xPercent: 0,
      yPercent: 0,
      duration: .1
    })

    gsap.to(spanRef.current, {
      clipPath: `circle(0% at ${rX}px ${rY}px)`,
      delay: 0
    })
  }
  
  return (
    <button ref={buttonRef} className="button-solid-overlay flex cg-5" onMouseEnter={() => growOverlay()} onMouseMove={() => moveOverlay()} onMouseLeave={() => {shrinkOverlay()}}>
      { arrowIcon ? 
        <div className="arrow-con"> 
          <div ref={linkArrowRef}> 
            <LinkArrowIcon size={10} color={iconFill} />
          </div>
        </div> : ""}
      <span ref={textRef}>{ text || "Get Started" }</span>
      <span ref={spanRef} className="btn-overlay"></span>
    </button>
  )
}

export default ButtonSolidOverlay;