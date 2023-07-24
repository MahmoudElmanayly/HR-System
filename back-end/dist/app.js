"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const authController_1 = require("./controllers/authController");
const employeesRouter_1 = __importDefault(require("./routers/employeesRouter"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
// TO CHECK IF THE SERVER UP OR NOT
app.get("/healthz", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "working 👋",
    });
});
app.patch("/api/v1/signin", authController_1.signIn);
app.use("/api/v1/employees", employeesRouter_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map