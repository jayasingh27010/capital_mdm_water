"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const utilities_1 = require("../../../utilities");
dotenv_1.default.config();
const RUN_MODE = process.env.RUN_MODE || "dev";
exports.default = {
    getFinancials: () => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/financial/get_financials", {});
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                "openingBalance": "₹2.5L",
                "currentBalance": "₹2L"
            });
        });
    },
    getProjectFinancials: (projectId) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/financial/get_financials_by_project_id", { projectId });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                "openingBalance": "₹30,000",
                "currentBalance": "₹20,000"
            });
        });
    },
    getPrevMonthFinancials: (meterId) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/financial/get_prev_month_financials_by_meter_id", { meterId });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                "openingBalance": "₹5,000",
                "currentBalance": "₹2,000"
            });
        });
    },
    getThisMonthFinancials: (meterId) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/financial/get_this_month_financials_by_meter_id", { meterId });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                "openingBalance": "₹5,000",
                "currentBalance": "₹2,000"
            });
        });
    },
};
