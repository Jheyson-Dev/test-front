// InputContext.tsx
import { createContext, useState } from "react";

interface InputContextType {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const InputContext = createContext<InputContextType>({
  inputValue: "",
  setInputValue: () => {},
});

interface InputProviderProps {
  children: ReactNode;
}

export const InputHomeProvider: React.FC<InputProviderProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <InputContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </InputContext.Provider>
  );
};
