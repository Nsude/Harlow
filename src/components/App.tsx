import { NavbarContextProvider } from "./contexts/NavbarContext";
import CursorTracker from "./CursorTracker";
import Homepage from "./HomePage/Homepage";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <CursorTracker />
      <NavbarContextProvider>
        <Navbar />
      </NavbarContextProvider>
      <Homepage />
    </div>
  );
}

export default App;
