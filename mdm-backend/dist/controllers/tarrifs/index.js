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
const viewTarrifActions_1 = __importDefault(require("../../configs/viewTarrifActions"));
const viewAllTarrifGroupsTable_1 = __importDefault(require("../../configs/viewAllTarrifGroupsTable"));
const viewAllTarrifsTable_1 = __importDefault(require("../../configs/viewAllTarrifsTable"));
const viewTarrifDetails_1 = __importDefault(require("../../configs/viewTarrifDetails"));
const DBservice_1 = __importDefault(require("../../services/DBservice"));
const joi_1 = __importDefault(require("joi"));
const viewAllAtachTariffHistory_1 = __importDefault(require("../../configs/viewAllAtachTariffHistory"));
const moment_1 = __importDefault(require("moment"));
const logConsts_1 = require("../logConsts");
const { Tarrifs } = logConsts_1.LOG_MODULE_CONSTS;
const { ADD_TARRIF_GROUP, CREATE_TARRIF, ATTACH_TARRIF, CHANGE_TARRIF } = logConsts_1.LOG_ACTION_CONSTS[Tarrifs];
const tarrifsRouter = express_1.default.Router();
tarrifsRouter.post("/attachOrDetachTarrif", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        tarrifGroup: joi_1.default.string().required().min(1),
        tarrif: joi_1.default.string().allow(""),
        project: joi_1.default.string(),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        yield schema.validateAsync(data);
        console.log(data);
        const result = yield DBservice_1.default.Tarrifs.attachOrDetachTarrif(data);
        (0, utilities_1.createLog)(tokenObj, Tarrifs, ATTACH_TARRIF, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
tarrifsRouter.post("/changeTariff", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        tarrifGroup: joi_1.default.string().required().min(1),
        tarrif: joi_1.default.string().allow(""),
        project: joi_1.default.string(),
        applicableDate: joi_1.default.string(),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        yield schema.validateAsync(data);
        console.log(data);
        const result = yield DBservice_1.default.Tarrifs.changeTariff(data);
        (0, utilities_1.createLog)(tokenObj, Tarrifs, CHANGE_TARRIF, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
tarrifsRouter.post("/createTarrif", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        data.slabs.forEach((slab) => {
            // Use 'typeof slab' here if needed in a different context
            let slabType = Object.assign({}, slab); // If you need to refer to the type dynamically
            slab.id = "";
        });
        data.fixedCharges.forEach((fixedCharge) => {
            // Use 'typeof slab' here if needed in a different context
            let slabType = Object.assign({}, fixedCharge); // If you need to refer to the type dynamically
            fixedCharge.id = "";
        });
        console.log(data);
        const result = yield DBservice_1.default.Tarrifs.createTarrif(data);
        (0, utilities_1.createLog)(tokenObj, Tarrifs, CREATE_TARRIF, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ message: e.error });
    }
}));
tarrifsRouter.post("/createTarrifGroup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        tarrifGroupName: joi_1.default.string().required().min(1),
        tarrifGroupDescription: joi_1.default.string().required(),
        project: joi_1.default.string(),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId;
        }
        yield schema.validateAsync(data);
        console.log(data);
        const result = yield DBservice_1.default.Tarrifs.createTarrifGroup(data);
        (0, utilities_1.createLog)(tokenObj, Tarrifs, ADD_TARRIF_GROUP, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ message: e.error });
    }
}));
tarrifsRouter.post("/viewTarrifActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewTarrifActions_1.default);
        let tarrifGroupOptions = [];
        let unlinkTarrifGroupOptions = [];
        let tarrifOptions = [];
        let unlinkTarrifOptions = [];
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.actions.createTarrif.fields.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.actions.createTarrif.fields.order =
                excludedProjectOrder;
            const tarrifGroupOrder = configJSON.config.actions.addTarrifGroup.fields.order;
            const excludedTarrifGroupProjectOrder = tarrifGroupOrder.filter((fieldId) => fieldId !== "project");
            configJSON.config.actions.addTarrifGroup.fields.order =
                excludedTarrifGroupProjectOrder;
            const aODTarrifOrder = configJSON.config.actions.attachOrDetachTarrif.fields.order;
            const excludedAODTarrifProjectOrder = aODTarrifOrder.filter((fieldId) => fieldId !== "project");
            configJSON.config.actions.attachOrDetachTarrif.fields.order =
                excludedAODTarrifProjectOrder;
            configJSON.config.actions.changeTariff.fields.order =
                excludedAODTarrifProjectOrder;
            const projectId = tokenObj.projectId;
            console.log("before api 1 loaded");
            const tarrifGroups = (yield DBservice_1.default.Tarrifs.getTarrifGroupsByProjectId(projectId)).rows;
            console.log("after api 1 loaded");
            tarrifGroupOptions = tarrifGroups.map((tG) => {
                return {
                    forProject: projectId,
                    tarrifId: tG === null || tG === void 0 ? void 0 : tG.tarrifId,
                    tarrifName: tG === null || tG === void 0 ? void 0 : tG.tarrifName,
                    value: tG === null || tG === void 0 ? void 0 : tG.id,
                    description: tG === null || tG === void 0 ? void 0 : tG.tarrifGroupName,
                };
            });
            const tarrifs = (yield DBservice_1.default.Tarrifs.getAvailableTarrifsByProjectId(projectId)).rows;
            tarrifOptions = tarrifs.map((t) => {
                return {
                    forProject: projectId,
                    value: t.id,
                    description: t.tarrifName,
                };
            });
        }
        else {
            let selectOptions = configJSON.config.actions.createTarrif.fields.project.selectOptions;
            const projects = (yield DBservice_1.default.Project.getProjects())
                .rows;
            const projectSelectOptions = projects.map((project) => ({
                value: project.projectId,
                description: project.projectName,
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.actions.createTarrif.fields.project.selectOptions =
                selectOptions;
            configJSON.config.actions.addTarrifGroup.fields.project.selectOptions =
                selectOptions;
            configJSON.config.actions.attachOrDetachTarrif.fields.project.selectOptions =
                selectOptions;
            configJSON.config.actions.changeTariff.fields.project.selectOptions =
                selectOptions;
            configJSON.config.actions.attachOrDetachTarrif.fields.tarrif.hide =
                true;
            configJSON.config.actions.attachOrDetachTarrif.fields.tarrifGroup.hide =
                true;
            configJSON.config.actions.changeTariff.fields.tarrif.hide = true;
            configJSON.config.actions.changeTariff.fields.tarrifGroup.hide = true;
            configJSON.config.actions.changeTariff.fields.applicableDate.hide = true;
            const tarrifGroups = (yield DBservice_1.default.Tarrifs.getLinkTarrifGroups()).rows;
            tarrifGroupOptions = tarrifGroups.map((tG) => {
                return {
                    forProject: tG.projectId,
                    tarrifId: tG.tarrifId,
                    tarrifName: tG.tarrifName,
                    value: tG.id,
                    description: tG.tarrifGroupName,
                };
            });
            const unlinkTarrifGroups = (yield DBservice_1.default.Tarrifs.getUnlinkTarrifGroups()).rows;
            unlinkTarrifGroupOptions = unlinkTarrifGroups.map((tG) => {
                return {
                    forProject: tG.projectId,
                    tarrifId: tG.tarrifId,
                    tarrifName: tG.tarrifName,
                    value: tG.id,
                    description: tG.tarrifGroupName,
                };
            });
            const tarrifs = (yield DBservice_1.default.Tarrifs.getAvailableLinkTarrifs()).rows;
            tarrifOptions = tarrifs.map((t) => {
                return {
                    forProject: t.projectId,
                    value: t.id,
                    description: t.tarrifName,
                };
            });
            const unlinkTarrifs = (yield DBservice_1.default.Tarrifs.getAvailableUnLinkTarrifs()).rows;
            unlinkTarrifOptions = unlinkTarrifs.map((t) => {
                return {
                    forProject: t.projectId,
                    value: t.id,
                    description: t.tarrifName,
                };
            });
        }
        configJSON.config.actions.attachOrDetachTarrif.fields.tarrif.selectOptions =
            [
                {
                    value: "",
                    description: "",
                },
                ...tarrifOptions,
            ];
        configJSON.config.actions.attachOrDetachTarrif.fields.tarrifGroup.selectOptions =
            [
                {
                    value: "",
                    description: "",
                },
                ...unlinkTarrifGroupOptions,
            ];
        configJSON.config.actions.changeTariff.fields.tarrif.selectOptions = [
            {
                value: "",
                description: "",
            },
            ...tarrifOptions,
        ];
        configJSON.config.actions.changeTariff.fields.tarrifGroup.selectOptions =
            [
                {
                    value: "",
                    description: "",
                },
                ...tarrifGroupOptions,
            ];
        return res.status(200).json(configJSON);
    }
    catch (e) {
        console.log("tarrif actions error", e);
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
tarrifsRouter.post("/viewAllTarrifGroupsTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewAllTarrifGroupsTable_1.default);
        let tarrifResponse;
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const projectId = tokenObj.projectId;
            const order = configJSON.config.columns.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.columns.order = excludedProjectOrder;
            tarrifResponse =
                yield DBservice_1.default.Tarrifs.getTarrifGroupsByProjectIdWFilters(projectId, filters);
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions;
        }
        else {
            tarrifResponse = yield DBservice_1.default.Tarrifs.getTarrifGroupsWFilters(filters);
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions;
            const projects = (yield DBservice_1.default.Project.getProjects()).rows;
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions;
        }
        const projects = (yield DBservice_1.default.Project.getProjects())
            .rows;
        const projectSelectOptions = projects.map((project) => ({
            value: project.projectId,
            description: project.projectName,
        }));
        configJSON.data.rows = tarrifResponse.rows.map((row) => {
            var _a, _b;
            row.tarrifGroup = row.tarrifGroupName;
            row.tarrif = {
                label: row.tarrifName,
                link: `/admin/tarrifs/${encodeURIComponent(row.tarrifId)}`,
            };
            row.project = {
                label: (_b = (_a = projectSelectOptions === null || projectSelectOptions === void 0 ? void 0 : projectSelectOptions.find((p) => p.value === row.projectId)) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : "",
                link: `/admin/projects/${encodeURIComponent(row.projectId)}`,
            };
            return row;
        });
        configJSON.data.totalRecords = tarrifResponse.totalRecords;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
tarrifsRouter.post("/viewAllTarrifsTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewAllTarrifsTable_1.default);
        let tarrifResponse;
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const projects = (yield DBservice_1.default.Project.getProjects())
            .rows;
        const projectSelectOptions = projects.map((project) => ({
            value: project.projectId,
            description: project.projectName,
        }));
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const projectId = tokenObj.projectId;
            const order = configJSON.config.columns.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.columns.order = excludedProjectOrder;
            tarrifResponse = yield DBservice_1.default.Tarrifs.getTarrifsByProjectId(projectId, filters);
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions;
        }
        else {
            tarrifResponse = yield DBservice_1.default.Tarrifs.getTarrifs(filters);
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions;
            const projects = (yield DBservice_1.default.Project.getProjects()).rows;
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions;
        }
        configJSON.data.rows = tarrifResponse.rows.map((row) => {
            var _a;
            row.tarrifGroup = row.tarrifGroupName;
            row.tarrifName = {
                label: row.tarrifName,
                link: `/admin/tarrifs/${encodeURIComponent(row.id)}`,
            };
            row.project = {
                label: (_a = projectSelectOptions.find((p) => p.value === row.projectId)) === null || _a === void 0 ? void 0 : _a.description,
                link: `/admin/projects/${encodeURIComponent(row.projectId)}`,
            };
            //let tarrifType = row.unitOrSlab === "unit" ? "Unit" : "Slab";
            // if (row.containsFixedCharges) {
            //   tarrifType += " + Fixed Charges";
            // }
            //row.tarrifType= row.unitOrSlab;
            row.tarrifType = row.unitOrSlab;
            return row;
        });
        configJSON.data.totalRecords = tarrifResponse.totalRecords;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
tarrifsRouter.post("/viewAllAttachTableTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewAllAtachTariffHistory_1.default);
        let filters = (0, utilities_1.extractFiltersFromRequest)(req);
        let AttachResponse;
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions;
            filters = Object.assign(Object.assign({}, (filters !== null && filters !== void 0 ? filters : {})), { additionalFilters: [
                    ...((_a = filters.additionalFilters) !== null && _a !== void 0 ? _a : []),
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: `${tokenObj.projectId}`
                    }
                ] });
            AttachResponse = yield DBservice_1.default.Tarrifs.getAllAttachTariff(filters);
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
            AttachResponse = yield DBservice_1.default.Tarrifs.getAllAttachTariff(filters);
        }
        const projects = (yield DBservice_1.default.Project.getProjects())
            .rows;
        const projectSelectOptions = projects.map((project) => ({
            value: project.projectId,
            description: project.projectName,
        }));
        configJSON.data.rows = AttachResponse.rows.map((row) => {
            var _a, _b;
            console.log(row, "rowData");
            row.tariff = row.tariff_name;
            // row.attachment = moment(new Date(row.attachment)).format("DD/MM/YYYY hh:mm:ss");
            row.attachment = row.attachment ? (0, moment_1.default)(new Date(row.attachment)).format("DD/MM/YYYY hh:mm:ss") : null;
            row.project = {
                label: (_b = (_a = projectSelectOptions.find((p) => p.value === row.project_id)) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : "",
                link: `/admin/projects/${encodeURIComponent(row.project_id)}`,
            };
            // row.project = {label: projectSelectOptions.find(
            //       (p: any) => p.value === row.project_id
            //     )?.description,
            //     link: `/admin/projects/${encodeURIComponent(row.project_id)}`};
            if (row.is_active == 0) {
                row.status = "In Active";
            }
            else if (row.is_active == 1) {
                row.status = "Active";
            }
            else {
                row.status = "Pending";
            }
            row.tariffGroup = row.tg_name;
            return row;
            // return {
            //   tariff: row.tariff_name,
            //   attachment: row.attachment,
            //   project: {
            //     label: projectSelectOptions.find(
            //       (p: any) => p.value === row.project_id
            //     )?.description,
            //     link: `/admin/projects/${encodeURIComponent(row.project_id)}`,
            //   },
            //   status: row.is_active,
            //   tariffGroup: row.tg_name,
            // };
        });
        configJSON.data.totalRecords = AttachResponse.totalRecords;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
tarrifsRouter.post("/viewTarrifDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewTarrifDetails_1.default);
        const tarrifData = (_c = (_b = (_a = (yield DBservice_1.default.Tarrifs.getTarrifById(req.body.id))) === null || _a === void 0 ? void 0 : _a.rows) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : {};
        configJSON.config.actions.viewTarrif.data = (0, utilities_1.deepCopy)(tarrifData);
        configJSON.config.actions.duplicateTarrif.data = (0, utilities_1.deepCopy)(tarrifData);
        configJSON.config.actions.viewTarrif.data.dGUnitTax1 = tarrifData.dgunitTax1;
        configJSON.config.actions.viewTarrif.data.dGUnitTax2 = tarrifData.dgunitTax2;
        configJSON.config.actions.viewTarrif.data.dGUnitTax3 = tarrifData.dgunitTax3;
        configJSON.config.actions.viewTarrif.data.dGUnitRate = tarrifData.dgunitRate;
        configJSON.config.actions.viewTarrif.data.fixedChargeCalculationType = tarrifData.fixedChargeCalculationType;
        configJSON.config.actions.viewTarrif.data.fixedChargeDeductionTime = tarrifData.fixedChargeDeductionTime;
        if (tarrifData.hasFixedCharges === '0' || tarrifData.hasFixedCharges === 0) {
            configJSON.config.actions.viewTarrif.data.containsFixedCharges = false;
        }
        else {
            configJSON.config.actions.viewTarrif.data.containsFixedCharges = true;
        }
        //configJSON.config.actions.viewTarrif.data.fixedCharges[0].fixedChargeType =tarrifData.fixedCharges[0].fixedChargeType ;
        if (tokenObj.accountTypeValue === "superAdmin") {
            //let selectOptions =
            //configJSON.config.actions.viewTarrif.fields.project.selectOptions;
            const projects = (yield DBservice_1.default.Project.getProjectById(tarrifData.projectId))
                .rows;
            configJSON.config.actions.viewTarrif.data.project = projects[0].projectName;
            // const projectSelectOptions = projects.map((project) => ({
            //   value: project.projectId,
            //   description: project.projectName,
            // }));
            // selectOptions = [...selectOptions, ...projectSelectOptions];
            // console.log("dsahgvjhvjs", selectOptions);
            // console.log(
            //   "sbcjbdjbjbjbkbkk",
            //   configJSON.config.actions.viewTarrif.fields.project.selectOptions
            // );
            // configJSON.config.actions.viewTarrif.fields.project.selectOptions =
            //   selectOptions;
            // configJSON.config.actions.duplicateTarrif.fields.project.selectOptions =
            //   selectOptions;
        }
        else {
            const order = configJSON.config.actions.viewTarrif.fields.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "project");
            configJSON.config.actions.viewTarrif.fields.order =
                excludedProjectOrder;
            configJSON.config.actions.duplicateTarrif.fields.order =
                excludedProjectOrder;
            const fieldsOrder = configJSON.config.fields.order;
            const excludedFieldsProjectOrder = fieldsOrder.filter((fieldId) => fieldId !== "project");
            console.log("wejasdubwjhvfuywhjasv", excludedFieldsProjectOrder);
            configJSON.config.fields.order = excludedFieldsProjectOrder;
        }
        let tarrifType = (tarrifData === null || tarrifData === void 0 ? void 0 : tarrifData.unitOrSlab) === "unit" ? "Unit" : "Slab";
        console.log("fixe Charge", tarrifType);
        if (tarrifData.containsFixedCharges) {
            tarrifType += " + Fixed Charges";
        }
        //configJSON.config.actions.viewTarrif.slabFields.data.dGUnitTax1=tarrifData?.dgunitTax1;
        const projects = (yield DBservice_1.default.Project.getProjectById(tarrifData.projectId))
            .rows;
        console.log("hgdsvhjcs", projects[0].projectName);
        //configJSON.config.actions.viewTarrif.data.project=projects[0].projectName;
        configJSON.data = {
            name: (_d = tarrifData === null || tarrifData === void 0 ? void 0 : tarrifData.tarrifName) !== null && _d !== void 0 ? _d : "NO-DATA",
            tarrifType,
            tarrifGroup: (_e = tarrifData === null || tarrifData === void 0 ? void 0 : tarrifData.tarrifGroupName) !== null && _e !== void 0 ? _e : "NO-DATA",
            project: projects[0].projectName,
        };
        return res.status(200).json(configJSON);
    }
    catch (e) {
        console.log("----", e);
        return res.status(400).json({
            message: e === null || e === void 0 ? void 0 : e.message,
        });
    }
}));
exports.default = tarrifsRouter;
