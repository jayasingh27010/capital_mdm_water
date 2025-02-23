"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuditLogDBService_1 = __importDefault(require("./AuditLogDBService"));
const ConsumersDBService_1 = __importDefault(require("./ConsumersDBService"));
const DevConfigService_1 = __importDefault(require("./DevConfigService"));
const FinancialsDBService_1 = __importDefault(require("./FinancialsDBService"));
const GatewaysDBService_1 = __importDefault(require("./GatewaysDBService"));
const MeterPushDataDBService_1 = __importDefault(require("./MeterPushDataDBService"));
const MetersDBService_1 = __importDefault(require("./MetersDBService"));
const ProjectDBService_1 = __importDefault(require("./ProjectDBService"));
const TarrifsDBService_1 = __importDefault(require("./TarrifsDBService"));
const UserDBService_1 = __importDefault(require("./UserDBService"));
const ServiceStatus_1 = __importDefault(require("./ServiceStatus"));
const ErrorLogService_1 = __importDefault(require("./ErrorLogService"));
const dashboardConsumptionDBservice_1 = __importDefault(require("./dashboardConsumptionDBservice"));
exports.default = {
    User: Object.assign({}, UserDBService_1.default),
    Project: Object.assign({}, ProjectDBService_1.default),
    AuditLogs: Object.assign({}, AuditLogDBService_1.default),
    ErrorLogs: Object.assign({}, ErrorLogService_1.default),
    Meters: Object.assign({}, MetersDBService_1.default),
    Gateways: Object.assign({}, GatewaysDBService_1.default),
    Consumers: Object.assign({}, ConsumersDBService_1.default),
    MetersPushData: Object.assign({}, MeterPushDataDBService_1.default),
    Financials: Object.assign({}, FinancialsDBService_1.default),
    Tarrifs: Object.assign({}, TarrifsDBService_1.default),
    ServiceSatus: Object.assign({}, ServiceStatus_1.default),
    DeviceConfig: Object.assign({}, DevConfigService_1.default),
    dashbaordMeterConsumption: Object.assign({}, dashboardConsumptionDBservice_1.default)
};
