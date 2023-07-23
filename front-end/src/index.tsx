import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AddUserProvider } from "./contexts/add-user.context";
import { EmployeesProvider } from "./contexts/employees.context";
import { LoginProvider } from "./contexts/login.context";

import "./index.scss";
import App from "./App";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LoginProvider>
          <AddUserProvider>
            <EmployeesProvider>
              <App />
            </EmployeesProvider>
          </AddUserProvider>
        </LoginProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
