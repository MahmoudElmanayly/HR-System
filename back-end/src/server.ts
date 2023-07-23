import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./app";

dotenv.config();

const server = http.createServer(app);

const serverPort = process.env.PORT || 8880;
server.listen(serverPort, () => {
  console.log(`Server running on http://localhost:${serverPort}/`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.DATABASE_CONNECTION);
mongoose.connection.on("error", (error: Error) => console.log(error));
