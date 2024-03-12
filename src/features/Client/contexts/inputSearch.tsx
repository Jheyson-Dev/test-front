// InputContext.tsx
import { createContext, useState } from "react";

interface InputContextType {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const InputClientContext = createContext<InputContextType>({
  inputValue: "",
  setInputValue: () => {},
});

interface InputProviderProps {
  children: ReactNode;
}

export const InputClientProvider: React.FC<InputProviderProps> = ({
  children,
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <InputClientContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </InputClientContext.Provider>
  );
};
