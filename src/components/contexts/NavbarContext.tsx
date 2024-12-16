import { createContext, ReactNode, useContext, useState } from "react";

interface MenuItem {
  title: string;
  children: string[];
}

export interface MenuList {
  name: string;
  items?: MenuItem[];
}

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuLists: MenuList[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const NavbarContext = createContext<NavbarProps | undefined>(undefined);

const useNavContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("Navbar context is undefined");
  }
  return context;
};

const year = new Date().getFullYear();
const menuItems: MenuItem[] = [
  {
    title: "New & Featured",
    children: ["New Arrivals", `Shop Summer ${year % 100}`, "Best Sellers"],
  },
  {
    title: "Footwear",
    children: ["Sneakers", "Running Shoes", "Basketball", "Bugdet Friendly"],
  },
  {
    title: "All",
    children: ["Tshirts", "Matching Sets", "Sweatshirts & Hoodies", "Jerseys", "Shorts", "Jackets"],
  },
  {
    title: "Sizes",
    children: ["All", "Infants", "Juniors", "Little Kids"],
  },
  {
    title: "Add-ons",
    children: ["All Accessories", "Bags", "Caps", "Socks"],
  },
  {
    title: "Brands",
    children: ["Nike", "New Balance", "Addidas", "Harlow"],
  },
];

const NavbarContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("");

  const menuLists: MenuList[] = [
    { name: "Explore" },
    { name: "Men", items: menuItems },
    { name: "Women", items: menuItems },
    { name: "Kids", items: menuItems },
    { name: "Sale" },
  ];

  return (
    <NavbarContext.Provider value={{ menuOpen, setMenuOpen, menuLists, selectedOption, setSelectedOption }}>
      {children}
    </NavbarContext.Provider>
  );
};

export { NavbarContextProvider, useNavContext };
