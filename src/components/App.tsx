import { useEffect } from "react";
import useCustomEffect from "../hooks/useCustomEffect";
import { NavbarContextProvider } from "./contexts/NavbarContext";
import CursorTracker from "./CursorTracker";
import Footer from "./global/Footer";
import Homepage from "./HomePage/Homepage";
import Navbar from "./Navbar/Navbar";
import { killAnimations, refreshScrollTriggers } from "./utility-functions/gsapUtils";

function App() {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 1339) {
        // Kill animations for small screens
        killAnimations();
      } else {
        // Refresh ScrollTriggers for large screens
        refreshScrollTriggers();
      }
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      // Cleanup listener on unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      <CursorTracker />
      <Homepage />
    </div>
  );
}

export default App;
