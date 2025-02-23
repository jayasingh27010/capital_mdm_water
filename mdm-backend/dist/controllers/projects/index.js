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
const express_1 = __importDefault(require("express"));
const utilities_1 = require("../../utilities");
const viewAllProjectsTable_1 = __importDefault(require("../../configs/viewAllProjectsTable"));
const viewProjectActions_1 = __importDefault(require("../../configs/viewProjectActions"));
const viewProjectMetersTable_1 = __importDefault(require("../../configs/viewProjectMetersTable"));
const viewProjectDetails_1 = __importDefault(require("../../configs/viewProjectDetails"));
const viewProjectMeters_1 = __importDefault(require("../../configs/viewProjectMeters"));
const viewProjectGateways_1 = __importDefault(require("../../configs/viewProjectGateways"));
const DBservice_1 = __importDefault(require("../../services/DBservice"));
const viewMeterGraphConsumption_1 = __importDefault(require("../../configs/viewMeterGraphConsumption"));
const joi_1 = __importDefault(require("joi"));
const logConsts_1 = require("../logConsts");
const { Projects } = logConsts_1.LOG_MODULE_CONSTS;
const { CREATE_PROJECT, EDIT_PROJECT, DISABLE_PROJECT, ENABLE_PROJECT, } = logConsts_1.LOG_ACTION_CONSTS[Projects];
const projectsRouter = express_1.default.Router();
projectsRouter.post("/createProject", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "projectName": joi_1.default.string().required().min(1),
        "projectAddress": joi_1.default.string().required().min(1),
        "projectCode": joi_1.default.string().required().min(1),
        "billingType": joi_1.default.string().required().valid('kwh', 'kvah'),
    });
    let result;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        delete data['userType'];
        //await schema.validateAsync(data)
        console.log(data);
        result = yield DBservice_1.default.Project.createProject(data);
        (0, utilities_1.createLog)(tokenObj, Projects, CREATE_PROJECT, data);
        res.status(200).json(result);
    }
    catch (e) {
        res.status(400).json({ message: e.error });
    }
}));
projectsRouter.post("/editProject", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "id": joi_1.default.string().required().min(1),
        "projectName": joi_1.default.string().required().min(1),
        "projectAddress": joi_1.default.string().required().min(1),
        "projectCode": joi_1.default.string().required().min(1),
        "billingType": joi_1.default.string().required().valid('kwh', 'kvah')
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        // await schema.validateAsync(data)
        console.log(data);
        const result = yield DBservice_1.default.Project.editProject(data);
        (0, utilities_1.createLog)(tokenObj, Projects, EDIT_PROJECT, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
projectsRouter.post("/enableProject", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "id": joi_1.default.string().required().min(1),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        yield schema.validateAsync(data);
        console.log("enableProject Called", data);
        const result = yield DBservice_1.default.Project.enableProject(data);
        (0, utilities_1.createLog)(tokenObj, Projects, ENABLE_PROJECT, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
projectsRouter.post("/disableProject", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "id": joi_1.default.string().required().min(1),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        yield schema.validateAsync(data);
        console.log("disableProject Called", data);
        const result = yield DBservice_1.default.Project.disableProject(data);
        (0, utilities_1.createLog)(tokenObj, Projects, DISABLE_PROJECT, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
projectsRouter.post("/deleteProject", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "id": joi_1.default.string().required().min(1),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        yield schema.validateAsync(data);
        console.log("deleteProject Called", data);
        const result = yield DBservice_1.default.Project.deleteProject(data);
        (0, utilities_1.createLog)(tokenObj, "projects", "deleteProject", data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
projectsRouter.post("/viewProjectActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewProjectActions_1.default);
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
projectsRouter.post("/viewAllProjectsTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewAllProjectsTable_1.default);
        const projectsResponse = yield DBservice_1.default.Project.getProjectsWFilters(filters);
        const projects = projectsResponse.rows;
        const totalRecords = projectsResponse.totalRecords;
        configJSON.data.totalRecords = totalRecords;
        configJSON.data.rows = projects.map(project => {
            console.log(project, 'projectssss');
            return {
                id: project.projectId,
                projectName: {
                    link: `/admin/projects/${encodeURIComponent(project.projectId)}`,
                    label: project.projectName
                },
                projectAddress: project.projectAddress,
                projectCode: project.projectCode,
                billingType: project.projectBillingTypeDescription,
                isLive: true
            };
        });
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
projectsRouter.post("/viewProjectMetersTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const projectId = req.body.id;
        const configJSON = (0, utilities_1.deepCopy)(viewProjectMetersTable_1.default);
        const projectsResponse = yield DBservice_1.default.Project.getProjectById(projectId);
        if (projectsResponse.rows.length > 0) {
            configJSON.config.label = `Meters For Project '${projectsResponse.rows[0].projectName}'`;
        }
        const metersResponse = yield DBservice_1.default.Meters.getMetersByProjectId(projectId, filters);
        const rows = metersResponse.rows;
        const totalRecords = metersResponse.totalRecords;
        configJSON.data.rows = rows.map(row => {
            return {
                "id": row.meterId,
                "meterSerialNo": {
                    "label": row.meterSerialNo,
                    "link": `/admin/meters/${encodeURIComponent(row.meterId)}`
                },
                "consumerName": {
                    "label": row.consumerName,
                    "link": `/admin/consumers/${row.consumerId}`
                },
                "firmwareVersion": row.firmwareVersion,
            };
        });
        configJSON.data.totalRecords = totalRecords;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        console.log("viewProjectMetersTable Error", e);
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
// viewProjectDetails
projectsRouter.post("/viewProjectDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.body.id;
        console.log("withing project id", req.body);
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewProjectDetails_1.default);
        const projects = (yield DBservice_1.default.Project.getProjectById(projectId)).rows;
        const project = projects === null || projects === void 0 ? void 0 : projects[0];
        if (!project) {
            configJSON.data = {
                "projectName": "",
                "projectAddress": "",
                "projectCode": "",
                "billingType": ""
            };
            return res.status(200).json(configJSON);
        }
        const order = configJSON.config.actions.order;
        if (project.enabled) {
            const excludedEnabledOrder = order.filter((fieldId) => fieldId !== "enableProject");
            configJSON.config.actions.order = excludedEnabledOrder;
        }
        else {
            const excludedDisabledOrder = order.filter((fieldId) => fieldId !== "disableProject");
            configJSON.config.actions.order = excludedDisabledOrder;
        }
        console.log("project found", project);
        configJSON.config.actions.editProject.data = {
            "projectName": project.projectName,
            "projectAddress": project.projectAddress,
            "projectCode": project.projectCode,
            "billingType": project.projectBillingTypeValue,
            "happyHours": project.happyHoursList,
            "holidays": project.holidaysList
        };
        configJSON.data = {
            "projectName": project.projectName,
            "projectAddress": project.projectAddress,
            "projectCode": project.projectCode,
            "billingType": project.projectBillingTypeDescription,
            enabled: project.enabled ? "Yes" : "No"
        };
        return res.status(200).json(configJSON);
    }
    catch (e) {
        console.log(e);
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
const addProjectFilter = (list, projectId) => {
    return list.map(l => l.filterType === "project" ? (Object.assign(Object.assign({}, l), { filterValue: String(projectId) })) : l);
};
projectsRouter.post("/viewProjectMeters", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewProjectMeters_1.default);
        const projectId = req.body.id;
        const meterStats = yield DBservice_1.default.Meters.getMetersStatsByProjectId(projectId);
        configJSON.data.down.value = meterStats.down;
        configJSON.data.down.tableFilters.additionalFilters = addProjectFilter(configJSON.data.down.tableFilters.additionalFilters, projectId);
        configJSON.data.lowBalance.value = meterStats.lowBalance;
        configJSON.data.lowBalance.tableFilters.additionalFilters = addProjectFilter(configJSON.data.lowBalance.tableFilters.additionalFilters, projectId);
        configJSON.data.overloaded.value = meterStats.overloaded;
        configJSON.data.overloaded.tableFilters.additionalFilters = addProjectFilter(configJSON.data.overloaded.tableFilters.additionalFilters, projectId);
        configJSON.data.relayOff.value = meterStats.relayOff;
        configJSON.data.relayOff.tableFilters.additionalFilters = addProjectFilter(configJSON.data.relayOff.tableFilters.additionalFilters, projectId);
        configJSON.data.total.value = meterStats.total;
        configJSON.data.total.tableFilters.additionalFilters = addProjectFilter(configJSON.data.total.tableFilters.additionalFilters, projectId);
        configJSON.data.unalloted.value = meterStats.unalloted;
        configJSON.data.unalloted.tableFilters.additionalFilters = addProjectFilter(configJSON.data.unalloted.tableFilters.additionalFilters, projectId);
        configJSON.data.unstate.value = meterStats.unstate;
        configJSON.data.unstate.tableFilters.additionalFilters = addProjectFilter(configJSON.data.unstate.tableFilters.additionalFilters, projectId);
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
projectsRouter.post("/viewProjectGateways", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const projectId = req.body.id;
        const configJSON = (0, utilities_1.deepCopy)(viewProjectGateways_1.default);
        const gatewaysStats = yield DBservice_1.default.Gateways.getGatewayStatsByProjectId(projectId);
        configJSON.data.totalGateways.value = gatewaysStats.totalGateways;
        configJSON.data.totalGateways.tableFilters.additionalFilters = addProjectFilter(configJSON.data.totalGateways.tableFilters.additionalFilters, projectId);
        configJSON.data.liveGateways.value = gatewaysStats.liveGateways;
        configJSON.data.liveGateways.tableFilters.additionalFilters = addProjectFilter(configJSON.data.liveGateways.tableFilters.additionalFilters, projectId);
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
projectsRouter.post("/projectMeterConsumptionMonthly", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const user_id = req.body.userId;
        const projectId = req.body.projectId;
        const year = req.body.year;
        const requestType = req.body.filter;
        const configJSON = (0, utilities_1.deepCopy)(viewMeterGraphConsumption_1.default);
        const data = yield DBservice_1.default.Project.getProjectMeterConsumptionGraph(user_id, projectId, year, requestType);
        configJSON.data = data;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
projectsRouter.post("/projectMeterConsumptionWeekly", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const user_id = req.body.userId;
        const projectId = req.body.projectId;
        const month = req.body.month;
        const requestType = req.body.filter;
        const configJSON = (0, utilities_1.deepCopy)(viewMeterGraphConsumption_1.default);
        const data = yield DBservice_1.default.Project.getProjectMeterConsumptionGraphweekly(user_id, projectId, month, requestType);
        configJSON.data = data;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
projectsRouter.post("/projectMeterConsumptionDaily", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        console.log(req.body, "reqqq");
        const user_id = req.body.userId;
        const projectId = req.body.projectId;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const requestType = req.body.filter;
        const configJSON = (0, utilities_1.deepCopy)(viewMeterGraphConsumption_1.default);
        const data = yield DBservice_1.default.Project.getProjectMeterConsumptionGraphDaily(user_id, projectId, startDate, endDate, requestType);
        configJSON.data = data;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
exports.default = projectsRouter;
