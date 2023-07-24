import React, { FormEvent, useContext, useRef, useEffect } from "react";
import { EmployeesContext } from "../../contexts/employees.context";

import "./update-user.styles.scss";
import axios from "axios";

import { useNavigate, useLocation } from "react-router";

type Employee = {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  createdAt: string;
  group: string;
  mobile: string;
  attendance: string;
};

const UpdateUser = () => {
  const formElement = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const { setAllEmployees } = useContext(EmployeesContext);

  const state = useLocation().state as Employee;

  useEffect(() => {}, []);

  const cancelUpdateHandler = () => {
    navigate("/");
  };

  const updateUserHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstname = formElement?.current?.["firstname"].value;
    const lastname = formElement?.current?.["lastname"].value;
    const username = formElement?.current?.["username"].value;
    const mobile = formElement?.current?.["mobile"].value;
    const email = formElement?.current?.["email"].value;
    const group = formElement?.current?.["group"].value;

    await axios.put(
      `https://hr-system-api-wb2y.onrender.com/api/v1/employees/${state._id}`,
      {
        firstname,
        lastname,
        username,
        mobile,
        email,
        group,
      },
      {
        headers: {
          "jwt-token": localStorage.getItem("jwt"),
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    setAllEmployees();
    navigate("/");
  };

  return (
    <div className={`update-user-page`}>
      <div className="update-user-container">
        <div className="update-user-header">
          <p>Update User</p>
          <span className="cross" onClick={cancelUpdateHandler}>
            {" "}
            &#10799;
          </span>
        </div>
        <form ref={formElement} onSubmit={updateUserHandler}>
          <div className="update-user-form-section">
            <div className="user-name">
              <input
                name="firstname"
                required
                type="text"
                placeholder="First Name*"
                defaultValue={state.firstname}
              />
              <input
                name="lastname"
                required
                type="text"
                placeholder="Last Name*"
                defaultValue={state.lastname}
              />
            </div>
            <div className="user-data">
              <input
                name="email"
                required
                type="email"
                placeholder="Email*"
                disabled
                defaultValue={state.email}
              />
              <input
                name="mobile"
                type="text"
                placeholder="Mobile No"
                defaultValue={state.mobile}
              />
              <select name="group" required defaultValue={state.group}>
                <option value="hr">HR</option>
                <option value="employee">EMPLOYEE</option>
              </select>
            </div>
            <div className="user-password">
              <input
                name="username"
                type="text"
                placeholder="Username"
                defaultValue={state.username}
              />
            </div>
          </div>
          <div className="update-user-footer">
            <button type="submit">Update user</button>
            <button type="button" onClick={cancelUpdateHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
