"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const gateways_1 = __importDefault(require("../MockDBData/gateways"));
const utilities_1 = require("../../../utilities");
const mockUtilities_1 = require("../../../mockUtilities");
dotenv_1.default.config();
const RUN_MODE = process.env.RUN_MODE || "dev";
exports.default = {
    createGateway: (payload) => {
        if (RUN_MODE != "dev") {
            console.log(payload);
            return (0, utilities_1.makeCall)("POST", "/gateway/create_gateway", payload);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Gateway successfully added"
            });
        });
    },
    editGateway: (payload) => {
        if (RUN_MODE != "dev") {
            console.log(payload);
            return (0, utilities_1.makeCall)("POST", "/gateway/edit_gateway", payload);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Gateway edited sucessfully"
            });
        });
    },
    getGateways: (filters) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/gateway/get_all_gateways", filters);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(gateways_1.default);
            resolve((0, mockUtilities_1.getPaginatedResponse)(rawResponse, filters));
        });
    },
    getGatewayStats: () => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/gateway/get_gateway_stats", {});
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                totalGateways: "50",
                liveGateways: "25"
            });
        });
    },
    getGatewayStatsByProjectId: (projectId) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/gateway/get_gateway_stats_by_project_id", { projectId });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                totalGateways: "5",
                liveGateways: "3"
            });
        });
    },
    getGatewaysByProjectId: (projectId, filters) => {
        var _a;
        if (RUN_MODE != "dev") {
            filters = Object.assign(Object.assign({}, (filters !== null && filters !== void 0 ? filters : {})), { additionalFilters: [
                    ...((_a = filters === null || filters === void 0 ? void 0 : filters.additionalFilters) !== null && _a !== void 0 ? _a : []),
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: `${projectId}`
                    }
                ] });
            return (0, utilities_1.makeCall)("POST", "/gateway/get_all_gateways", Object.assign({ projectId }, filters));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(gateways_1.default);
            const projectMeters = rawResponse.rows.filter(row => row.projectId === projectId);
            resolve((0, mockUtilities_1.getPaginatedResponse)({
                rows: projectMeters
            }, filters));
        });
    }
};
