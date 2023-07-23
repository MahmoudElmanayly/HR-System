import React, { FormEvent, useContext } from "react";
import axios from "axios";

import { LoginContext } from "../../contexts/login.context";

import { useNavigate } from "react-router-dom";
import { BsTwitter, BsGoogle } from "react-icons/bs";
import { ImFacebook } from "react-icons/im";

import "./login.styles.scss";

const Login = () => {
  const navigate = useNavigate();

  const { addUser } = useContext(LoginContext);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
      const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

      const response = await axios.patch(
        "http://localhost:8080/api/v1/signin",
        {
          email,
          password,
        },
        {
          // withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
          },
        }
      );

      const jwtToken = response.data.token;

      localStorage.setItem("jwt", jwtToken);
      addUser({ user: response.data.data, token: jwtToken });

      navigate("/");
    } catch (error: any) {
      console.log(error);
      alert(error?.response?.data.message || error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmitHandler}>
        <div className="form-header">
          <span className="form-title">Login</span>
          <div className="social-icons-container">
            <BsGoogle className="social-icon" />
            <BsTwitter className="social-icon" />
            <ImFacebook className="social-icon" />
          </div>
        </div>

        <div className="form-fields">
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>

        <button type="submit">LOG IN</button>
      </form>
    </div>
  );
};

export default Login;
