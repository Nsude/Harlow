import { NavbarContextProvider } from "./contexts/NavbarContext";
import Homepage from "./HomePage/Homepage";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <NavbarContextProvider>
        <Navbar />
      </NavbarContextProvider>
    </div>
  );
}

export default App;
