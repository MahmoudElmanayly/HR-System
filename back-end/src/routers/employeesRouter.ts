import express from "express";

import {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} from "./../controllers/employeesController";

import { checkAuthentication } from "./../controllers/authController";

const employeeRouter = express.Router();

employeeRouter
  .route("/")
  .get(getAllEmployees)
  .post(checkAuthentication, createEmployee);

employeeRouter
  .route("/:empID")
  .get(checkAuthentication, getEmployeeById)
  .put(checkAuthentication, updateEmployeeById)
  .delete(checkAuthentication, deleteEmployeeById);

export default employeeRouter;
