import React, { useContext, useEffect } from "react";
import { useJwt } from "react-jwt";

import { LoginContext } from "../../contexts/login.context";

import { IoIosNotifications } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { FaAngleDown } from "react-icons/fa";

import "./header.styles.scss";

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

const Header = () => {
  let token = localStorage.getItem("jwt") as string;
  const { addUser, deleteUser } = useContext(LoginContext);

  if (!token) token = "no token";

  const { decodedToken } = useJwt(token);
  const user = decodedToken as Employee;

  const logOutHandler = () => {
    deleteUser();
  };

  useEffect(() => {
    if (token != "no token") {
      addUser({ token, user });
    }
  }, []);

  return (
    <div className="header-container">
      <div className="greeting-container">
        Hello, {user?.firstname}
        <br /> <span className="message">Have a nice day.</span>
      </div>
      {user && (
        <div className="profile-container">
          <div className="notification">
            <IoIosNotifications className="notification-icon" />
          </div>
          <div className="seperator"></div>
          <div className="profile">
            <VscAccount className="profile-icon" />
            <div className="profile-content">
              <span>{`${user.firstname} ${user.lastname}`}</span>
              <span className="profile-role">Admin</span>
            </div>
            <span>
              <FaAngleDown />
            </span>

            <div className="drop-menu">
              <button onClick={logOutHandler}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
