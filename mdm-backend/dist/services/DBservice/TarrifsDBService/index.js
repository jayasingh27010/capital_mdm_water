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
const tarrifGroups_1 = __importDefault(require("../MockDBData/tarrifGroups"));
const tarrrifs_1 = __importDefault(require("../MockDBData/tarrrifs"));
const utilities_1 = require("../../../utilities");
const mockUtilities_1 = require("../../../mockUtilities");
dotenv_1.default.config();
const RUN_MODE = process.env.RUN_MODE || "dev";
exports.default = {
    attachOrDetachTarrif: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff_group_tariff/create_attach_orDetach_tariff", payload);
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Attach Or Detach Tarrif Successful"
            });
        });
    }),
    changeTariff: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff_group_tariff/change_tariff", payload);
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Attach Or Detach Tarrif Successful"
            });
        });
    }), Tarrif: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff_group_tariff/create_attach_orDetach_tariff", payload);
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Attach Or Detach Tarrif Successful"
            });
        });
    }),
    createTarrif: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            console.log("create Tarrif Payload", payload);
            return (0, utilities_1.makeCall)("POST", "/tariff/create_tariff", payload);
            return new Promise((_, reject) => {
                reject(new Error("Not Implemented"));
            });
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Create Tarrif Successful"
            });
        });
    }),
    createTarrifGroup: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff_group/create_tariff_group", payload);
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Create Tarrif Successful"
            });
        });
    }),
    getTarrifGroups: () => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff_group/get_tariff_group", {});
            // return new Promise((resolve) => {get_unlink_tariff_group
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return makeCall("POST", "/tariff_group/get_tariff_group", {})
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = (0, utilities_1.deepCopy)(tarrifGroups_1.default);
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            });
        });
    }),
    getLinkTarrifGroups: () => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff_group/get_link_tariff_group", {});
            // return new Promise((resolve) => {get_unlink_tariff_group
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return makeCall("POST", "/tariff_group/get_tariff_group", {})
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = (0, utilities_1.deepCopy)(tarrifGroups_1.default);
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            });
        });
    }),
    getUnlinkTarrifGroups: () => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff_group/get_unlink_tariff_group", {});
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return makeCall("POST", "/tariff_group/get_tariff_group", {})
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = (0, utilities_1.deepCopy)(tarrifGroups_1.default);
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            });
        });
    }),
    getTarrifGroupsWithTariffRelation: () => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff_group/get_tariff_group_with_tariff_relation", {});
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return makeCall("POST", "/tariff_group/get_tariff_group", {})
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = (0, utilities_1.deepCopy)(tarrifGroups_1.default);
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            });
        });
    }),
    getTarrifGroupsByProjectId: (projectId) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff_group/get_tariff_group_by_project_id", { projectId });
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     // console.log("this", tarrifGroups, projectId)
            //     tarrifGroups.rows = tarrifGroups.rows.filter((tG: TarrifGroupDBDTO) => tG.projectId === projectId)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = (0, utilities_1.deepCopy)(tarrifGroups_1.default);
            // console.log("this", tarrifGroups, projectId)
            tarrifGroups.rows = tarrifGroups.rows.filter((tG) => tG.projectId === projectId);
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            });
        });
    }),
    getTarrifGroupsWFilters: (filters) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff_group/get_tariff_group_with_filters", filters);
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = (0, utilities_1.deepCopy)(tarrifGroups_1.default);
            resolve((0, mockUtilities_1.getPaginatedResponse)({
                rows: tarrifGroups.rows
            }, filters));
        });
    }),
    getTarrifGroupsByProjectIdWFilters: (projectId, filters) => __awaiter(void 0, void 0, void 0, function* () {
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
            return (0, utilities_1.makeCall)("POST", "/tariff_group/get_tariff_group_with_filters", Object.assign({ projectId }, filters));
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve(getPaginatedResponse({
            //         rows: tarrifGroups.rows.filter((row: any) => row.projectId === projectId)
            //     }, filters))
            // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = (0, utilities_1.deepCopy)(tarrifGroups_1.default);
            resolve((0, mockUtilities_1.getPaginatedResponse)({
                rows: tarrifGroups.rows.filter((row) => row.projectId === projectId)
            }, filters));
        });
    }),
    getAvailableTarrifs: () => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff/get_available_tariff", {});
            //logic inside can be implemented within a stored procedure
            // const tarrifs = deepCopy(MockTarrifs)
            // resolve({
            //     rows: tarrifs.rows,
            //     totalRecords: tarrifs.rows.length
            // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = (0, utilities_1.deepCopy)(tarrrifs_1.default);
            resolve({
                rows: tarrifs.rows,
                totalRecords: tarrifs.rows.length
            });
        });
    }),
    getAvailableLinkTarrifs: () => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff/get_available_link_tariff", {});
            //logic inside can be implemented within a stored procedure
            // const tarrifs = deepCopy(MockTarrifs)
            // resolve({
            //     rows: tarrifs.rows,
            //     totalRecords: tarrifs.rows.length
            // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = (0, utilities_1.deepCopy)(tarrrifs_1.default);
            resolve({
                rows: tarrifs.rows,
                totalRecords: tarrifs.rows.length
            });
        });
    }),
    getAvailableUnLinkTarrifs: () => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff/get_available_unlink_tariff", {});
            //logic inside can be implemented within a stored procedure
            // const tarrifs = deepCopy(MockTarrifs)
            // resolve({
            //     rows: tarrifs.rows,
            //     totalRecords: tarrifs.rows.length
            // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = (0, utilities_1.deepCopy)(tarrrifs_1.default);
            resolve({
                rows: tarrifs.rows,
                totalRecords: tarrifs.rows.length
            });
        });
    }),
    getAvailableTarrifsByProjectId: (projectId) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff/get_available_tariff_by_project_id", { projectId });
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifs = deepCopy(MockTarrifs)
            //     const projectFilterTarrifs = tarrifs.rows.filter((row: any) => row.projectId === projectId)
            //     resolve({
            //         rows: projectFilterTarrifs,
            //         totalRecords: projectFilterTarrifs.length
            //     })
            // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = (0, utilities_1.deepCopy)(tarrrifs_1.default);
            const projectFilterTarrifs = tarrifs.rows.filter((row) => row.projectId === projectId);
            resolve({
                rows: projectFilterTarrifs,
                totalRecords: projectFilterTarrifs.length
            });
        });
    }),
    getTarrifs: (filters) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff/get_tariff_by_filters", filters);
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = (0, utilities_1.deepCopy)(tarrrifs_1.default);
            resolve((0, mockUtilities_1.getPaginatedResponse)({
                rows: tarrifs.rows
            }, filters));
        });
    }),
    getAllAttachTariff: (filters) => __awaiter(void 0, void 0, void 0, function* () {
        //if (RUN_MODE != "dev") {
        // filters.perPage = 1000
        // filters.currPage = 0
        return (0, utilities_1.makeCall)("POST", "/tariff_group_tariff/get_all_attach_tariffs", filters);
        //}
        // return new Promise((resolve) => {
        //     //logic inside can be implemented within a stored procedure
        //     const tarrifs = deepCopy(MockTarrifs)
        //     resolve(getPaginatedResponse({
        //         rows: tarrifs.rows
        //     }, filters))
        // })
    }),
    getTarrifsByProjectId: (projectId, filters) => __awaiter(void 0, void 0, void 0, function* () {
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
            return (0, utilities_1.makeCall)("POST", "/tariff/get_tariff_by_filters", Object.assign({ projectId }, filters));
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifs = deepCopy(MockTarrifs)
            //     resolve(getPaginatedResponse({
            //         rows: tarrifs.rows.filter((row: any) => row.projectId === projectId)
            //     }, filters))
            // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = (0, utilities_1.deepCopy)(tarrrifs_1.default);
            resolve((0, mockUtilities_1.getPaginatedResponse)({
                rows: tarrifs.rows.filter((row) => row.projectId === projectId)
            }, filters));
        });
    }),
    getTarrifById: (tarrifId) => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/tariff/get_tariff_id", {
                tarrifId
            });
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = (0, utilities_1.deepCopy)(tarrrifs_1.default);
            const foundTarrif = tarrifs.rows.filter((row) => row.id === tarrifId);
            resolve({
                rows: foundTarrif,
                totalRecords: foundTarrif.length
            });
        });
    }),
};
