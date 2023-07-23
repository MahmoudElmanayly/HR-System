import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router";

import Sidebar from "./../../components/sidebar/sidebar.component";
import Header from "../../components/header/header.component";
import AddUser from "../../components/add-user/add-user.component";

import { AddUserContext } from "../../contexts/add-user.context";
import { LoginContext } from "../../contexts/login.context";

import "./home.styles.scss";

const Home = () => {
  const { isVisible } = useContext(AddUserContext);

  return (
    <>
      <div className="add-user-page">{isVisible && <AddUser />}</div>
      <main className="home-container">
        <aside className="sidebar">{<Sidebar />}</aside>
        <section className="content-section">
          <header className="header-bar">
            <Header />
          </header>
          <section className="outlet-content">{<Outlet />}</section>
        </section>
      </main>
    </>
  );
};

export default Home;
