import { ReactNode, createContext, useState } from "react";
import axios from "axios";

type Employee = {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  createdAt: string;
  group: string;
  mobile: string;
  attendance: string[];
};

interface IUserContext {
  token: string;
  user: Employee;
}

interface ILoginContext extends IUserContext {
  addUser: (data: IUserContext) => void;
  deleteUser: () => void;
}

const defaultState = {
  token: "",
  user: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    group: "",
    createdAt: "",
    username: "",
    mobile: "",
    attendance: [],
  },
  addUser: (data: IUserContext) => {},
  deleteUser: () => {},
};

export const LoginContext = createContext<ILoginContext>(defaultState);

type LoginProviderProps = {
  children: ReactNode;
};

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<Employee>(defaultState.user);

  const addUser = (data: IUserContext) => {
    setToken(data.token);
    setUser(data.user);
  };

  const deleteUser = () => {
    localStorage.removeItem("jwt");
    setToken("");
    setUser(defaultState.user);
  };

  const value = {
    token,
    user,
    addUser,
    deleteUser,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
