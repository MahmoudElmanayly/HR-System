import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import { signIn } from "./controllers/authController";

import employeeRouter from "./routers/employeesRouter";

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: "*",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// TO CHECK IF THE SERVER UP OR NOT
app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "working 👋",
  });
});

app.patch("/api/v1/signin", signIn);

app.use("/api/v1/employees", employeeRouter);

export default app;
