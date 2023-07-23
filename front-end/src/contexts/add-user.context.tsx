import { ReactNode, createContext, useState } from "react";

export const AddUserContext = createContext({
  isVisible: false,
  toggleVisibility: () => {},
});

type AddUserProviderProps = {
  children: ReactNode;
};

export const AddUserProvider = ({ children }: AddUserProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevVis) => !prevVis);
  };

  const value = { isVisible, toggleVisibility };

  return (
    <AddUserContext.Provider value={value}>{children}</AddUserContext.Provider>
  );
};
