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
const viewAllConsumerTable_1 = __importDefault(require("../../configs/viewAllConsumerTable"));
const viewConsumerActions_1 = __importDefault(require("../../configs/viewConsumerActions"));
const viewMeterRechargesTable_1 = __importDefault(require("../../configs/viewMeterRechargesTable"));
const viewConsumerDetails_1 = __importDefault(require("../../configs/viewConsumerDetails"));
const viewMeterStats_1 = __importDefault(require("../../configs/viewMeterStats"));
const viewMeterSanctionedLoad_1 = __importDefault(require("../../configs/viewMeterSanctionedLoad"));
const viewMeterCurrentConsumption_1 = __importDefault(require("../../configs/viewMeterCurrentConsumption"));
const viewConsumersBulkUpload_1 = __importDefault(require("../../configs/viewConsumersBulkUpload"));
const viewConsumersBulkUploadResult_1 = __importDefault(require("../../configs/viewConsumersBulkUploadResult"));
const { v4: uuid } = require('uuid');
const DBservice_1 = __importDefault(require("../../services/DBservice"));
const MeterRecharge_1 = __importDefault(require("../../services/DBservice/MeterRecharge"));
const joi_1 = __importDefault(require("joi"));
const viewMeterCurrentMonthConsumption_1 = __importDefault(require("../../configs/viewMeterCurrentMonthConsumption"));
const logConsts_1 = require("../logConsts");
const { Consumers } = logConsts_1.LOG_MODULE_CONSTS;
const { CREATE_CONSUMER, EDIT_CONSUMER, ENABLE_CONSUMER, DISABLE_CONSUMER, COSNUMER_UPLOAD } = logConsts_1.LOG_ACTION_CONSTS[Consumers];
const consumersRouter = express_1.default.Router();
const ADMIN_CONSUMER_ENABLED_FIELDS = [
    "firstName",
    "lastName",
    "address",
    "isVVIP",
    "mobileNo",
    "email",
    "totalLoadDG",
    "DGLoadR",
    "DGLoadY",
    "DGLoadB",
    "totalLoadGrid",
    "gridLoadR",
    "gridLoadY",
    "gridLoadB",
    "tarrifGroup"
];
consumersRouter.post("/createConsumer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "project": joi_1.default.string().required().min(1),
        "firstName": joi_1.default.string().required().min(1),
        "lastName": joi_1.default.string().required().min(1),
        "mobileNo": joi_1.default.string().required().min(1),
        "tarrifGroup": joi_1.default.string().allow(null),
        "address": joi_1.default.string(),
        "connectionNo": joi_1.default.string().allow(null, ""),
        "panNo": joi_1.default.string(),
        "gstNo": joi_1.default.string(),
        "towerNo": joi_1.default.string(),
        "flatNo": joi_1.default.string(),
        "flatType": joi_1.default.string(),
        "shopNo": joi_1.default.string(),
        "email": joi_1.default.string(),
        // "totalLoadGrid": Joi.string(),
        // "gridLoadR": Joi.string(),
        // "gridLoadY": Joi.string(),
        // "gridLoadB": Joi.string(),
        // "totalLoadDG": Joi.string(),
        // "DGLoadR": Joi.string(),
        // "DGLoadY": Joi.string(),
        // "DGLoadB": Joi.string(),
        "openingBalance": joi_1.default.string(),
        "area": joi_1.default.string(),
        "consumptionReadingGridKwh": joi_1.default.string(),
        // "consumptionReadingDGKwh": Joi.string(),
        // "consumptionReadingGridKvah": Joi.string(),
        // "consumptionReadingDGKvah": Joi.string(),
        "isVVIP": joi_1.default.boolean().allow(null),
        "meterSerialNo": joi_1.default.string().allow(null)
    }).options({
        stripUnknown: true
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        console.log("hsagcvjsacbjzch", JSON.stringify(data));
        yield schema.validateAsync(data);
        const result = yield DBservice_1.default.Consumers.createConsumer(data);
        (0, utilities_1.createLog)(tokenObj, Consumers, CREATE_CONSUMER, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        console.log("in here with err");
        res.status(400).json({ message: e.error });
    }
}));
consumersRouter.post("/editConsumer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "id": joi_1.default.string().required().min(1),
        "project": joi_1.default.string().required().min(1),
        "firstName": joi_1.default.string().required().min(1),
        "lastName": joi_1.default.string().required().min(1),
        "mobileNo": joi_1.default.string().required().min(1),
        "tarrifGroup": joi_1.default.string().allow(null),
        "address": joi_1.default.string().allow(null),
        "connectionNo": joi_1.default.string().allow(null),
        "panNo": joi_1.default.string().allow(null),
        "gstNo": joi_1.default.string().allow(null),
        "towerNo": joi_1.default.string().allow(null),
        "flatNo": joi_1.default.string().allow(null),
        "flatType": joi_1.default.string().allow(null),
        "shopNo": joi_1.default.string().allow(null),
        "email": joi_1.default.string().allow(null),
        "totalLoadGrid": joi_1.default.string().allow(null, ''),
        "gridLoadR": joi_1.default.string().allow(null),
        "gridLoadY": joi_1.default.string().allow(null),
        "gridLoadB": joi_1.default.string().allow(null),
        "totalLoadDG": joi_1.default.string().allow(null, ''),
        "DGLoadR": joi_1.default.string().allow(null),
        "DGLoadY": joi_1.default.string().allow(null),
        "DGLoadB": joi_1.default.string().allow(null),
        "openingBalance": joi_1.default.string().allow(null),
        "area": joi_1.default.string().allow(null),
        "consumptionReadingGridKwh": joi_1.default.string(),
        "consumptionReadingDGKwh": joi_1.default.string(),
        "consumptionReadingGridKvah": joi_1.default.string(),
        "consumptionReadingDGKvah": joi_1.default.string(),
        "isVVIP": joi_1.default.boolean().allow(null)
    }).options({ allowUnknown: true });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        console.log("edit", data);
        // await schema.validateAsync(data)
        const result = yield DBservice_1.default.Consumers.editConsumer(data);
        (0, utilities_1.createLog)(tokenObj, Consumers, EDIT_CONSUMER, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
consumersRouter.post("/enableConsumer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        console.log("edit", data);
        // await schema.validateAsync(data)
        const result = yield DBservice_1.default.Consumers.enableConsumer(data);
        (0, utilities_1.createLog)(tokenObj, Consumers, ENABLE_CONSUMER, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
consumersRouter.post("/disableConsumer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        console.log("edit", data);
        // await schema.validateAsync(data)
        const result = yield DBservice_1.default.Consumers.disableConsumer(data);
        (0, utilities_1.createLog)(tokenObj, Consumers, DISABLE_CONSUMER, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
const resetPasswordSchema = joi_1.default.object({
    consumerId: joi_1.default.string().required(),
});
consumersRouter.post("/reset_Password_consumer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield resetPasswordSchema.validateAsync(req.body);
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const { consumerId } = req.body;
        const data = yield DBservice_1.default.Consumers.resetPassword(consumerId);
        if (data.status === "success") {
            return res.status(200).json({
                status: data.status,
                message: data.data
            });
        }
        else {
            return res.status(400).json({
                status: data.status,
                message: data.data || "Unable to reset password. Please try again"
            });
        }
    }
    catch (e) {
        if (e.isJoi) {
            return res.status(400).json({
                message: "INVALID_REQUEST",
                details: e.details
            });
        }
        return res.status(500).json({
            message: "INTERNAL_SERVER_ERROR"
        });
    }
}));
consumersRouter.post("/viewConsumerActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewConsumerActions_1.default);
        let meterSerialNoOptions = [];
        let tarrifGroupOptions = [];
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.actions.addConsumer.fields.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.actions.addConsumer.fields.order = excludedProjectOrder;
            const projectId = tokenObj.projectId;
            const tarrifGroups = (yield DBservice_1.default.Tarrifs.getTarrifGroupsByProjectId(projectId)).rows;
            tarrifGroupOptions = tarrifGroups.map(tG => {
                return {
                    forProject: projectId,
                    value: tG.id,
                    description: tG.tarrifGroupName
                };
            });
            const unAllotedMeters = (yield DBservice_1.default.Meters.getMeters({
                getAll: true,
                perPage: 1,
                currPage: 1,
                additionalFilters: [
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: `${projectId}`
                    },
                    {
                        trackId: "",
                        filterType: "meters",
                        filterValue: `un-alloted`
                    }
                ]
            })).rows;
            meterSerialNoOptions = unAllotedMeters.map((meter) => {
                return {
                    forProject: projectId,
                    value: meter.meterSerialNo,
                    description: meter.meterSerialNo
                };
            });
        }
        else {
            let selectOptions = configJSON.config.actions.addConsumer.fields.project.selectOptions;
            const projects = (yield DBservice_1.default.Project.getProjects()).rows;
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.actions.addConsumer.fields.project.selectOptions = selectOptions;
            const tarrifGroups = (yield DBservice_1.default.Tarrifs.getTarrifGroupsWithTariffRelation()).rows;
            tarrifGroupOptions = tarrifGroups.map(tG => {
                return {
                    forProject: tG.projectId,
                    value: tG.id,
                    description: tG.tarrifGroupName
                };
            });
            const unAllotedMeters = (yield DBservice_1.default.Meters.getMeters({
                getAll: true,
                perPage: 1,
                currPage: 1,
                additionalFilters: [
                    {
                        trackId: "",
                        filterType: "meters",
                        filterValue: `un-alloted`
                    }
                ]
            })).rows;
            meterSerialNoOptions = unAllotedMeters.map((meter) => {
                console.log("hvhjhsb", meter);
                return {
                    forProject: meter.projectId,
                    value: meter.meterSerialNo,
                    description: meter.meterSerialNo
                };
            });
        }
        configJSON.config.actions.addConsumer.fields.tarrifGroup.selectOptions = [
            {
                value: '',
                description: ''
            },
            ...tarrifGroupOptions
        ];
        console.log("tarrif grup actions", tarrifGroupOptions);
        configJSON.config.actions.addConsumer.fields.meterSerialNo.selectOptions = [
            {
                value: '',
                description: ''
            },
            ...meterSerialNoOptions
        ];
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
consumersRouter.post("/viewAllConsumersTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        let consumersResponse;
        let rows = [];
        const projects = (yield DBservice_1.default.Project.getProjects()).rows;
        const projectSelectOptions = projects.map(project => ({
            value: project.projectId,
            description: project.projectName
        }));
        const configJSON = (0, utilities_1.deepCopy)(viewAllConsumerTable_1.default);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.columns.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.columns.order = excludedProjectOrder;
            const projectId = tokenObj.projectId;
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions;
            consumersResponse = yield DBservice_1.default.Consumers.getConsumersByProjectId(projectId, filters);
            rows = consumersResponse.rows;
        }
        else {
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions;
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions;
            consumersResponse = yield DBservice_1.default.Consumers.getConsumers(filters);
            rows = consumersResponse.rows;
        }
        configJSON.data.totalRecords = consumersResponse.totalRecords;
        configJSON.data.rows = rows.map((row) => {
            var _a, _b;
            row.id = row.consumerId;
            row.consumerName = {
                label: row.consumerName,
                link: `/admin/consumers/${row.consumerId}`
            };
            row.project = {
                label: (_b = (_a = projectSelectOptions.find(project => project.value === `${row.projectId}`)) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : "ProjectNameNotFound",
                link: `/admin/projects/${row.projectId}`
            };
            row.meter = {
                label: row.meterSerialNo,
                link: `/admin/meters/${row.meterId}`
            };
            row.DGLoadR = row.dgloadR;
            row.DGLoadY = row.dgloadY;
            row.DGLoadB = row.dgloadB;
            row.emailId = row.email;
            //row.meter = row.meterSerialNo
            return row;
        });
        return res.status(200).json(configJSON);
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
consumersRouter.post("/viewConsumerDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        console.log(tokenObj);
        const configJSON = (0, utilities_1.deepCopy)(viewConsumerDetails_1.default);
        let id = req.body.id;
        configJSON.config.id = id;
        const projects = (yield DBservice_1.default.Project.getProjects()).rows;
        const projectSelectOptions = projects.map(project => ({
            value: project.projectId,
            description: project.projectName
        }));
        let tarrifGroupOptions = [];
        let meterSerialNoOptions = [];
        for (const field of configJSON.config.actions.editConsumer.fields.order) {
            configJSON.config.actions.editConsumer.fields[field].disabled = !ADMIN_CONSUMER_ENABLED_FIELDS.includes(field);
        }
        if (tokenObj.accountTypeValue === "superAdmin") {
            let selectOptions = configJSON.config.actions.editConsumer.fields.project.selectOptions;
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.actions.editConsumer.fields.project.selectOptions = selectOptions;
            const tarrifGroups = (yield DBservice_1.default.Tarrifs.getTarrifGroups()).rows;
            tarrifGroupOptions = tarrifGroups.map(tG => {
                return {
                    forProject: tG.projectId,
                    value: tG.id,
                    description: tG.tarrifGroupName
                };
            });
            const unAllotedMeters = (yield DBservice_1.default.Meters.getMeters({
                getAll: true,
                perPage: 1,
                currPage: 1,
                additionalFilters: [
                    {
                        trackId: "",
                        filterType: "meters",
                        filterValue: `un-alloted`
                    }
                ]
            })).rows;
            meterSerialNoOptions = unAllotedMeters.map((meter) => {
                return {
                    forProject: meter.projectId,
                    value: meter.meterSerialNo,
                    description: meter.meterSerialNo
                };
            });
        }
        else {
            const order = configJSON.config.actions.editConsumer.fields.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.actions.editConsumer.fields.order = excludedProjectOrder;
            const projectId = tokenObj.projectId;
            const tarrifGroups = (yield DBservice_1.default.Tarrifs.getTarrifGroupsByProjectId(projectId)).rows;
            tarrifGroupOptions = tarrifGroups.map(tG => {
                return {
                    forProject: projectId,
                    value: tG.id,
                    description: tG.tarrifGroupName
                };
            });
            const unAllotedMeters = (yield DBservice_1.default.Meters.getMeters({
                getAll: true,
                perPage: 1,
                currPage: 1,
                additionalFilters: [
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: `${projectId}`
                    },
                    {
                        trackId: "",
                        filterType: "meters",
                        filterValue: `un-alloted`
                    }
                ]
            })).rows;
            meterSerialNoOptions = unAllotedMeters.map((meter) => {
                return {
                    forProject: projectId,
                    value: meter.meterSerialNo,
                    description: meter.meterSerialNo
                };
            });
        }
        if (tokenObj.accountTypeValue === "consumer") {
            id = tokenObj.consumerId;
        }
        console.log("id before requesting", id);
        const consumers = (yield DBservice_1.default.Consumers.getConsumerById(id)).rows;
        const excludedFields = [];
        if (tokenObj.accountTypeValue !== "superAdmin") {
            excludedFields.push("project");
        }
        if (consumers === null || consumers === void 0 ? void 0 : consumers[0]) {
            const consumer = consumers[0];
            consumer.meter = {
                value: consumer.meterSerialNo,
                link: `/admin/meters/${consumer.meterId}`
            };
            consumer.project = {
                value: (_b = (_a = projectSelectOptions.find(option => option.value === String(consumer.projectId))) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : "-",
                link: `/admin/projects/${consumer.projectId}`
            };
            consumer.DGLoadR = consumer.dgloadR;
            consumer.DGLoadY = consumer.dgloadY;
            consumer.DGLoadB = consumer.dgloadB;
            if ((!consumer.projectId || consumer.projectId.length === 0) && !excludedFields.includes("project")) {
                excludedFields.push("project");
            }
            if ((!consumer.meterId || consumer.meterId.length === 0)) {
                excludedFields.push("meter");
            }
            const consumerCpy = (0, utilities_1.deepCopy)(consumer);
            configJSON.data = Object.assign(Object.assign({}, consumerCpy), { flatType: (_d = (_c = configJSON.config.actions.editConsumer.fields.flatType.selectOptions.find((option) => option.value === consumerCpy.flatType)) === null || _c === void 0 ? void 0 : _c.description) !== null && _d !== void 0 ? _d : "", enabled: consumer.enabled ? "Yes" : "No" });
            configJSON.config.actions.editConsumer.data = Object.assign(Object.assign({}, (0, utilities_1.deepCopy)(consumer)), { project: String(consumer.projectId), email: consumer.email, tarrifGroup: consumer.tarrifGroupId, isVVIP: (consumer === null || consumer === void 0 ? void 0 : consumer.isVVIP) === "Yes" });
            console.log(configJSON.data);
            delete configJSON.config.actions.editConsumer.data.emailId;
            delete configJSON.config.actions.editConsumer.data.meter;
            delete configJSON.config.actions.editConsumer.data.meterId;
            delete configJSON.config.actions.editConsumer.data.consumerId;
            const order = configJSON.config.actions.order;
            const excludedOrder = order.filter((fieldId) => fieldId !== (consumer.enabled ? "enable" : "disable"));
            console.log("consumer.enabled", (consumer.enabled ? "enable" : "disable"));
            configJSON.config.actions.order = excludedOrder;
        }
        const order = configJSON.config.fields.order;
        const excludedFieldsOrder = order.filter((fieldId) => !excludedFields.includes(fieldId));
        configJSON.config.fields.order = excludedFieldsOrder;
        configJSON.config.actions.editConsumer.fields.meterSerialNo.selectOptions = [
            {
                value: '',
                description: ''
            },
            ...meterSerialNoOptions
        ];
        configJSON.config.actions.editConsumer.fields.tarrifGroup.selectOptions = [
            {
                value: '',
                description: ''
            },
            ...tarrifGroupOptions
        ];
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.actions.hide = true;
            delete configJSON.data.meter.link;
        }
        configJSON.config.id = id;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        console.log("-------", e);
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
consumersRouter.post("/viewMeterStats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        const configJSON = (0, utilities_1.deepCopy)(viewMeterStats_1.default);
        let consumerId = req.body.id;
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId;
        }
        const data = yield DBservice_1.default.Consumers.getConsumerMeterStats(consumerId);
        configJSON.data = data;
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId;
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
consumersRouter.post("/viewMeterSanctionedLoad", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        const configJSON = (0, utilities_1.deepCopy)(viewMeterSanctionedLoad_1.default);
        let consumerId = req.body.id;
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId;
        }
        const data = yield DBservice_1.default.Consumers.getConsumerSanctionedLoadStats(consumerId);
        configJSON.data = data;
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId;
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
consumersRouter.post("/viewMeterCurrentConsumption", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        const configJSON = (0, utilities_1.deepCopy)(viewMeterCurrentConsumption_1.default);
        let consumerId = req.body.id;
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId;
        }
        const data = yield DBservice_1.default.Consumers.getConsumerCurrentConsumptionStats(consumerId);
        configJSON.data = data;
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId;
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
consumersRouter.post("/viewMeterCurrentMonthConsumption", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hvcvcjhvjvjhvjvjhcvjhh");
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        const configJSON = (0, utilities_1.deepCopy)(viewMeterCurrentMonthConsumption_1.default);
        let consumerId = req.body.id;
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId;
        }
        const data = yield DBservice_1.default.Consumers.getConsumerCurrentMonthBalanceStats(consumerId);
        configJSON.data = data;
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId;
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
consumersRouter.post("/viewMeterRechargesTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        let consumerId = req.body.id;
        console.log("sdvcjd", consumerId);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewMeterRechargesTable_1.default);
        let meterRecharge = [];
        let totalRecords = 0;
        if (tokenObj.accountTypeValue === "consumer") {
            console.log("inside table");
            consumerId = tokenObj.consumerId;
        }
        let manualRechargeRespose = yield MeterRecharge_1.default.getAllPaymentRechargeList(consumerId, filters);
        console.log("manual recharge", manualRechargeRespose);
        totalRecords = manualRechargeRespose.totalRecords;
        ;
        console.log("final test", meterRecharge);
        configJSON.data.rows = manualRechargeRespose.rows.map(row => {
            return {
                "paymentType": row.transaction_type,
                "meter": row.meterSNo,
                "method": row.method,
                "transactionId": row.transactionId,
                "checqueNo": row.chequeNo,
                "checqueDate": row.chequeDate,
                "bankName": row.bankName,
                "amount": row.amount,
                "availableBalance": row.remainingBalance,
                "comment": row.comment,
                "venderCode": row.vendorCode,
                "createdAt": row.createdAt,
            };
        });
        configJSON.data.totalRecords = totalRecords;
        // const meterRecharges: DBResponse = await DBservice.Consumers.getConsumerRechargesByConsumerId(consumerId, filters)
        // configJSON.data.totalRecords = meterRecharges.totalRecords
        //configJSON.data.totalRecords = 0
        // configJSON.data.rows = meterRecharges.rows.map(row => {
        //     row.id = row.rechargeId
        //     row.meter = {
        //         link: `/admin/meters/${row.meterId}`,
        //         label: row.meterSerialNo
        //     }
        //     return row
        // })
        //configJSON.data.rows = []
        console.log("sduyjbhcjxv", configJSON);
        if (tokenObj.accountTypeValue === "consumer") {
            console.log("inside table");
            configJSON.config.id = tokenObj.consumerId;
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
consumersRouter.post("/viewConsumersBulkUpload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewConsumersBulkUpload_1.default);
        const consumerActionsConfigJSON = (0, utilities_1.deepCopy)(viewConsumerActions_1.default);
        const consumerActionFields = consumerActionsConfigJSON.config.actions.addConsumer.fields;
        consumerActionFields.order.forEach((fieldId) => {
            if (consumerActionFields[fieldId].inputType === "selectInput") {
                configJSON.config.columns[fieldId].allowedOptions = consumerActionFields[fieldId].selectOptions.map(({ description }) => description);
            }
        });
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.columns.order;
            const excludedProjectOrder = order.filter(fieldId => fieldId !== "project");
            configJSON.config.columns.order = excludedProjectOrder;
        }
        configJSON.config.uploadNonce = uuid();
        // createLog(tokenObj, Consumers, CONSUMER_CSV_UPLOAD, configJSON);
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
consumersRouter.post("/viewConsumersBulkUploadResult", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewConsumersBulkUploadResult_1.default);
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
consumersRouter.post("/viewReceivedConsumers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const { messageType, nonce, piece } = req.body;
        if (!storePieces[nonce]) {
            storePieces[nonce] = [];
        }
        storePieces[nonce].push(piece);
        const csvStr = storePieces[nonce].join('');
        console.log("concatenated str", csvStr);
        console.log(storePieces[nonce]);
        if (messageType == 'FINISH') {
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
            const data = yield DBservice_1.default.Consumers.receivedConsumers(csvJson);
            return res.status(200).json(data);
        }
        return res.status(200).json({
            message: 'Receiving consumers..'
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
exports.default = consumersRouter;
