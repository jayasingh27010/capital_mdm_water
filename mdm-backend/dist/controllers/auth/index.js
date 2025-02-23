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
const DBservice_1 = __importDefault(require("../../services/DBservice"));
const AuthService_1 = __importDefault(require("../../services/AuthService"));
const authRouter = express_1.default.Router();
const tryLoginSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
authRouter.post("/tryLogin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // $2a$10$bmR4rlWiZ2CspS11YzDj/uKtm0MFrboTDCjApQmGxVTg5lkMIATDi
        yield tryLoginSchema.validateAsync(req.body);
        const { username, password } = req.body;
        const data = yield DBservice_1.default.User.isValidUser(username, password);
        const { rows } = data;
        if (rows.length === 0) {
            return res.status(400).json({
                message: "INVALID_CREDENTIALS"
            });
        }
        const user = rows[0];
        if (!(user === null || user === void 0 ? void 0 : user.enabled)) {
            return res
                .status(400)
                .json({
                message: "ACCOUNT_DISABLED"
            });
        }
        if (user.hasOwnProperty("password")) {
            delete user.password;
        }
        user.tokenCreationTime = Date.now();
        return res.status(200).json({
            token: AuthService_1.default.encode(user)
        });
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
        // // if(e.name === "AggregateError"){
        // //     res
        // //     .status(400)
        // //     .json({message:"ECONNREFUSED"})
        // // }
        // res
        // .status(400)
        // .json({
        //     message: "INVALID_REQUEST"
        // })
    }
}));
exports.default = authRouter;
