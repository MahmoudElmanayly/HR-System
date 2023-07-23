import React, { FormEvent, useContext, useRef } from "react";
import { AddUserContext } from "../../contexts/add-user.context";
import { EmployeesContext } from "../../contexts/employees.context";

import "./add-user.styles.scss";
import axios from "axios";

const AddUser = () => {
  const formElement = useRef<HTMLFormElement>(null);

  const { isVisible, toggleVisibility } = useContext(AddUserContext);
  const { setAllEmployees } = useContext(EmployeesContext);

  const cancelHandler = () => toggleVisibility();

  const addUserHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const password = formElement?.current?.["password"].value;
    const passwordConfirm = formElement?.current?.["passwordConfirm"].value;

    if (password != passwordConfirm) return alert("passwords doesn't match");

    const firstname = formElement?.current?.["firstname"].value;
    const lastname = formElement?.current?.["lastname"].value;
    const username = formElement?.current?.["username"].value;
    const email = formElement?.current?.["email"].value;
    const group = formElement?.current?.["group"].value;

    await axios.post(
      "http://localhost:8080/api/v1/employees",
      {
        firstname,
        lastname,
        username,
        password,
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
    toggleVisibility();
  };

  return (
    <div className={`add-user-page ${isVisible ? "is-visible" : ""}`}>
      <div className="add-user-container">
        <div className="add-user-header">
          <p>Add User</p>
          <span onClick={cancelHandler} className="cross">
            {" "}
            &#10799;
          </span>
        </div>
        <form ref={formElement} onSubmit={addUserHandler}>
          <div className="add-user-form-section">
            <div className="user-name">
              <input
                name="firstname"
                required
                type="text"
                placeholder="First Name*"
              />
              <input
                name="lastname"
                required
                type="text"
                placeholder="Last Name*"
              />
            </div>
            <div className="user-data">
              <input name="email" required type="email" placeholder="Email*" />
              <input name="mobile" type="text" placeholder="Mobile No" />
              <select name="group" required>
                <option value="" selected disabled hidden>
                  Select Group Tpye
                </option>
                <option value="hr">HR</option>
                <option value="employee">EMPLOYEE</option>
              </select>
            </div>
            <div className="user-password">
              <input name="username" type="text" placeholder="Username" />
              <input
                name="password"
                placeholder="Password*"
                required
                type="password"
              />
              <input
                name="passwordConfirm"
                required
                type="password"
                placeholder="Confirm Password*"
              />
            </div>
          </div>
          <div className="add-user-footer">
            <button type="submit">Add user</button>
            <button onClick={cancelHandler}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
