"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const meters_1 = __importDefault(require("../MockDBData/meters"));
const utilities_1 = require("../../../utilities");
const mockUtilities_1 = require("../../../mockUtilities");
dotenv_1.default.config();
const RUN_MODE = process.env.RUN_MODE || "dev";
exports.default = {
    getConsumptionGraphData: (filters) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/get_consumer_consumption_graph_by_consumer_id", filters);
        }
        return new Promise((resolve) => {
            const rawResponse = (0, utilities_1.deepCopy)(meters_1.default);
            resolve((0, mockUtilities_1.getPaginatedResponse)(rawResponse, filters));
        });
    },
};
