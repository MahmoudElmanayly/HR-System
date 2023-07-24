"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeById = exports.updateEmployeeById = exports.getEmployeeById = exports.createEmployee = exports.getAllEmployees = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("./../models/users");
const getAllEmployees = async (req, res) => {
    try {
        const empolyees = await (0, users_1.getUsers)();
        res.status(200).json({ status: "sucess", data: empolyees });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Error while getting all empolyees",
        });
    }
};
exports.getAllEmployees = getAllEmployees;
const createEmployee = async (req, res) => {
    try {
        const { firstname, lastname, username, email, mobile, group, password } = req.body;
        if (!firstname || !lastname || !username || !email || !group || !password) {
            return res.status(400).json({
                status: "fail",
                message: "invalid fields",
            });
        }
        const existingUser = await (0, users_1.getUserByEmail)(email);
        if (existingUser)
            return res.status(400).json({
                status: "fail",
                message: `this email ${email} in use. try another email.`,
            });
        const encryptedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await (0, users_1.createUser)({
            email,
            username,
            firstname,
            lastname,
            password: encryptedPassword,
            group,
        });
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "fail",
            message: "There is an error while creating user.",
        });
    }
};
exports.createEmployee = createEmployee;
const getEmployeeById = async (req, res) => { };
exports.getEmployeeById = getEmployeeById;
const updateEmployeeById = async (req, res) => {
    const empId = req.params.empID;
    const userUpdates = req.body;
    await (0, users_1.updateUserById)(empId, userUpdates);
    res.status(200).json({
        status: "sucess",
        message: "user updated",
    });
};
exports.updateEmployeeById = updateEmployeeById;
const deleteEmployeeById = async (req, res) => {
    const empId = req.params.empID;
    await (0, users_1.deleteUserById)(empId);
    res.status(200).json({
        status: "sucess",
        message: "user deleted",
    });
};
exports.deleteEmployeeById = deleteEmployeeById;
//# sourceMappingURL=employeesController.js.map