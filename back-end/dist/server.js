"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.default);
const serverPort = process.env.PORT || 8880;
server.listen(serverPort, () => {
    console.log(`Server running on http://localhost:${serverPort}/`);
});
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(process.env.DATABASE_CONNECTION);
mongoose_1.default.connection.on("error", (error) => console.log(error));
//# sourceMappingURL=server.js.map