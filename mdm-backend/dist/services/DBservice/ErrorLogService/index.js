"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const auditLogs_1 = __importDefault(require("../MockDBData/auditLogs"));
const utilities_1 = require("../../../utilities");
const mockUtilities_1 = require("../../../mockUtilities");
dotenv_1.default.config();
const RUN_MODE = process.env.RUN_MODE || "dev";
exports.default = {
    getErrorLogs: (filters) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/error_log/get_all_error_log", filters);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(auditLogs_1.default);
            resolve((0, mockUtilities_1.getPaginatedResponse)(rawResponse, filters));
        });
    },
};
