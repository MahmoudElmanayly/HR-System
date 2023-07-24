"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserByEmail = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: String,
    group: {
        type: String,
        required: true,
        uppercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    attendance: {
        type: String,
        default: "",
    },
});
const UserModel = mongoose_1.default.model("User", userSchema);
const getUsers = () => UserModel.find();
exports.getUsers = getUsers;
const getUserByEmail = (_email) => UserModel.findOne({ email: _email });
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => UserModel.findById(id);
exports.getUserById = getUserById;
const createUser = (values) => new UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserById = (id) => UserModel.findOneAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => UserModel.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
exports.default = UserModel;
//# sourceMappingURL=users.js.map