"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeesController_1 = require("./../controllers/employeesController");
const authController_1 = require("./../controllers/authController");
const employeeRouter = express_1.default.Router();
employeeRouter
    .route("/")
    .get(employeesController_1.getAllEmployees)
    .post(authController_1.checkAuthentication, employeesController_1.createEmployee);
employeeRouter
    .route("/:empID")
    .get(authController_1.checkAuthentication, employeesController_1.getEmployeeById)
    .put(authController_1.checkAuthentication, employeesController_1.updateEmployeeById)
    .delete(authController_1.checkAuthentication, employeesController_1.deleteEmployeeById);
exports.default = employeeRouter;
//# sourceMappingURL=employeesRouter.js.map