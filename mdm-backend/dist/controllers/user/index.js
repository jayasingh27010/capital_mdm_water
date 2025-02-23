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
const express_1 = __importDefault(require("express"));
const utilities_1 = require("../../utilities");
const DBservice_1 = __importDefault(require("../../services/DBservice"));
const userRouter = express_1.default.Router();
userRouter.post("/getUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        // const navigation = deepCopy(getNavigation)
        switch (tokenObj.accountTypeValue) {
            case "consumer":
                tokenObj.profileLink = `/admin/consumers/${tokenObj.userId}`;
                break;
            default:
                tokenObj.profileLink = `/admin/users/${tokenObj.userId}`;
        }
        return res.status(200).json(tokenObj);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: "INVALID_REQUEST"
        });
    }
}));
userRouter.post("/usernameExists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const users = (yield DBservice_1.default.User.usernameExists((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.username)).rows;
        if (users.length === 0) {
            return res.status(200).json({});
        }
        else {
            return res.status(400).json({
                message: "USERNAME_EXISTS"
            });
        }
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: "INVALID_REQUEST"
        });
    }
}));
userRouter.post("/adminExists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const projectName = (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.projectName) !== null && _b !== void 0 ? _b : "";
        if (!projectName) {
            return res.status(400).json({
                message: "PROJECT_ID_NOT_FOUND"
            });
        }
        if (projectName) {
            const users = (yield DBservice_1.default.User.adminExists(projectName)).rows;
            const adminExists = users.length > 0;
            return res.status(200).json({
                adminExists
            });
        }
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: "INVALID_REQUEST"
        });
    }
}));
exports.default = userRouter;
