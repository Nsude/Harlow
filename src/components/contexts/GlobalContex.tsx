import { createContext, ReactNode, useContext } from "react";

interface GlobalProps {
  colors: { offWhite: string; black: string; accent: string };
}

const GlobalContext = createContext<GlobalProps | undefined>(undefined);

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Global Context is undefined");
  }
  return context;
};

const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const colors = { offWhite: "#FAF9F6", black: "#171717", accent: "#F060E2" };

  return <GlobalContext.Provider value={{ colors }}>{children}</GlobalContext.Provider>;
};

export { GlobalContextProvider, useGlobalContext };
