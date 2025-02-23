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
    receivedMeters: (payload) => {
        if (RUN_MODE != "dev") {
            console.log("payload before sending ", payload);
            return (0, utilities_1.makeCall)("POST", "/meter/bulk_create_meter", { meters: payload });
            // return new Promise((resolve) => {
            //     resolve({
            //         message: "Meters Received",
            //         totalErrRecs: 0
            //     })
            // })
        }
        return new Promise((resolve) => {
            resolve({
                message: "Meters Received",
                totalErrRecs: "2"
            });
        });
    },
    createMeter: (payload) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/meter/create_meter", payload);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Meter successfully added"
            });
        });
    },
    editMeter: (payload) => {
        if (RUN_MODE != "dev") {
            console.log(payload);
            return (0, utilities_1.makeCall)("POST", "/meter/edit_meter", payload);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Meter successfully edited"
            });
        });
    },
    getMeters: (filters) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/meter/get_all_meters", filters);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(meters_1.default);
            resolve((0, mockUtilities_1.getPaginatedResponse)(rawResponse, filters));
        });
    },
    getMetersForDropDown: (filters) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/meter/get_all_meters_dropdown", filters);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(meters_1.default);
            resolve((0, mockUtilities_1.getPaginatedResponse)(rawResponse, filters));
        });
    },
    getMeterById: (meterId) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/meter/get_meters_by_id", { meterId, perPage: 1, currPage: 1 });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(meters_1.default);
            const meter = rawResponse.rows.find(meter => meter.meterId === meterId);
            if (meter) {
                resolve({ rows: [meter], totalRecords: 1 });
            }
            else {
                resolve({ rows: [], totalRecords: 0 });
            }
        });
    },
    getMetersStats: () => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/meter/get_meter_stats", {});
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            // const rawResponse: DBRawResponse = deepCopy(MockMeters)
            // const projectMeters: MeterDBDTO[] = rawResponse.rows.filter(row => row.projectId === projectId)
            resolve({
                down: "2",
                lowBalance: "3",
                overloaded: "2",
                relayOff: "2",
                total: "200",
                unalloted: "100",
                unstate: "2"
            });
        });
    },
    getMetersStatsByProjectId: (projectId) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/meter/get_meter_stats_by_project_id", {
                projectId
            });
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            // const rawResponse: DBRawResponse = deepCopy(MockMeters)
            // const projectMeters: MeterDBDTO[] = rawResponse.rows.filter(row => row.projectId === projectId)
            resolve({
                down: "2",
                lowBalance: "3",
                overloaded: "2",
                relayOff: "2",
                total: "20",
                unalloted: "10",
                unstate: "2"
            });
        });
    },
    getMetersByProjectId: (projectId, filters) => {
        if (RUN_MODE != "dev") {
            // /meter/get_meters_by_project_by_id
            return (0, utilities_1.makeCall)("POST", "/meter/get_meters_by_project_by_id", Object.assign({ projectId }, filters));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(meters_1.default);
            const projectMeters = rawResponse.rows.filter(row => row.projectId === projectId);
            resolve((0, mockUtilities_1.getPaginatedResponse)({
                rows: projectMeters
            }, filters));
        });
    },
    getMeterDynamicParamsStats: (meterId) => {
        if (RUN_MODE != "dev") {
            // return makeCall("POST", "/meter/get_dynamic_params", {meterId})
            return (0, utilities_1.makeCall)("POST", "/meter/get_meters_by_id", { meterId, perPage: 1, currPage: 1 });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                rows: [],
                totalRecords: 0
            });
            // resolve({
            //     "relay": "ONN",
            //     "meterHealth": "EXCELLENT"
            // })
        });
    },
};
