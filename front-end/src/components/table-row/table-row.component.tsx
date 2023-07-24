import React, { useContext } from "react";
import { EmployeesContext } from "../../contexts/employees.context";
import { LoginContext } from "../../contexts/login.context";
import { BiEditAlt, BiTrash } from "react-icons/bi";

import "./table-row.styles.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type TableRowProps = {
  employee: {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    createdAt: string;
    group: string;
    attendance: string;
  };
};

const TableRow = ({ employee }: TableRowProps) => {
  const { setAllEmployees } = useContext(EmployeesContext);
  const { token } = useContext(LoginContext);

  const navigate = useNavigate();

  const updateEmployeeHandler = async () => {
    if (!token) {
      return alert("You should login first");
    }
    navigate("update", { state: employee });
  };

  const deleteEmployeeHandler = async () => {
    try {
      await axios.delete(
        `https://hr-system-api-wb2y.onrender.com/api/v1/employees/${employee._id}`,
        {
          headers: {
            "jwt-token": localStorage.getItem("jwt"),
            "Content-Type": "application/json",
          },
        }
      );

      setAllEmployees();
    } catch (error: any) {
      const status: number = error.response.status;
      const message: string = error.response.data.message;

      if (status === 401) {
        alert("you should login first, or be HR member to do this action");
      } else alert(message);
    }
  };

  return (
    <div className="table-row">
      <span className="user-name-container">
        <p className="user-name-text">{`${employee.firstname} ${employee.lastname}`}</p>
        <span className="user-email-text">{employee.email}</span>
      </span>
      <span>
        <span className="tag admin">{employee.group}</span>
      </span>
      <span>{employee.createdAt.split("T")[0]}</span>
      <span>{employee.group}</span>
      <div className="action-container">
        <span onClick={updateEmployeeHandler}>
          <BiEditAlt />
        </span>
        <span onClick={deleteEmployeeHandler}>
          <BiTrash />
        </span>
      </div>
    </div>
  );
};

export default TableRow;
