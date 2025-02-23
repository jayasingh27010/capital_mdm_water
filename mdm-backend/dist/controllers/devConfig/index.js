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
const viewDevConfigActions_1 = __importDefault(require("../../configs/viewDevConfigActions"));
const viewAllDeviceConfigRequestsTable_1 = __importDefault(require("../../configs/viewAllDeviceConfigRequestsTable"));
const DBservice_1 = __importDefault(require("../../services/DBservice"));
const viewAllMetersTableForDevConfig_1 = __importDefault(require("../../configs/viewAllMetersTableForDevConfig"));
const logConsts_1 = require("../logConsts");
const { DeviceConfiguration } = logConsts_1.LOG_MODULE_CONSTS;
const { SET_METER, } = logConsts_1.LOG_ACTION_CONSTS[DeviceConfiguration];
const devConfigRouter = express_1.default.Router();
devConfigRouter.post("/viewDevConfigActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewDevConfigActions_1.default);
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
devConfigRouter.post("/viewAllMetersTableForDeviceConfig", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewAllMetersTableForDevConfig_1.default);
        let metersResponse;
        if (tokenObj.accountTypeValue !== "superAdmin") {
            metersResponse = yield DBservice_1.default.Meters.getMetersByProjectId(tokenObj.projectId, filters);
            const order = configJSON.config.columns.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.columns.order = excludedProjectOrder;
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectSelectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions =
                excludedProjectSelectOptions;
            // const filtersOrder = await DBservice.Project.getProjects()
        }
        else {
            metersResponse = yield DBservice_1.default.Meters.getMeters(filters);
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions;
            const projects = (yield DBservice_1.default.Project.getProjects())
                .rows;
            const projectSelectOptions = projects.map((project) => ({
                value: project.projectId,
                description: project.projectName,
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.filterConfig.filterValue.project.selectOptions =
                selectOptions;
        }
        configJSON.data = {
            rows: metersResponse.rows.map((meter) => {
                return {
                    id: meter.meterId,
                    meterSerialNo: {
                        label: meter.meterSerialNo,
                        link: `/admin/meters/${encodeURIComponent(meter.meterId)}`,
                    },
                    project: {
                        label: meter.projectName,
                        link: `/admin/projects/${encodeURIComponent(meter.projectId)}`,
                    },
                    consumer: {
                        label: meter.consumerName,
                        link: `/admin/consumers/${meter.consumerId}`,
                    },
                    moduleNo: meter.moduleNo,
                    phaseType: meter.phaseTypeDescription,
                    sourceType: meter.sourceTypeDescription,
                    consumptionType: meter.consumptionTypeDescription,
                    firmwareVersion: meter.firmwareVersion,
                };
            }),
            totalRecords: metersResponse.totalRecords,
        };
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
devConfigRouter.post("/setMeterActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve, reject) => setTimeout(() => { resolve({}); }, 3000));
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        // const configJSON = deepCopy(viewDevConfigActions)
        const actionsConfigJSON = (0, utilities_1.deepCopy)(viewDevConfigActions_1.default);
        const actions = actionsConfigJSON.config.actions.setMeters.actions;
        const filters = {
            getAll: true,
            additionalFilters: [
                {
                    trackId: "",
                    filterType: "reqType",
                    filterValue: "pending"
                }
            ]
        };
        let pendingRequests = (yield DBservice_1.default.DeviceConfig.getMeterActionRequests(filters)).rows;
        pendingRequests = pendingRequests.map(r => {
            var _a, _b;
            r.meterSerialNo = {
                "label": r.meterSerialNo,
                "link": `/admin/meters/${encodeURIComponent(r.meterId)}`
            };
            r.project = {
                "label": r.projectName,
                "link": `/admin/projects/${encodeURIComponent(r.projectId)}`
            };
            r.rawActionName = String((_a = r.actionName) !== null && _a !== void 0 ? _a : "").slice(0);
            r.actionName = (_b = actions.find(action => action.id === r.actionName)) === null || _b === void 0 ? void 0 : _b.label;
            return r;
        });
        const requestActions = req.body.actions
            .map((a) => {
            return {
                actionName: a.id,
                actionValue: a.value,
                meterSerialNo: a.meterSerialNo
            };
        });
        const foundPendingActions = pendingRequests
            .map((a) => {
            return {
                actionName: a.rawActionName,
                actionValue: a.value,
                meterSerialNo: a.meterSerialNo.label
            };
        });
        console.log(foundPendingActions, requestActions);
        const foundPendingActionKeyMaps = foundPendingActions
            .reduce((acc, obj) => {
            return Object.assign(Object.assign({}, acc), { [`${obj.actionName}-${obj.actionValue}-${obj.meterSerialNo}`]: true });
        }, {});
        const finalActions = req.body.actions.map((action) => {
            if (foundPendingActionKeyMaps.hasOwnProperty(`${action.id}-${action.value}-${action.meterSerialNo}`)) {
                action.isPresent = true;
            }
            return action;
        });
        const resp = yield DBservice_1.default.DeviceConfig.addRequests({ actions: finalActions });
        (0, utilities_1.createLog)(tokenObj, DeviceConfiguration, SET_METER, resp);
        return res.status(200).json(resp);
    }
    catch (e) {
        console.error(e);
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
devConfigRouter.post("/viewAllDeviceConfigRequestsTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        let filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewAllDeviceConfigRequestsTable_1.default);
        const actionsConfigJSON = (0, utilities_1.deepCopy)(viewDevConfigActions_1.default);
        const actions = actionsConfigJSON.config.actions.setMeters.actions;
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions;
            const columns = configJSON.config.columns.order;
            const excludedProjectColumns = columns.filter((value) => value !== "project");
            configJSON.config.columns.order = excludedProjectColumns;
            filters = Object.assign(Object.assign({}, (filters !== null && filters !== void 0 ? filters : {})), { additionalFilters: [
                    ...((_a = filters === null || filters === void 0 ? void 0 : filters.additionalFilters) !== null && _a !== void 0 ? _a : []),
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: String(tokenObj.projectId)
                    }
                ] });
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
        }
        const resp = yield DBservice_1.default.DeviceConfig.getMeterActionRequests(filters);
        configJSON.data.rows = resp.rows.map(r => {
            var _a;
            r.meterSerialNo = {
                "label": r.meterSerialNo,
                "link": `/admin/meters/${encodeURIComponent(r.meterId)}`
            };
            r.project = {
                "label": r.projectName,
                "link": `/admin/projects/${encodeURIComponent(r.projectId)}`
            };
            r.actionName = (_a = actions.find(action => action.id === r.actionName)) === null || _a === void 0 ? void 0 : _a.label;
            return r;
        });
        configJSON.data.totalRecords = resp.totalRecords;
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
exports.default = devConfigRouter;
