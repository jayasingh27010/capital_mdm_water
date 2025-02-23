import AuditLogDBService from "./AuditLogDBService";
import ConsumersDBService from "./ConsumersDBService";
import DevConfigService from "./DevConfigService";
import FinancialsDBService from "./FinancialsDBService";
import GatewaysDBService from "./GatewaysDBService";
import MeterPushDataDBService from "./MeterPushDataDBService";
import MetersDBService from "./MetersDBService";
import ProjectDBService from "./ProjectDBService";
import TarrifsDBService from "./TarrifsDBService";
import UserDBService from "./UserDBService";
import ServiceStatus from "./ServiceStatus";
import ErrorLogService from "./ErrorLogService";
import dashboardConsumptionDBservice from "./dashboardConsumptionDBservice";


export default {
    User: {
        ...UserDBService,
    },
    Project: {
        ...ProjectDBService
    },
    AuditLogs: {
        ...AuditLogDBService
    },
    ErrorLogs: {
        ...ErrorLogService
    },
    Meters: {
        ...MetersDBService,
    },
    Gateways: {
        ...GatewaysDBService
    },
    Consumers: {
        ...ConsumersDBService
    },
    MetersPushData: {
        ...MeterPushDataDBService
    },
    Financials: {
        ...FinancialsDBService
    },
    Tarrifs: {
        ...TarrifsDBService
    },
    ServiceSatus: {
        ...ServiceStatus
    },
    DeviceConfig: {
        ...DevConfigService
    },
    dashbaordMeterConsumption:{
    ...dashboardConsumptionDBservice
    }
}