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
const viewManualRecharge_1 = __importDefault(require("../../configs/viewManualRecharge"));
const MeterRecharge_1 = __importDefault(require("../../services/DBservice/MeterRecharge"));
const ConsumersDBService_1 = __importDefault(require("../../services/DBservice/ConsumersDBService"));
const viewManualRechargeGroupTable_1 = __importDefault(require("../../configs/viewManualRechargeGroupTable"));
const viewDebitNoteTable_1 = __importDefault(require("../../configs/viewDebitNoteTable"));
const viewCreditNoteTable_1 = __importDefault(require("../../configs/viewCreditNoteTable"));
const ProjectDBService_1 = __importDefault(require("../../services/DBservice/ProjectDBService"));
const banks_1 = __importDefault(require("../../configs/readableConfigs/banks"));
const logConsts_1 = require("../logConsts");
const { MeterRecharge } = logConsts_1.LOG_MODULE_CONSTS;
const { CREATE_MANUAL_RECHARGE, CREATE_CREDIT_NOTE, CREATE_DEBIT_NOTE, } = logConsts_1.LOG_ACTION_CONSTS[MeterRecharge];
const meterRechargeRouter = express_1.default.Router();
const RUN_MODE = process.env.RUN_MODE || "dev";
meterRechargeRouter.post("/viewManualChargeActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewManualRecharge_1.default);
        configJSON.config.actions.manualRecharge.fields.bankName.selectOptions = [
            {
                value: "-",
                description: "-"
            },
            ...banks_1.default.banks
        ];
        const filters = {};
        if (tokenObj.accountTypeValue !== "superAdmin") {
            filters.additionalFilters = [
                {
                    trackId: "",
                    filterType: "project",
                    filterValue: String(tokenObj.projectId)
                }
            ];
        }
        if (RUN_MODE != "dev") {
            const consumers = (yield ConsumersDBService_1.default.getAllConsumers(filters)).rows;
            const consumerSelectOptions = consumers.map((consumer) => ({
                value: consumer.consumerId,
                crnNo: consumer.crnNo,
                meterSerialNo: consumer.meterSerialNo,
                description: consumer.consumerName,
            }));
            const meterOptions = consumers.map(consumer => {
                return {
                    value: consumer.meterSerialNo,
                    crnNo: consumer.crnNo,
                    consumerId: consumer.consumerId,
                    description: consumer.meterSerialNo
                };
            });
            const crnOptions = consumers.map((consumer) => {
                return {
                    value: consumer.consumerId,
                    description: consumer.crnNo,
                    meterSerialNo: consumer.meterSerialNo
                };
            });
            console.log(consumerSelectOptions);
            //let MAnualRechargeMeterSelectOptions=configJSON.config.actions.manualRecharge.fields.meterInfo.selectOptions;
            let manualRechargeSelectOptions = configJSON.config.actions.manualRecharge.fields.consumer.selectOptions;
            let creditNoteSelectOptions = configJSON.config.actions.creditNote.fields.consumer.selectOptions;
            let debitNoteSelectOptions = configJSON.config.actions.debitNote.fields.consumer.selectOptions;
            //MAnualRechargeMeterSelectOptions=[...manualRechargeSelectOptions,...data];
            manualRechargeSelectOptions = [
                ...manualRechargeSelectOptions,
                ...consumerSelectOptions,
            ];
            creditNoteSelectOptions = [
                ...creditNoteSelectOptions,
                ...consumerSelectOptions,
            ];
            debitNoteSelectOptions = [
                ...debitNoteSelectOptions,
                ...consumerSelectOptions,
            ];
            //configJSON.config.actions.manualRecharge.fields.meterInfo.selectOptions=MAnualRechargeMeterSelectOptions
            configJSON.config.actions.manualRecharge.fields.meter.selectOptions = [
                {
                    value: "-",
                    description: "-"
                },
                ...meterOptions
            ];
            configJSON.config.actions.manualRecharge.fields.crnNo.selectOptions = [
                {
                    value: "-",
                    description: "-"
                },
                ...crnOptions
            ];
            configJSON.config.actions.manualRecharge.fields.consumer.selectOptions =
                manualRechargeSelectOptions;
            configJSON.config.actions.creditNote.fields.crnNo.selectOptions = [
                {
                    value: "-",
                    description: "-"
                },
                ...crnOptions
            ];
            configJSON.config.actions.creditNote.fields.meter.selectOptions = [
                {
                    value: "-",
                    description: "-"
                },
                ...meterOptions
            ];
            configJSON.config.actions.creditNote.fields.consumer.selectOptions =
                creditNoteSelectOptions;
            configJSON.config.actions.debitNote.fields.crnNo.selectOptions = [
                {
                    value: "-",
                    description: "-"
                },
                ...crnOptions
            ];
            configJSON.config.actions.debitNote.fields.meter.selectOptions = [
                {
                    value: "-",
                    description: "-"
                },
                ...meterOptions
            ];
            configJSON.config.actions.debitNote.fields.consumer.selectOptions =
                debitNoteSelectOptions;
        }
        console.log("qweeysjvj", configJSON);
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
meterRechargeRouter.post("/createManualRechargeActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const result = yield MeterRecharge_1.default.createManualRecharge(data);
        (0, utilities_1.createLog)(tokenObj, MeterRecharge, CREATE_MANUAL_RECHARGE, data);
        res.status(200).json(result);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
meterRechargeRouter.post("/createCreditNoteActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        console.log(data);
        const result = yield MeterRecharge_1.default.createCreditNote(data);
        (0, utilities_1.createLog)(tokenObj, MeterRecharge, CREATE_CREDIT_NOTE, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
meterRechargeRouter.post("/createDebitNoteActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        console.log(data);
        const result = yield MeterRecharge_1.default.createDebitNote(data);
        (0, utilities_1.createLog)(tokenObj, MeterRecharge, CREATE_DEBIT_NOTE, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
meterRechargeRouter.post("/viewAllManualRechargeTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        let filters = (0, utilities_1.extractFiltersFromRequest)(req);
        let meterRecharge = [];
        let totalRecords = 0;
        const configJSON = (0, utilities_1.deepCopy)(viewManualRechargeGroupTable_1.default);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            filters = Object.assign(Object.assign({}, (filters !== null && filters !== void 0 ? filters : {})), { additionalFilters: [
                    ...((_a = filters.additionalFilters) !== null && _a !== void 0 ? _a : []),
                    {
                        "trackId": "",
                        filterType: "project",
                        filterValue: String(tokenObj.projectId)
                    }
                ] });
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions;
        }
        else {
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions;
            const projects = (yield ProjectDBService_1.default.getProjects()).rows;
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions;
        }
        let manualRechargeRespose = yield MeterRecharge_1.default.getAllManualRechargeList(filters);
        totalRecords = manualRechargeRespose.totalRecords;
        meterRecharge = manualRechargeRespose.rows;
        console.log("final test", meterRecharge);
        configJSON.data.rows = meterRecharge.map((row) => {
            return {
                consumer: {
                    label: row.consumerName,
                    link: `/admin/consumers/${row.consumerId}`,
                },
                meter: row.meterSNo,
                method: row.method,
                transactionId: row.transactionId,
                checqueNo: row.chequeNo,
                checqueDate: row.chequeDate,
                bankName: row.bankName,
                amount: row.amount,
                //availableBalance: row.availableBalance,
                comment: row.comment,
                createdAt: row.createdAt,
                venderCode: row.vendorCode,
            };
        });
        configJSON.data.totalRecords = totalRecords;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
meterRechargeRouter.post("/viewAllCreditNoteTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        let filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewCreditNoteTable_1.default);
        let meterRecharge = [];
        let totalRecords = 0;
        if (tokenObj.accountTypeValue !== "superAdmin") {
            filters = Object.assign(Object.assign({}, (filters !== null && filters !== void 0 ? filters : {})), { additionalFilters: [
                    ...((_a = filters.additionalFilters) !== null && _a !== void 0 ? _a : []),
                    {
                        "trackId": "",
                        filterType: "project",
                        filterValue: String(tokenObj.projectId)
                    }
                ] });
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions;
        }
        else {
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions;
            const projects = (yield ProjectDBService_1.default.getProjects()).rows;
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions;
        }
        let manualRechargeRespose = yield MeterRecharge_1.default.getAllCreditNoteList(filters);
        console.log("manual recharge", manualRechargeRespose);
        totalRecords = manualRechargeRespose.totalRecords;
        meterRecharge = manualRechargeRespose.rows;
        console.log("final test", meterRecharge);
        configJSON.data.rows = meterRecharge.map((row) => {
            return {
                consumer: {
                    label: row.consumerName,
                    link: `/admin/consumers/${row.consumerId}`,
                },
                meter: row.meterSNo,
                amount: row.amount,
                //availableBalance: row.availableBalance,
                comment: row.comment,
                venderCode: row.vendorCode,
                createdAt: row.createdAt,
            };
        });
        configJSON.data.totalRecords = totalRecords;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
meterRechargeRouter.post("/viewAllDebitNoteTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        let filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewDebitNoteTable_1.default);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            filters = Object.assign(Object.assign({}, (filters !== null && filters !== void 0 ? filters : {})), { additionalFilters: [
                    ...((_a = filters.additionalFilters) !== null && _a !== void 0 ? _a : []),
                    {
                        "trackId": "",
                        filterType: "project",
                        filterValue: String(tokenObj.projectId)
                    }
                ] });
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions;
        }
        else {
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions;
            const projects = (yield ProjectDBService_1.default.getProjects()).rows;
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions;
        }
        let meterRecharge = [];
        let totalRecords = 0;
        let manualRechargeRespose = yield MeterRecharge_1.default.getAllDebitNoteList(filters);
        console.log("manual recharge", manualRechargeRespose);
        totalRecords = manualRechargeRespose.totalRecords;
        meterRecharge = manualRechargeRespose.rows;
        console.log("final test", meterRecharge);
        configJSON.data.rows = meterRecharge.map((row) => {
            return {
                consumer: {
                    label: row.consumerName,
                    link: `/admin/consumers/${row.consumerId}`,
                },
                meter: row.meterSNo,
                amount: row.amount,
                //availableBalance: row.availableBalance,
                comment: row.comment,
                venderCode: row.vendorCode,
                createdAt: row.createdAt,
            };
        });
        configJSON.data.totalRecords = totalRecords;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
meterRechargeRouter.post("/getMeterSerialNoByConsumerId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewManualRecharge_1.default);
        const id = req.body.consumerId;
        let resp;
        if (RUN_MODE != "dev") {
            resp = yield MeterRecharge_1.default.getMeterSerialNoByConsumerId(id);
        }
        return res.status(200).json(resp);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
exports.default = meterRechargeRouter;
