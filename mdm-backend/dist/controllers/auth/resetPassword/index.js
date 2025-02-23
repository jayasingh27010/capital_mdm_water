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
const joi_1 = __importDefault(require("joi"));
const DBservice_1 = __importDefault(require("../../../services/DBservice"));
const utilities_1 = require("../../../utilities");
const utilities_2 = require("../../../utilities");
const logConsts_1 = require("../../logConsts");
const { Users } = logConsts_1.LOG_MODULE_CONSTS;
const { RESET_PASSWORD, } = logConsts_1.LOG_ACTION_CONSTS[Users];
const resetPasswordRouter = express_1.default.Router();
const resetPasswordSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    // password: Joi.string().required(),
});
resetPasswordRouter.post("/resetPassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield resetPasswordSchema.validateAsync(req.body);
        const tokenObj = (0, utilities_2.parseAuthTokenFromReq)(req);
        const { userId } = req.body;
        const data = yield DBservice_1.default.User.resetPassword(userId);
        (0, utilities_1.createLog)(tokenObj, Users, RESET_PASSWORD, data);
        if (data.status === "success") {
            return res.status(200).json({
                status: data.status,
                message: data.data
            });
        }
        else {
            return res.status(400).json({
                status: data.status,
                message: data.data || "Unable to reset password. Please try again"
            });
        }
    }
    catch (e) {
        if (e.isJoi) {
            return res.status(400).json({
                message: "INVALID_REQUEST",
                details: e.details
            });
        }
        return res.status(500).json({
            message: "INTERNAL_SERVER_ERROR"
        });
    }
}));
exports.default = resetPasswordRouter;
