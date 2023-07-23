import express from "express";
import bcrypt from "bcrypt";
import {
  getUserByEmail,
  createUser,
  getUsers,
  deleteUserById,
  updateUserById,
} from "./../models/users";

export const getAllEmployees = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const empolyees = await getUsers();
    res.status(200).json({ status: "sucess", data: empolyees });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Error while getting all empolyees",
    });
  }
};

export const createEmployee = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { firstname, lastname, username, email, mobile, group, password } =
      req.body;

    if (!firstname || !lastname || !username || !email || !group || !password) {
      return res.status(400).json({
        status: "fail",
        message: "invalid fields",
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return res.status(400).json({
        status: "fail",
        message: `this email ${email} in use. try another email.`,
      });

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      email,
      username,
      firstname,
      lastname,
      password: encryptedPassword,
      group,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: "There is an error while creating user.",
    });
  }
};

export const getEmployeeById = async (
  req: express.Request,
  res: express.Response
) => {};

export const updateEmployeeById = async (
  req: express.Request,
  res: express.Response
) => {
  const empId = req.params.empID;
  const userUpdates = req.body;

  await updateUserById(empId, userUpdates);

  res.status(200).json({
    status: "sucess",
    message: "user updated",
  });
};

export const deleteEmployeeById = async (
  req: express.Request,
  res: express.Response
) => {
  const empId = req.params.empID;
  await deleteUserById(empId);

  res.status(200).json({
    status: "sucess",
    message: "user deleted",
  });
};
