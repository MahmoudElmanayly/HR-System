import React, { useContext } from "react";
import { EmployeesContext } from "../../contexts/employees.context";

import "./search-bar.styles.scss";

const SearchBar = () => {
  const { filterEmployees } = useContext(EmployeesContext);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterEmployees(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="search-bar-input"
      onChange={onChangeHandler}
    />
  );
};

export default SearchBar;
