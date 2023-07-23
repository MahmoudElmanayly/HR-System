import React from "react";

import TableRow from "../table-row/table-row.component";

import "./table.styles.scss";

type TableProps = {
  employees: {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    createdAt: string;
    group: string;
    attendance: string;
  }[];
};

const Table = ({ employees }: TableProps) => {
  return (
    <div className="users-table">
      <div className="table-title">List Users</div>
      <div className="table-header">
        <span>Name</span>
        <span></span>
        <span>Create Date</span>
        <span>Role</span>
        <span className="action-header">Action</span>
      </div>
      <div className="table-rows-container">
        {employees.map((emp) => (
          <TableRow key={emp._id} employee={emp} />
        ))}
      </div>
    </div>
  );
};

export default Table;
