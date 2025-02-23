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
const viewDashboardMeterDetails_1 = __importDefault(require("../../configs/viewDashboardMeterDetails"));
const viewDashboardFinancialsDetails_1 = __importDefault(require("../../configs/viewDashboardFinancialsDetails"));
const viewDashboardProjectDetails_1 = __importDefault(require("../../configs/viewDashboardProjectDetails"));
const viewDashboardGatewayDetails_1 = __importDefault(require("../../configs/viewDashboardGatewayDetails"));
const viewDashboardUsersTable_1 = __importDefault(require("../../configs/viewDashboardUsersTable"));
const viewDashboardAuditLogTable_1 = __importDefault(require("../../configs/viewDashboardAuditLogTable"));
const ServiceStatus_1 = __importDefault(require("../../configs/ServiceStatus/ServiceStatus"));
const DBservice_1 = __importDefault(require("../../services/DBservice"));
const viewErrorLogTable_1 = __importDefault(require("../../configs/viewErrorLogTable"));
const viewMeterGraphConsumption_1 = __importDefault(require("../../configs/viewMeterGraphConsumption"));
const dashboardRouter = express_1.default.Router();
dashboardRouter.post("/viewDashboardMetersDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewDashboardMeterDetails_1.default);
        let meterStats;
        if (tokenObj.accountTypeValue === "superAdmin") {
            meterStats = yield DBservice_1.default.Meters.getMetersStats();
        }
        else {
            meterStats = yield DBservice_1.default.Meters.getMetersStatsByProjectId(tokenObj.projectId);
        }
        configJSON.data.down.value = meterStats.down;
        configJSON.data.lowBalance.value = meterStats.lowBalance;
        configJSON.data.overloaded.value = meterStats.overloaded;
        configJSON.data.relayOff.value = meterStats.relayOff;
        configJSON.data.total.value = meterStats.total;
        configJSON.data.unalloted.value = meterStats.unalloted;
        configJSON.data.unstate.value = meterStats.unstate;
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
// /viewDashboardFinancialsDetails
dashboardRouter.post("/viewDashboardFinancialsDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewDashboardFinancialsDetails_1.default);
        let data;
        if (tokenObj.accountTypeValue === "superAdmin") {
            data = yield DBservice_1.default.Financials.getFinancials();
        }
        else {
            data = yield DBservice_1.default.Financials.getProjectFinancials(tokenObj.projectId);
        }
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
// /viewDashboardProjectDetails
dashboardRouter.post("/viewDashboardProjectDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewDashboardProjectDetails_1.default);
        const projectStats = yield DBservice_1.default.Project.getProjectsStats();
        configJSON.data.totalProjects.value = projectStats.totalProjects;
        configJSON.data.liveProjects.value = projectStats.liveProjects;
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
dashboardRouter.post("/viewDashboardGatewayDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewDashboardGatewayDetails_1.default);
        let gatewaysStats;
        if (tokenObj.accountTypeValue === "superAdmin") {
            gatewaysStats = yield DBservice_1.default.Gateways.getGatewayStats();
        }
        else {
            const projectId = tokenObj.projectId;
            gatewaysStats = yield DBservice_1.default.Gateways.getGatewayStatsByProjectId(projectId);
        }
        configJSON.data.totalGateways.value = gatewaysStats.totalGateways;
        configJSON.data.liveGateways.value = gatewaysStats.liveGateways;
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
dashboardRouter.post("/viewDashboardUsersTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewDashboardUsersTable_1.default);
        const users = (yield DBservice_1.default.User.getSubUsers(tokenObj.userId, filters)).rows;
        configJSON.config.label = "Related Users";
        configJSON.data.totalRecords = users.length;
        configJSON.data.rows = users.map(user => {
            return ({
                id: user.userId,
                user: {
                    label: `${user.firstName} ${user.lastName}`,
                    link: `/admin/users/${user.userId}`
                },
                email: user.email,
                accountType: user.accountTypeDescription,
                assignedProject: {
                    label: user.projectName,
                    link: `/admin/projects/${user.projectId}`
                },
                projectName: user.projectName
            });
        });
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.columns.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "assignedProject");
            configJSON.config.columns.order = excludedProjectOrder;
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
dashboardRouter.post("/viewDashboardAuditLogTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewDashboardAuditLogTable_1.default);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions;
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
        const auditLogsResponse = yield DBservice_1.default.AuditLogs.getAuditLogs(Object.assign(Object.assign({}, filters), { userId: tokenObj.userId }));
        const rows = auditLogsResponse.rows;
        const totalRecords = auditLogsResponse.totalRecords;
        configJSON.data = {
            rows: rows.map(row => {
                return {
                    id: row.auditLogId,
                    user: {
                        label: row.userName,
                        link: `/admin/users/${row.userId}`
                    },
                    module: row.moduleNameDescription,
                    moduleAction: row.actionNameDescription,
                    time: row.time
                };
            }),
            totalRecords
        };
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
dashboardRouter.post("/viewErrorLogTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewErrorLogTable_1.default);
        let auditLogsResponse;
        auditLogsResponse = yield DBservice_1.default.ErrorLogs.getErrorLogs(filters);
        const rows = auditLogsResponse.rows;
        const totalRecords = auditLogsResponse.totalRecords;
        configJSON.data = {
            rows: rows.map(row => {
                return {
                    id: row.errorLogId,
                    meterSerialNo: row.meterSerialNo,
                    errorType: row.errorType,
                    errorMsg: row.errorMsg,
                    time: row.time
                };
            }),
            totalRecords
        };
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
dashboardRouter.post("/viewServiceStatusTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const configJSON = (0, utilities_1.deepCopy)(ServiceStatus_1.default);
        const serviceStatusResponse = yield DBservice_1.default.ServiceSatus.getServiceStatus();
        const rows = serviceStatusResponse.rows;
        console.log(rows, "rowTT");
        //const totalRecords = serviceStatusResponse.totalRecords
        const services = [
            { name: "DATABASE-SERVICE", key: "databaseService" },
            { name: "HES-CONNECTOR", key: "hesConnectorService" },
            { name: "KAFKA-CONSUMER", key: "kafkaConsumer" },
            { name: "PARSING-SERVICE", key: "parsingService" },
            { name: "MQTT-SUBSCRIBER", key: "mqttSubscriber" },
            { name: "NODEJS-SERVICE", key: "nodejsService" },
            { name: "ANDROID-CONNECTOR", key: "androidConnector" }
        ];
        let jsonData = {};
        // for (let i = 0; i < rows.length; i++) {
        //     let kafkaConsumerFound = false;
        //     let hesConnectorFound = false;
        //     let parsingServiceFound = false
        //     let mqttSubscriberFound = false
        //     let androidConnectorFound = false
        //     if (rows[i].serviceName == "DATABASE-SERVICE") {
        //         let newKey: string = "databaseService";
        //         jsonData[newKey] = rows[i].status;
        //     } else if (rows[i].serviceName == "HES-CONNECTOR") {
        //         let newKey: string = "hesConnectorService";
        //         jsonData[newKey] = rows[i].status;
        //         hesConnectorFound = true;
        //     } else if (rows[i].serviceName == "KAFKA-CONSUMER") {
        //         let newKey: string = "kafkaConsumer";
        //         kafkaConsumerFound = true;
        //         jsonData[newKey] = rows[i].status;
        //     } else if (rows[i].serviceName == "PARSING-SERVICE") {
        //         let newKey: string = "parsingService";
        //         parsingServiceFound = true;
        //         jsonData[newKey] = rows[i].status;
        //     } else if (rows[i].serviceName == "MQTT-SUBSCRIBER") {
        //         let newKey: string = "mqttSubscriber";
        //         mqttSubscriberFound = true;
        //         jsonData[newKey] = rows[i].status;
        //     } else if (rows[i].serviceName == "NODEJS-SERVICE") {
        //         let newKey: string = "nodejsService";
        //         jsonData[newKey] = rows[i].status;
        //     } else if (rows[i].serviceName == "ANDROID-CONNECTOR") {
        //         let newKey: string = "androidConnector";
        //         androidConnectorFound = true;
        //         jsonData[newKey] = rows[i].status;
        //     }
        //     if (!kafkaConsumerFound) {
        //         jsonData["kafkaConsumer"] = "Down";
        //     }
        //     if (!hesConnectorFound) {
        //         jsonData["hesConnectorService"] = "Down";
        //     }
        //     if (!parsingServiceFound) {
        //         jsonData["parsingService"] = "Down";
        //     }
        //     if (!mqttSubscriberFound) {
        //         jsonData["mqttSubscriber"] = "Down";
        //     }
        //     if (!androidConnectorFound) {
        //         jsonData["androidConnector"] = "Down";
        //     }
        // }
        for (let i = 0; i < rows.length; i++) {
            const service = rows[i];
            const matchedService = services.find(s => s.name === service.serviceName);
            if (matchedService) {
                jsonData[matchedService.key] = service.status === "UP" ? "Up" : "Down";
            }
        }
        for (let service of services) {
            if (!(service.key in jsonData)) {
                jsonData[service.key] = "Down";
            }
        }
        configJSON.data = jsonData;
        console.log("ewsgavcbwhjascv wdjkbv gcjsb dwghsuwdjscvwbjksavdwjs", configJSON);
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
dashboardRouter.post("/dashboardConsumptionMonthly", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const user_id = req.body.userId;
        const year = req.body.year;
        const requestType = req.body.filter;
        const configJSON = (0, utilities_1.deepCopy)(viewMeterGraphConsumption_1.default);
        const data = yield DBservice_1.default.dashbaordMeterConsumption.getDashboardMeterConsumptionGraph(user_id, year, requestType);
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
dashboardRouter.post("/dashboardConsumptionWeekly", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const user_Id = req.body.userId;
        const month = req.body.month;
        const requestType = req.body.filter;
        const configJSON = (0, utilities_1.deepCopy)(viewMeterGraphConsumption_1.default);
        const data = yield DBservice_1.default.dashbaordMeterConsumption.getDashboardMeterConsumptionGraphweekly(user_Id, month, requestType);
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
dashboardRouter.post("/dashboardConsumptionDaily", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const user_Id = req.body.userId;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const requestType = req.body.filter;
        const configJSON = (0, utilities_1.deepCopy)(viewMeterGraphConsumption_1.default);
        const data = yield DBservice_1.default.dashbaordMeterConsumption.getDashboardMeterConsumptionGraphDaily(user_Id, startDate, endDate, requestType);
        configJSON.data = data;
        return res.status(200).json(configJSON);
    }
    catch (e) {
        console.log(e, "eee");
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
exports.default = dashboardRouter;
