"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthentication = exports.signIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("./../models/users");
const createSendToken = (tokenObj, statusCode, res) => {
    const token = jsonwebtoken_1.default.sign({ ...tokenObj["_doc"] }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const cookieOptions = {
        expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
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
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({
                status: "fail",
                message: "wrong email or password",
            });
        const user = await (0, users_1.getUserByEmail)(email).select("+password");
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
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch)
            return res.status(400).json({
                status: "fail",
                message: "wrong email or password",
            });
        createSendToken(user, 200, res);
    }
    catch (error) {
        return res.status(400).json({
            status: "fail",
            message: "There is an error while sign in.",
        });
    }
};
exports.signIn = signIn;
const checkAuthentication = async (req, res, next) => {
    try {
        const jwtToken = req.headers["jwt-token"];
        if (!jwtToken)
            return res.status(401).json({
                status: "fail",
                message: "Please log in to get access to this website",
            });
        const tokenPayload = jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET);
        const { email } = tokenPayload;
        const user = (0, users_1.getUserByEmail)(email);
        if (!user)
            return res.status(401).json({
                status: "fail",
                message: "Invalid Token.",
            });
        next();
    }
    catch (error) {
        return res.status(400).json({
            status: "fail",
            message: "There is an error while verify token.",
        });
    }
};
exports.checkAuthentication = checkAuthentication;
//# sourceMappingURL=authController.js.map