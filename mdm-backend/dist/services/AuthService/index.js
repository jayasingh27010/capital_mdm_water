"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "dfdfhchgh";
exports.default = {
    verify: (token) => {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
            return decoded;
        }
        catch (e) {
            console.log(e);
        }
        return false;
    },
    encode: (obj) => {
        return (0, jsonwebtoken_1.sign)(obj, JWT_SECRET);
    }
};
