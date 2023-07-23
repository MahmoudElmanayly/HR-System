import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUserByEmail } from "./../models/users";

const createSendToken = (
  tokenObj: any,
  statusCode: number,
  res: express.Response
) => {
  const token = jwt.sign({ ...tokenObj["_doc"] }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "sucess",
    token,
    data: {
      ...tokenObj["_doc"],
    },
  });
};

export const signIn = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        status: "fail",
        message: "wrong email or password",
      });

    const user = await getUserByEmail(email).select("+password");
    if (!user)
      return res.status(400).json({
        status: "fail",
        message: "wrong email or password",
      });

    if (user.group !== "HR")
      return res.status(400).json({
        status: "fail",
        message: "Only HR employees can login",
      });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({
        status: "fail",
        message: "wrong email or password",
      });

    createSendToken(user, 200, res);
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "There is an error while sign in.",
    });
  }
};

export const checkAuthentication = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const jwtToken = req.headers["jwt-token"] as string;

    if (!jwtToken)
      return res.status(401).json({
        status: "fail",
        message: "Please log in to get access to this website",
      });

    const tokenPayload = jwt.verify(jwtToken, process.env.JWT_SECRET) as {
      email: string;
    };

    const { email } = tokenPayload;
    const user = getUserByEmail(email);

    if (!user)
      return res.status(401).json({
        status: "fail",
        message: "Invalid Token.",
      });

    next();
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "There is an error while verify token.",
    });
  }
};
