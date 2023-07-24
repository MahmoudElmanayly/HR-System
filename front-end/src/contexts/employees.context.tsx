import axios from "axios";
import { ReactNode, createContext, useState } from "react";

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

interface ContextType {
  employees: Employee[];
  filteredEmployees: Employee[];
  setAllEmployees: () => void;
  filterEmployees: (name: string) => void;
}

export const EmployeesContext = createContext<ContextType>({
  employees: [],
  filteredEmployees: [],
  setAllEmployees: () => {},
  filterEmployees: (name: string) => {},
});

type EmloyeesProviderProps = {
  children: ReactNode;
};

export const EmployeesProvider = ({ children }: EmloyeesProviderProps) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  const setAllEmployees = async () => {
    try {
      const res = await axios.get(
        "https://hr-system-api-wb2y.onrender.com/api/v1/employees",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      const arrOfEmps = res.data.data;

      setEmployees(arrOfEmps);
      setFilteredEmployees(arrOfEmps);
    } catch (error) {
      return alert(error);
    }
  };

  const filterEmployees = (name: string) => {
    const filteredEmps = employees.filter(
      (emp) =>
        emp.firstname.toLowerCase().includes(name.toLowerCase()) ||
        emp.lastname.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredEmployees(filteredEmps);
  };

  const value = {
    employees,
    filteredEmployees,
    setAllEmployees,
    filterEmployees,
  };

  return (
    <EmployeesContext.Provider value={value}>
      {children}
    </EmployeesContext.Provider>
  );
};
