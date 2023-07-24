import React, { useRef, useContext } from "react";
import { Calendar } from "react-multi-date-picker";

import "./attendance-card.styles.scss";
import axios from "axios";

import { EmployeesContext } from "../../contexts/employees.context";

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

interface IAttendanceProps {
  employee: Employee;
}

const AttendanceCard = ({ employee }: IAttendanceProps) => {
  const { setAllEmployees } = useContext(EmployeesContext);

  const attendance = useRef("");

  const attendanceDates = employee?.attendance
    ?.split(",")
    .map((d) => new Date(d));

  const updateAttendanceHandler = async () => {
    try {
      const newAttendance = attendance.current;
      await axios.put(
        `https://hr-system-api.onrender.com/api/v1/employees/${employee._id}`,
        {
          attendance: newAttendance,
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
    } catch (error: any) {
      const status: number = error.response.status;
      const message: string = error.response.data.message;

      if (status === 401) {
        alert("you should login first, or be HR member to do this action");
      } else alert(message);
    }
  };

  return (
    <div className="card">
      <div className="calendar-header">
        <span>{`${employee.firstname} ${employee.lastname}`}</span>
        <button onClick={updateAttendanceHandler}>Attendance +</button>
      </div>
      <Calendar
        shadow={false}
        multiple
        value={attendanceDates}
        onChange={(val) => {
          attendance.current = val?.toString() as string;
        }}
      />
    </div>
  );
};

export default AttendanceCard;
