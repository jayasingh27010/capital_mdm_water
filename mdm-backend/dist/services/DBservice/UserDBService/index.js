"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("../MockDBData/users"));
const utilities_1 = require("../../../utilities");
const mockUtilities_1 = require("../../../mockUtilities");
dotenv_1.default.config();
const RUN_MODE = process.env.RUN_MODE || "dev";
exports.default = {
    createUser: (payload) => {
        if (RUN_MODE != "dev") {
            console.log(payload);
            return (0, utilities_1.makeCall)("POST", "/user/create_user", Object.assign({}, payload));
            // return new Promise(resolve => resolve({}))
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully added"
            });
        });
    },
    changePassword: (payload) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/user/change_password", Object.assign({}, payload));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully edited"
            });
        });
    },
    resetPassword: (payload) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/user/reset_password", { userId: payload });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully edited"
            });
        });
    },
    editUser: (payload) => {
        if (payload.designation === 'admin') {
            payload.accessLevel = 2;
        }
        else if (payload.designation === 'vendingManager') {
            payload.accessLevel = 3;
        }
        else if (payload.designation === 'accountManager') {
            payload.accessLevel = 4;
        }
        else if (payload.designation === "operationManager") {
            payload.accessLevel = 5;
        }
        else {
            payload.accessLevel = 2;
        }
        console.log(payload, "payloadddd");
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/user/edit_user", Object.assign({}, payload));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully edited"
            });
        });
    },
    deleteUser: (payload) => {
        if (RUN_MODE != "dev") {
            return new Promise((_, reject) => {
                reject(new Error("Not Implemented"));
            });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully deleted"
            });
        });
    },
    disableUser: (payload) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/user/disable_user", Object.assign(Object.assign({}, payload), { userId: payload.id }));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully disabled"
            });
        });
    },
    enableUser: (payload) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/user/enable_user", Object.assign(Object.assign({}, payload), { userId: payload.id }));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully enabled"
            });
        });
    },
    isValidUser: (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE !== "dev") {
            return (0, utilities_1.makeCall)("POST", "/user/is_valid_user", { userName: username, password });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers = (0, utilities_1.deepCopy)(users_1.default).rows;
            const foundUser = mockUsers.find((user) => user.userName === username && user.password === password);
            if (foundUser) {
                resolve({ rows: [foundUser], totalRecords: 1 });
            }
            else {
                resolve({ rows: [], totalRecords: 0 });
            }
        });
    }),
    usernameExists: (username) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE !== "dev") {
            return (0, utilities_1.makeCall)("POST", '/user/user_name_exist', { userName: username });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers = (0, utilities_1.deepCopy)(users_1.default).rows;
            const foundUser = mockUsers.find((user) => user.userName === username);
            if (foundUser) {
                resolve({ rows: [foundUser], totalRecords: 1 });
            }
            else {
                resolve({ rows: [], totalRecords: 0 });
            }
        });
    }),
    verifyUserForgotPassword: (username) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE !== "dev") {
            return (0, utilities_1.makeCall)("POST", '/user/forget_password', { userName: username });
        }
        return new Promise((resolve) => {
            const mockUsers = (0, utilities_1.deepCopy)(users_1.default).rows;
            const foundUser = mockUsers.find((user) => user.userName === username);
            if (foundUser) {
                resolve({ data: [foundUser], status: "success" });
            }
            else {
                resolve({ data: [], status: "error" });
            }
        });
    }),
    verifyUserForOtp: (username, otpGenerated, otpTimeout) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE !== "dev") {
            return (0, utilities_1.makeCall)("POST", '/user/verify_otp', { userName: username, OtpGenerated: otpGenerated, otpTimeout: otpTimeout });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers = (0, utilities_1.deepCopy)(users_1.default).rows;
            const foundUser = mockUsers.find((user) => user.userName === username);
            if (foundUser) {
                resolve({ data: [foundUser], status: "success" });
            }
            else {
                resolve({ data: [], status: "error" });
            }
        });
    }),
    forgotPassword: (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE !== "dev") {
            return (0, utilities_1.makeCall)("POST", '/user/new_password', { userName: username, password: password });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers = (0, utilities_1.deepCopy)(users_1.default).rows;
            const foundUser = mockUsers.find((user) => user.userName === username);
            if (foundUser) {
                resolve({ data: [foundUser], status: "success" });
            }
            else {
                resolve({ data: [], status: "error" });
            }
        });
    }),
    adminExists: (projectId) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE !== "dev") {
            return (0, utilities_1.makeCall)("POST", "/user/admin_exists", { projectId });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers = (0, utilities_1.deepCopy)(users_1.default).rows;
            const foundUser = mockUsers.find((user) => user.projectId === projectId && user.accessLevel === 2);
            if (foundUser) {
                resolve({ rows: [foundUser], totalRecords: 1 });
            }
            else {
                resolve({ rows: [], totalRecords: 0 });
            }
        });
    }),
    getSubUsers: (userId, filters) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE !== "dev") {
            return (0, utilities_1.makeCall)("POST", "/user/get_sub_users", Object.assign({ userId }, filters));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers = (0, utilities_1.deepCopy)(users_1.default).rows;
            const foundUser = mockUsers.find((user) => user.userId === userId);
            let finalUsers;
            if (foundUser) {
                switch (foundUser.accountTypeValue) {
                    case "superAdmin":
                        finalUsers = mockUsers.filter(user => user.accessLevel > foundUser.accessLevel);
                        break;
                    case "admin":
                        finalUsers = mockUsers
                            .filter(user => (user.accessLevel > foundUser.accessLevel ||
                            user.accessLevel === 1 ||
                            user.accessLevel === 2 ||
                            (user.accessLevel === 3 && user.projectId === foundUser.projectId)));
                        break;
                    default:
                        finalUsers = mockUsers
                            .filter(user => (user.projectId === foundUser.projectId ||
                            user.accessLevel === 1 ||
                            user.accessLevel === 2 && user.projectId === foundUser.projectId));
                }
                const rawResponse = { rows: finalUsers };
                resolve((0, mockUtilities_1.getPaginatedResponse)(rawResponse, filters));
            }
            else {
                resolve({ rows: [], totalRecords: 0 });
            }
        });
    }),
    getUserById: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE !== "dev") {
            return (0, utilities_1.makeCall)("POST", "/user/get_user_by_id", { userId });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers = (0, utilities_1.deepCopy)(users_1.default).rows;
            const foundUser = mockUsers.find((user) => user.userId === userId);
            if (foundUser) {
                resolve({ rows: [foundUser], totalRecords: 1 });
            }
            else {
                resolve({ rows: [], totalRecords: 0 });
            }
        });
    })
};
