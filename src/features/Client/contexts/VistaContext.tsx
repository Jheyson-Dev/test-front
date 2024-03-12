import { createContext, useState, ReactNode } from "react";

type TabOption = "lista" | "imagenes";

interface TabsContextType {
  tab: TabOption;
  setTab: React.Dispatch<React.SetStateAction<TabOption>>;
}

export const TabsContext = createContext<TabsContextType>({
  tab: "lista",
  setTab: () => {},
});

interface TabsProviderProps {
  children: ReactNode;
}

export const TabsProvider: React.FC<TabsProviderProps> = ({ children }) => {
  const [tab, setTab] = useState<TabOption>("lista");

  return (
    <TabsContext.Provider value={{ tab, setTab }}>
      {children}
    </TabsContext.Provider>
  );
};
