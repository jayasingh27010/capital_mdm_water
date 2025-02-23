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
const viewMeterActions_1 = __importDefault(require("../../configs/viewMeterActions"));
const viewAllMetersTable_1 = __importDefault(require("../../configs/viewAllMetersTable"));
const viewMetersPushDataTable_1 = __importDefault(require("../../configs/viewMetersPushDataTable"));
const viewMeterDetails_1 = __importDefault(require("../../configs/viewMeterDetails"));
const viewMeterDynamicParams_1 = __importDefault(require("../../configs/viewMeterDynamicParams"));
const viewMeterFinancialThisMonth_1 = __importDefault(require("../../configs/viewMeterFinancialThisMonth"));
const viewMeterFinancialPrevMonth_1 = __importDefault(require("../../configs/viewMeterFinancialPrevMonth"));
const viewMetersBulkUpload_1 = __importDefault(require("../../configs/viewMetersBulkUpload"));
const DBservice_1 = __importDefault(require("../../services/DBservice"));
const joi_1 = __importDefault(require("joi"));
const viewMetersBulkUploadResult_1 = __importDefault(require("../../configs/viewMetersBulkUploadResult"));
const { v4: uuid } = require('uuid');
const logConsts_1 = require("../logConsts");
const { Meters } = logConsts_1.LOG_MODULE_CONSTS;
const { CREATE_METER, EDIT_METER, METER_CSV_UPLOAD, } = logConsts_1.LOG_ACTION_CONSTS[Meters];
const metersRouter = express_1.default.Router();
metersRouter.post("/viewMeterActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewMeterActions_1.default);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.actions.createMeter.fields.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.actions.createMeter.fields.order = excludedProjectOrder;
        }
        else {
            let selectOptions = configJSON.config.actions.createMeter.fields.project.selectOptions;
            const projects = (yield DBservice_1.default.Project.getProjects())
                .rows;
            const projectSelectOptions = projects.map((project) => ({
                value: project.projectId,
                description: project.projectName,
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.actions.createMeter.fields.project.selectOptions =
                selectOptions;
        }
        return res.status(200).json(configJSON);
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
metersRouter.post("/createMeter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        meterSerialNo: joi_1.default.string().required().min(1),
        consumptionType: joi_1.default.string().required().min(1),
        firmwareVersion: joi_1.default.string(),
        project: joi_1.default.string().required().min(1),
        encryptionKey: joi_1.default.string().required().min(1)
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        yield schema.validateAsync(data);
        console.log(data);
        const result = yield DBservice_1.default.Meters.createMeter(data);
        (0, utilities_1.createLog)(tokenObj, Meters, CREATE_METER, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ message: e.error });
    }
}));
metersRouter.post("/editMeter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        id: joi_1.default.string().required().min(1),
        meterId: joi_1.default.string().required().min(1),
        meterSerialNo: joi_1.default.string().required().min(1),
        encryptionKey: joi_1.default.string().required().min(1),
        // moduleNo: Joi.string().required().min(1),
        // sourceType: Joi.string().required().min(1),
        // phaseType: Joi.string().required().min(1),
        firmwareVersion: joi_1.default.string(),
        consumptionType: joi_1.default.string().required().min(1),
        project: joi_1.default.string().required().min(1),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        yield schema.validateAsync(data);
        console.log(data);
        const result = yield DBservice_1.default.Meters.editMeter(data);
        (0, utilities_1.createLog)(tokenObj, Meters, EDIT_METER, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
metersRouter.post("/viewAllMetersTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewAllMetersTable_1.default);
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
                    encryptionKey: meter.encryptionKey,
                    // phaseType: meter.phaseTypeDescription,
                    // sourceType: meter.sourceTypeDescription,
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
metersRouter.post("/viewMetersPushDataTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewMetersPushDataTable_1.default);
        const meterId = req.body.id;
        configJSON.config.id = meterId;
        const meters = (yield DBservice_1.default.Meters.getMeterById(meterId)).rows;
        const meterSerialNo = (_b = (_a = meters === null || meters === void 0 ? void 0 : meters[0]) === null || _a === void 0 ? void 0 : _a.meterSerialNo) !== null && _b !== void 0 ? _b : "";
        configJSON.config.label = `${meterSerialNo} Meter Push Data`;
        let metersPushDataResponse;
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const projectId = tokenObj.projectId;
            metersPushDataResponse =
                yield DBservice_1.default.MetersPushData.getMeterPushDataByProjectId(meterId, projectId, filters);
            const order = configJSON.config.columns.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.columns.order = excludedProjectOrder;
            const filterConfigSelectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectFilterConfigSelectOptions = filterConfigSelectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions =
                excludedProjectFilterConfigSelectOptions;
        }
        else {
            metersPushDataResponse =
                yield DBservice_1.default.MetersPushData.getMeterPushData(meterId, filters);
        }
        configJSON.data.totalRecords = metersPushDataResponse.totalRecords;
        configJSON.data.rows = metersPushDataResponse.rows.map((row) => {
            return {
                id: row.id,
                meterSerialNo: row === null || row === void 0 ? void 0 : row.meterSerialNo,
                project: {
                    link: `/admin/projects/${row === null || row === void 0 ? void 0 : row.projectId}`,
                    label: row === null || row === void 0 ? void 0 : row.projectName,
                },
                powerFactor: (row === null || row === void 0 ? void 0 : row.powerFactor) || "", // Optional chaining with a default value
                cumulativeWh: (row === null || row === void 0 ? void 0 : row.cumulativeWh) || "",
                cumulativeVah: (row === null || row === void 0 ? void 0 : row.cumulativeVah) || "", // Changed from cumulativeWh to cumulativeVah
                overloadStatus: (row === null || row === void 0 ? void 0 : row.overloadStatus) || "",
                receiveTime: (row === null || row === void 0 ? void 0 : row.receiveTime) || "",
                //consumption_type: row?.consumption_type || "", // Use optional chaining
                cumulative_vah_genset: (row === null || row === void 0 ? void 0 : row.cumulative_vah_genset) || "",
                cumulative_vah_grid: (row === null || row === void 0 ? void 0 : row.cumulative_vah_grid) || "",
                cumulative_wh_genset: (row === null || row === void 0 ? void 0 : row.cumulative_wh_genset) || "",
                cumulative_wh_grid: (row === null || row === void 0 ? void 0 : row.cumulative_wh_grid) || "",
                dg_enable_disable: (row === null || row === void 0 ? void 0 : row.dg_enable_disable) || "",
                energy_source_id: (row === null || row === void 0 ? void 0 : row.energy_source_id) || "",
                grid_enable_disable: (row === null || row === void 0 ? void 0 : row.grid_enable_disable) || "",
                master_cutoff_status: (row === null || row === void 0 ? void 0 : row.master_cutoff_status) || "",
                md_kva_dg_current_mth: (row === null || row === void 0 ? void 0 : row.md_kva_dg_current_mth) || "",
                md_kva_grid_current_mth: (row === null || row === void 0 ? void 0 : row.md_kva_grid_current_mth) || "",
                md_kw_dg_current_mth: (row === null || row === void 0 ? void 0 : row.md_kw_dg_current_mth) || "",
                md_kw_grid_current_mth: (row === null || row === void 0 ? void 0 : row.md_kw_grid_current_mth) || "",
                meter_consumption: (row === null || row === void 0 ? void 0 : row.meter_consumption) || "",
                meter_balance_dg: (row === null || row === void 0 ? void 0 : row.meter_balance_dg) || "",
                meter_balance_grid: (row === null || row === void 0 ? void 0 : row.meter_balance_grid) || "",
                overload_status: (row === null || row === void 0 ? void 0 : row.overload_status) || "", // Optional chaining
                overload_threshold_for_dg: (row === null || row === void 0 ? void 0 : row.overload_threshold_for_dg) || "",
                overload_threshold_for_grid: (row === null || row === void 0 ? void 0 : row.overload_threshold_for_grid) || "",
                push_interval_in_minute: (row === null || row === void 0 ? void 0 : row.push_interval_in_minute) || "",
                total_active_power: (row === null || row === void 0 ? void 0 : row.total_active_power) || "",
                total_apparent_power: (row === null || row === void 0 ? void 0 : row.total_apparent_power) || "",
            };
        });
        return res.status(200).json(configJSON);
    }
    catch (e) {
        res.status(400).json({ message: e.error });
    }
}));
metersRouter.post("/viewMeterDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewMeterDetails_1.default);
        if (tokenObj.accountTypeValue === "superAdmin") {
            let selectOptions = configJSON.config.actions.editMeter.fields.project.selectOptions;
            const projects = (yield DBservice_1.default.Project.getProjects())
                .rows;
            const projectSelectOptions = projects.map((project) => ({
                value: project.projectId,
                description: project.projectName,
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.actions.editMeter.fields.project.selectOptions =
                selectOptions;
        }
        else {
            const order = configJSON.config.actions.editMeter.fields.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.actions.editMeter.fields.order = excludedProjectOrder;
        }
        const id = req.body.id;
        configJSON.config.id = id;
        const meters = (yield DBservice_1.default.Meters.getMeterById(id)).rows;
        console.log("meters", meters);
        if (meters === null || meters === void 0 ? void 0 : meters[0]) {
            const meter = meters[0];
            configJSON.data = {
                meterSerialNo: meter.meterSerialNo,
                encryptionKey: meter.encryptionKey,
                // moduleNo: meter.moduleNo,
                // phaseType: meter.phaseTypeDescription,
                // sourceType: meter.sourceTypeDescription,
                consumptionType: meter.consumptionTypeDescription,
                project: {
                    value: meter.projectName,
                    link: `/admin/projects/${encodeURIComponent(meter.projectId)}`,
                },
                consumer: {
                    value: meter.consumerName,
                    link: `/admin/consumers/${encodeURIComponent(meter.consumerId)}`,
                },
                firmwareVersion: meter === null || meter === void 0 ? void 0 : meter.firmwareVersion,
            };
            configJSON.config.actions.editMeter.data = Object.assign(Object.assign({}, (0, utilities_1.deepCopy)(configJSON.data)), { project: meter.projectId, phaseType: meter.phaseTypeValue, sourceType: meter.sourceTypeValue, consumptionType: meter.consumptionTypeValue });
            delete configJSON.config.actions.editMeter.data.consumer;
            return res.status(200).json(configJSON);
        }
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
metersRouter.post("/viewMeterDynamicParams", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewMeterDynamicParams_1.default);
        const meterId = req.body.id;
        const data = yield DBservice_1.default.Meters.getMeterDynamicParamsStats(meterId);
        // configJSON.data = data;
        console.log("data recieved", data);
        configJSON.data = {
            relay: (_c = (_b = (_a = data.rows) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.relayStatus) !== null && _c !== void 0 ? _c : ""
        };
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
metersRouter.post("/viewMeterFinancialThisMonth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const meterId = req.body.id;
        const configJSON = (0, utilities_1.deepCopy)(viewMeterFinancialThisMonth_1.default);
        const data = yield DBservice_1.default.Financials.getThisMonthFinancials(meterId);
        console.log("data financials", data);
        configJSON.data = data;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
metersRouter.post("/viewMeterFinancialPrevMonth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewMeterFinancialPrevMonth_1.default);
        const meterId = req.body.id;
        const data = yield DBservice_1.default.Financials.getPrevMonthFinancials(meterId);
        configJSON.data = data;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
metersRouter.post("/viewMetersBulkUpload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewMetersBulkUpload_1.default);
        const meterActionsConfigJSON = (0, utilities_1.deepCopy)(viewMeterActions_1.default);
        const meterActionFields = meterActionsConfigJSON.config.actions.createMeter.fields;
        meterActionFields.order.forEach((fieldId) => {
            if (meterActionFields[fieldId].inputType === "selectInput") {
                configJSON.config.columns[fieldId].allowedOptions = meterActionFields[fieldId].selectOptions.map(({ description }) => description);
            }
        });
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.columns.order;
            const excludedProjectOrder = order.filter(fieldId => fieldId !== "project");
            configJSON.config.columns.order = excludedProjectOrder;
        }
        configJSON.config.uploadNonce = uuid();
        (0, utilities_1.createLog)(tokenObj, Meters, METER_CSV_UPLOAD, configJSON);
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
metersRouter.post("/viewMetersBulkUploadResult", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const configJSON = (0, utilities_1.deepCopy)(viewMetersBulkUploadResult_1.default);
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
const storePieces = {};
metersRouter.post("/viewReceivedMeters", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const { messageType, nonce, piece } = req.body;
        if (!storePieces[nonce]) {
            storePieces[nonce] = [];
        }
        storePieces[nonce].push(piece);
        const csvStr = storePieces[nonce].join('');
        if (messageType === 'FINISH') {
            let csvJson;
            try {
                csvJson = JSON.parse(csvStr);
            }
            catch (e) {
                throw new Error("Parse Unsuccessfull");
            }
            if (tokenObj.accountTypeValue !== "superAdmin") {
                const projects = (yield DBservice_1.default.Project.getProjects())
                    .rows;
                let projectName = undefined;
                csvJson = csvJson.map((row) => {
                    var _a;
                    projectName = !projectName ? (_a = projects.find(project => project.projectId === tokenObj.projectId)) === null || _a === void 0 ? void 0 : _a.projectName : projectName;
                    return (Object.assign(Object.assign({}, row), { project: projectName }));
                });
            }
            storePieces[nonce] = [];
            const data = yield DBservice_1.default.Meters.receivedMeters(csvJson);
            return res.status(200).json(data);
        }
        return res.status(200).json({
            message: 'Receiving meters..'
        });
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
exports.default = metersRouter;
