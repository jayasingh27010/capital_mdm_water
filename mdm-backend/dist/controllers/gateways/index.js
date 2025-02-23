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
const viewGatewayActions_1 = __importDefault(require("../../configs/viewGatewayActions"));
const viewAllGatewaysTable_1 = __importDefault(require("../../configs/viewAllGatewaysTable"));
const DBservice_1 = __importDefault(require("../../services/DBservice"));
const logConsts_1 = require("../logConsts");
const { Gateways } = logConsts_1.LOG_MODULE_CONSTS;
const { CREATE_GATEWAY, } = logConsts_1.LOG_ACTION_CONSTS[Gateways];
const joi_1 = __importDefault(require("joi"));
const gatewaysRouter = express_1.default.Router();
gatewaysRouter.post("/createGateway", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "gatewayNumber": joi_1.default.string().required().min(1),
        "project": joi_1.default.string().required().min(1),
        "connectivityType": joi_1.default.string().required().valid('ethernet', 'gprs'),
        "simNo": joi_1.default.string(),
        "ipAddress": joi_1.default.string()
    }).options({
        stripUnknown: true
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        yield schema.validateAsync(data);
        console.log(data);
        const result = yield DBservice_1.default.Gateways.createGateway(data);
        (0, utilities_1.createLog)(tokenObj, Gateways, CREATE_GATEWAY, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ message: e.error });
    }
}));
gatewaysRouter.post("/editGateway", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "gatewayId": joi_1.default.string().required().min(1),
        "gatewayNumber": joi_1.default.string().required().min(1),
        "project": joi_1.default.string().required().min(1),
        "connectivityType": joi_1.default.string().required().valid('ethernet', 'gprs'),
        "simNo": joi_1.default.string().allow(null, ""),
        "ipAddress": joi_1.default.string().allow(null, "")
    }).options({
        stripUnknown: true
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        yield schema.validateAsync(data);
        console.log(data);
        const result = yield DBservice_1.default.Gateways.editGateway(data);
        // createLog(tokenObj, Gateways, CREATE_GATEWAY, data)
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ message: e.error });
    }
}));
gatewaysRouter.post("/viewGatewayActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewGatewayActions_1.default);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.actions.createGateway.fields.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.actions.createGateway.fields.order = excludedProjectOrder;
        }
        else {
            let selectOptions = configJSON.config.actions.createGateway.fields.project.selectOptions;
            const projects = (yield DBservice_1.default.Project.getProjects()).rows;
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.actions.createGateway.fields.project.selectOptions = selectOptions;
        }
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
gatewaysRouter.post("/viewAllGatewaysTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewAllGatewaysTable_1.default);
        let gateways = [];
        let totalRecords = 0;
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions;
            const projectId = tokenObj.projectId;
            const gatewaysResponse = yield DBservice_1.default.Gateways.getGatewaysByProjectId(projectId, filters);
            gateways = gatewaysResponse.rows;
            totalRecords = gatewaysResponse.totalRecords;
            const editGatewayFields = configJSON.config.actions.editGateway.fields.order;
            const editGatewayExcludedProjectOptions = editGatewayFields.filter((value) => value !== "project");
            configJSON.config.actions.editGateway.fields.order = editGatewayExcludedProjectOptions;
        }
        else {
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions;
            const projects = (yield DBservice_1.default.Project.getProjects()).rows;
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions;
            // console.log(configJSON.config.actions.editGateway)
            configJSON.config.actions.editGateway.fields.project.selectOptions = [
                {
                    value: "-",
                    description: "-"
                },
                ...projectSelectOptions
            ];
            const gatewaysResponse = yield DBservice_1.default.Gateways.getGateways(filters);
            gateways = gatewaysResponse.rows;
            totalRecords = gatewaysResponse.totalRecords;
        }
        configJSON.data.rows = gateways.map(row => {
            return Object.assign(Object.assign({}, row), { "id": row.gatewayId, "gatewayNumber": row.gatewayNumber, "project": {
                    "label": row.projectName,
                    "link": `/admin/projects/${row.projectId}`
                }, "ipAddress": row.ipAddress, "simNo": row.simNo, "connectivityType": row.connectivityTypeDescription, "status": row.status, "lastReportedTime": row.lastReportedTime });
        });
        configJSON.data.totalRecords = totalRecords;
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
exports.default = gatewaysRouter;
