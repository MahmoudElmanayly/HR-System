import React, { useContext } from "react";

import { LoginContext } from "../../contexts/login.context";

import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineFileDone,
  AiFillMediumCircle,
} from "react-icons/ai";

import { MdLogin } from "react-icons/md";

import SidebarButton from "./../sidebar-button/sidebar-button.component";

import "./sidebar.styles.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { token } = useContext(LoginContext);

  return (
    <div className="sidebar-container">
      <div className="logo-container">
        <AiFillMediumCircle className="logo" /> MGamil
      </div>
      <div className="nav-links-container">
        <Link to="" className="no-decoration">
          <SidebarButton ButtonIcon={AiOutlineHome} buttonText="Dashboard" />
        </Link>
        {/* <Link to="users" className="no-decoration">
          <SidebarButton ButtonIcon={AiOutlineTeam} buttonText="Users" />
        </Link> */}
        <Link to="attendance" className="no-decoration">
          <SidebarButton
            ButtonIcon={AiOutlineFileDone}
            buttonText="Attendance"
          />
        </Link>
        {!token && (
          <Link to="login" className="no-decoration login-button">
            <SidebarButton ButtonIcon={MdLogin} buttonText="Login" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
