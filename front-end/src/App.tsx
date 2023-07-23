import React from "react";
import { Routes, Route } from "react-router";

import Home from "./routes/home/home.component";
import Dashboard from "./routes/dashboard/dashboard.component";
import Users from "./routes/users/users.component";
import Attendance from "./routes/attendance/attendance.component";
import UpdateUser from "./components/update-user/update-user.component";
import Login from "./routes/login/login.component";

import "./app.scss";

function App() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="update" element={<UpdateUser />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
