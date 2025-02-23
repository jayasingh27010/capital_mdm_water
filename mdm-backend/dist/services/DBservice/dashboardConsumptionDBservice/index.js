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
    getDashboardMeterConsumptionGraph: (user_id, year, requestType) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/dashboard/get_consumer_consumption_graph_by_consumer_id_daily", { user_id, year, requestType });
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
        });
    },
    getDashboardMeterConsumptionGraphweekly: (user_id, month, requestType) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/dashboard/get_consumer_consumption_graph_by_consumer_id_daily", { user_id, month, requestType });
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
        });
    },
    getDashboardMeterConsumptionGraphDaily: (user_id, startDate, endDate, requestType) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/dashboard/get_consumer_consumption_graph_by_consumer_id_daily", { user_id, startDate, endDate, requestType });
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
        });
    },
};
