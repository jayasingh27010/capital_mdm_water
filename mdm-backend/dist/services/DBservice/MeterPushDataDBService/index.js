"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const meterPushData_1 = __importDefault(require("../MockDBData/meterPushData"));
const utilities_1 = require("../../../utilities");
const mockUtilities_1 = require("../../../mockUtilities");
dotenv_1.default.config();
const RUN_MODE = process.env.RUN_MODE || "dev";
exports.default = {
    getMeterPushData: (meterId, filters) => {
        if (RUN_MODE != "dev") {
            console.log("filters before sending", filters);
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const rawResponse: DBRawResponse = deepCopy(MockMetersPushData)
            //     console.log(rawResponse.rows)
            //     console.log("meterId in meterPushData", meterId,`000${meterId}`)
            //     const rows: MeterPushDataDBDTO[] = rawResponse.rows.filter(row => row.meterSerialNo === `CPS-000${meterId}`)
            //     resolve(getPaginatedResponse({
            //         rows
            //     }, filters))
            // })
            return (0, utilities_1.makeCall)("POST", "/meter_consumption_data/get_push_data", Object.assign({ meterId }, filters));
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(meterPushData_1.default);
            const rows = rawResponse.rows.filter(row => row.meterId === meterId);
            resolve((0, mockUtilities_1.getPaginatedResponse)({
                rows
            }, filters));
        });
    },
    getMeterPushDataByProjectId: (meterId, projectId, filters) => {
        if (RUN_MODE != "dev") {
            console.log("filters before sending", filters);
            return (0, utilities_1.makeCall)("POST", "/meter_consumption_data/get_push_data", Object.assign({ meterId }, filters));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(meterPushData_1.default);
            const projectMeters = rawResponse
                .rows
                .filter(row => row.projectId === projectId && row.meterId === meterId);
            resolve((0, mockUtilities_1.getPaginatedResponse)({
                rows: projectMeters
            }, filters));
        });
    }
};
