"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const consumers_1 = __importDefault(require("../MockDBData/consumers"));
const meterRecharges_1 = __importDefault(require("../MockDBData/meterRecharges"));
const utilities_1 = require("../../../utilities");
const mockUtilities_1 = require("../../../mockUtilities");
dotenv_1.default.config();
const RUN_MODE = process.env.RUN_MODE || "dev";
exports.default = {
    receivedConsumers: (payload) => {
        if (RUN_MODE != "dev") {
            console.log("payload before sending ", payload);
            return (0, utilities_1.makeCall)("POST", "/consumer/bulk_create_consumer", { consumers: payload });
        }
        return new Promise((resolve) => {
            resolve({
                message: "Consumers Received",
                totalErrRecs: "2"
            });
        });
    },
    createConsumer: (payload) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/create_consumer", Object.assign(Object.assign({}, payload), { isVVIP: (payload === null || payload === void 0 ? void 0 : payload.isVVIP) ? "Yes" : "No" }));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Consumer successfully added"
            });
        });
    },
    editConsumer: (payload) => {
        console.log(payload);
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/edit_consumer", Object.assign(Object.assign({ consumerId: payload.id }, payload), { isVVIP: (payload === null || payload === void 0 ? void 0 : payload.isVVIP) ? "Yes" : "No" }));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Consumer edited added"
            });
        });
    },
    enableConsumer: (payload) => {
        console.log(payload);
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/enable_consumer", { consumerId: payload.id });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Consumer enabled"
            });
        });
    },
    disableConsumer: (payload) => {
        console.log(payload);
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/disable_consumer", { consumerId: payload.id });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Consumer disabled"
            });
        });
    },
    resetPassword: (payload) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/user/reset_password_crn", { consumerId: payload });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully edited"
            });
        });
    },
    getConsumers: (filters) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/get_all_consumers", filters);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(consumers_1.default);
            resolve((0, mockUtilities_1.getPaginatedResponse)(rawResponse, filters));
        });
    },
    getAllConsumers: (filters) => {
        return (0, utilities_1.makeCall)("POST", "/consumer/get_all_consumers", Object.assign({ getAll: true }, filters));
    },
    getConsumerById: (consumerId) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/get_consumer_by_id", { consumerId, perPage: 1, currPage: 1 });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(consumers_1.default);
            const meter = rawResponse.rows.find(meter => meter.consumerId === consumerId);
            if (meter) {
                resolve({ rows: [meter], totalRecords: 1 });
            }
            else {
                resolve({ rows: [], totalRecords: 0 });
            }
        });
    },
    getConsumerRechargesByConsumerId: (consumerId, filters) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/get_consumer_recharges_by_id", Object.assign({ consumerId }, filters));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(meterRecharges_1.default);
            const meterRecharges = rawResponse.rows.filter(row => row.consumerId === consumerId);
            resolve((0, mockUtilities_1.getPaginatedResponse)({
                rows: meterRecharges
            }, filters));
        });
    },
    getConsumerMeterStats: (consumerId) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/get_consumer_meter_stats_by_consumer_id", { consumerId });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(consumers_1.default);
            const consumer = rawResponse.rows.find(row => row.consumerId === consumerId);
            if (consumer) {
                resolve({
                    "eBReading": "6526.38kWh",
                    "dGReading": "302.46kWh",
                    "unit": "LGF-01",
                    "meter": consumer.meterSerialNo,
                    "cutStatus": "Warning",
                    "dG": "OFF",
                    "currentLoad": "0.0052kWh"
                });
            }
            else {
                resolve({
                    "eBReading": "6526.38kWh",
                    "dGReading": "302.46kWh",
                    "unit": "LGF-01",
                    "meter": "",
                    "cutStatus": "Warning",
                    "dG": "OFF",
                    "currentLoad": "0.0052kWh"
                });
            }
        });
    },
    getConsumerSanctionedLoadStats: (consumerId) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/get_consumer_sanctioned_load_stats_by_consumer_id", { consumerId });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(consumers_1.default);
            const consumer = rawResponse.rows.find(row => row.consumerId === consumerId);
            if (consumer) {
                resolve({
                    "eBSanctionedLoad": "9.0KW",
                    "dGSanctionedLoad": "7.0KW"
                });
            }
            else {
                resolve({
                    "eBSanctionedLoad": "9.0KW",
                    "dGSanctionedLoad": "8.0KW"
                });
            }
        });
    },
    getConsumerCurrentConsumptionStats: (consumerId) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/get_consumer_current_consumption_stats_by_consumer_id", { consumerId });
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(consumers_1.default);
            const consumer = rawResponse.rows.find(row => row.consumerId === consumerId);
            if (consumer) {
                resolve({
                    "eBConsumption": "94.02kWh",
                    "dGConsumption": "0.09kWh"
                });
            }
            else {
                resolve({
                    "eBConsumption": "94.02kWh",
                    "dGConsumption": "0.09kWh"
                });
            }
        });
    },
    getConsumerCurrentMonthBalanceStats: (consumerId) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/get_consumer_current_month_balance_stats_by_consumer_id", { consumerId });
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(consumers_1.default);
            const consumer = rawResponse.rows.find(row => row.consumerId === consumerId);
            if (consumer) {
                resolve({
                    "eBConsumption": "94.02kWh",
                    "dGConsumption": "0.09kWh"
                });
            }
            else {
                resolve({
                    "eBConsumption": "94.02kWh",
                    "dGConsumption": "0.09kWh"
                });
            }
        });
    },
    getConsumersByProjectId: (projectId, filters) => {
        var _a;
        if (filters) {
            filters = Object.assign(Object.assign({}, filters), { additionalFilters: [
                    ...((_a = filters.additionalFilters) !== null && _a !== void 0 ? _a : []),
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: projectId
                    }
                ] });
        }
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/get_all_consumers", filters);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(consumers_1.default);
            const projectMeters = rawResponse.rows.filter(row => row.projectId === projectId);
            resolve((0, mockUtilities_1.getPaginatedResponse)({
                rows: projectMeters
            }, filters));
        });
    },
    getConsumerMeterConsumptionGraph: (consumerId, year, requestType) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/get_consumer_consumption_graph_by_consumer_id", { consumerId, year, requestType });
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
        });
    },
    getConsumerMeterConsumptionGraphweekly: (consumerId, month, requestType) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/get_consumer_consumption_graph_by_consumer_id", { consumerId, month, requestType });
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
        });
    },
    getConsumerMeterConsumptionGraphDaily: (consumerId, startDate, endDate, requestType) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/consumer/get_consumer_consumption_graph_by_consumer_id", { consumerId, startDate, endDate, requestType });
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
        });
    },
};
