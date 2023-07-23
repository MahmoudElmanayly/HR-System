import React, { useContext } from "react";

import "./attendance.styles.scss";
import AttendanceCard from "../../components/attendance-card/attendance-card.component";

import { EmployeesContext } from "../../contexts/employees.context";

const Attendance = () => {
  const { employees } = useContext(EmployeesContext);

  return (
    <div>
      <h1>ATTENDANCE</h1>
      <div className="attendance-container">
        {employees.map((emp) => (
          <AttendanceCard key={emp._id} employee={emp} />
        ))}
      </div>
    </div>
  );
};

export default Attendance;
