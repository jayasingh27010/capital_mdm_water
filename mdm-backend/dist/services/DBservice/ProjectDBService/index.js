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
const dotenv_1 = __importDefault(require("dotenv"));
const projects_1 = __importDefault(require("../MockDBData/projects"));
const utilities_1 = require("../../../utilities");
const mockUtilities_1 = require("../../../mockUtilities");
dotenv_1.default.config();
const RUN_MODE = process.env.RUN_MODE || "dev";
exports.default = {
    createProject: (payload) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/project/create_project", payload);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Project successfully added"
            });
        });
    },
    editProject: (payload) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/project/edit_project", Object.assign(Object.assign({}, payload), { projectId: payload.id }));
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Project successfully edited"
            });
        });
    },
    deleteProject: (payload) => {
        if (RUN_MODE != "dev") {
            return new Promise((_, reject) => {
                reject(new Error("Not Implemented"));
            });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Project successfully deleted"
            });
        });
    },
    disableProject: (payload) => {
        console.log(payload);
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/project/disable_project", { projectId: payload.id });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Project successfully disabled"
            });
        });
    },
    enableProject: (payload) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/project/enable_project", { projectId: payload.id });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Project successfully enabled"
            });
        });
    },
    getProjects: () => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/project/get_all_project", {});
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                totalRecords: (0, utilities_1.deepCopy)(projects_1.default).rows.length,
                rows: (0, utilities_1.deepCopy)(projects_1.default).rows
            });
        });
    }),
    getProjectById: (projectId) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/project/get_project_by_id", { projectId });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const projects = (0, utilities_1.deepCopy)(projects_1.default).rows;
            const foundProject = projects.find(project => project.projectId === projectId);
            if (foundProject) {
                resolve({
                    rows: [foundProject],
                    totalRecords: 1
                });
            }
            else {
                resolve({
                    rows: [],
                    totalRecords: 0
                });
            }
        });
    }),
    getProjectsStats: () => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/project/get_project_stats", {});
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                totalProjects: "10",
                liveProjects: "5"
            });
        });
    },
    getProjectsWFilters: (filters) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/project/get_project_with_filter", filters);
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = { rows: (0, utilities_1.deepCopy)(projects_1.default).rows };
            resolve((0, mockUtilities_1.getPaginatedResponse)(rawResponse, filters));
        });
    }),
    getProjectMeterConsumptionGraph: (user_id, projectId, year, requestType) => {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/project/get_project_consumption_graph_by_project_id", { user_id, projectId, year, requestType });
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
        });
    },
    getProjectMeterConsumptionGraphweekly: (user_id, projectId, month, requestType) => {
        if (RUN_MODE != "dev") {
            projectId;
            return (0, utilities_1.makeCall)("POST", "/project/get_project_consumption_graph_by_project_id", { user_id, projectId, month, requestType });
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
        });
    },
    getProjectMeterConsumptionGraphDaily: (user_id, projectId, startDate, endDate, requestType) => {
        console.log(user_id, "user_iduser_iduser_id");
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/project/get_project_consumption_graph_by_project_id", { user_id, projectId, startDate, endDate, requestType });
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
        });
    },
};
