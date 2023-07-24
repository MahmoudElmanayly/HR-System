import React, { useContext, useEffect } from "react";
import { AddUserContext } from "../../contexts/add-user.context";
import { EmployeesContext } from "../../contexts/employees.context";

import SearchBar from "../../components/search-bar/search-bar.component";
import Table from "../../components/table/table.component";

import "./dashboard.styles.scss";

const Dashboard = () => {
  const { toggleVisibility } = useContext(AddUserContext);
  const { filteredEmployees, setAllEmployees } = useContext(EmployeesContext);

  useEffect(() => {
    setAllEmployees();
  }, []);

  const openAddUserPopupHandler = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return alert("You should login first");
    }
    toggleVisibility();
  };

  return (
    <div className="users-container">
      <div className="users-title">Users Dashboard</div>
      <div className="search-and-add-users">
        <div className="users-search-bar">
          <SearchBar />
        </div>
        <div className="users-add-button">
          <button onClick={openAddUserPopupHandler}>
            Add user <span>&#43;</span>
          </button>
        </div>
      </div>
      <div className="users-table">
        <Table employees={filteredEmployees} />
      </div>
    </div>
  );
};

export default Dashboard;
