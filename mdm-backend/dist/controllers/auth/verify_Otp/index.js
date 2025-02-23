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
const verifyOtpRouter = express_1.default.Router();
const verifyOtpSchema = joi_1.default.object({
    otpTimeout: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    OtpGenerated: joi_1.default.string().required(),
});
const newPasswordSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
verifyOtpRouter.post("/user/verify_otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield verifyOtpSchema.validateAsync(req.body);
        const { username, OtpGenerated, otpTimeout } = req.body;
        const data = yield DBservice_1.default.User.verifyUserForOtp(username, OtpGenerated, otpTimeout);
        if (data.status === "success") {
            return res.status(200).json({
                status: data.status,
                message: data.data
            });
        }
        else {
            return res.status(400).json({
                status: data.status,
                message: data.data || "Unable to send OTP. Please try again."
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
verifyOtpRouter.post("/user/new_password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield newPasswordSchema.validateAsync(req.body);
        const { username, password } = req.body;
        const data = yield DBservice_1.default.User.forgotPassword(username, password);
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
exports.default = verifyOtpRouter;
