import express, { Request, Response } from "express";
import { deepCopy, extractFiltersFromRequest, parseAuthTokenFromReq } from "../../utilities";
import viewDashboardMeterDetails from "../../configs/viewDashboardMeterDetails"
import viewDashboardFinancialsDetails from "../../configs/viewDashboardFinancialsDetails";
import viewDashboardProjectDetails from "../../configs/viewDashboardProjectDetails";
import viewDashboardGatewayDetails from "../../configs/viewDashboardGatewayDetails";
import viewDashboardUsersTable from "../../configs/viewDashboardUsersTable";
import viewDashboardAuditLogTable from "../../configs/viewDashboardAuditLogTable";
import ServiceStatus from "../../configs/ServiceStatus/ServiceStatus";
import DBservice from "../../services/DBservice";
import { FilterInfo } from "../../utilities/types";
import { UserDBDTO } from "../../services/DBservice/UserDBService/types";
import { AuditLogDBDTOD } from "../../services/DBservice/AuditLogDBService/types";
import { ServiceStatusDTO } from "../../services/DBservice/ServiceStatus/type";
import { DBResponse, DBStatResponse } from "../../services/DBservice/types";
import { ErrorLogDBDTO } from "../../services/DBservice/ErrorLogService/types";
import viewErrorLogTable from "../../configs/viewErrorLogTable";
import viewMeterCurrentMonthConsumption from "../../configs/viewMeterGraphConsumption";
import { ProjectDBDTO } from "../../services/DBservice/ProjectDBService/types";


const dashboardRouter = express.Router()

dashboardRouter.post("/viewDashboardMetersDetails", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewDashboardMeterDetails)
        let meterStats: DBStatResponse
        if (tokenObj.accountTypeValue === "superAdmin") {
            meterStats = await DBservice.Meters.getMetersStats()
        } else {
            meterStats = await DBservice.Meters.getMetersStatsByProjectId(tokenObj.projectId)
        }
        configJSON.data.down.value = meterStats.down
        configJSON.data.lowBalance.value = meterStats.lowBalance
        configJSON.data.overloaded.value = meterStats.overloaded
        configJSON.data.relayOff.value = meterStats.relayOff
        configJSON.data.total.value = meterStats.total
        configJSON.data.unalloted.value = meterStats.unalloted
        configJSON.data.unstate.value = meterStats.unstate
        return res.status(200).json(configJSON)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

dashboardRouter.post("/viewDashboardFinancialsDetails", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewDashboardFinancialsDetails)
        let data: DBStatResponse
        if (tokenObj.accountTypeValue === "superAdmin") {
            data = await DBservice.Financials.getFinancials()
        } else {
            data = await DBservice.Financials.getProjectFinancials(tokenObj.projectId)
        }
        configJSON.data = data
        return res.status(200).json(configJSON)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

dashboardRouter.post("/viewDashboardProjectDetails", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewDashboardProjectDetails)
        const projectStats: DBStatResponse = await DBservice.Project.getProjectsStats()
        configJSON.data.totalProjects.value = projectStats.totalProjects
        configJSON.data.liveProjects.value = projectStats.liveProjects
        return res.status(200).json(configJSON)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

dashboardRouter.post("/viewDashboardGatewayDetails", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewDashboardGatewayDetails)
        let gatewaysStats: DBStatResponse
        if (tokenObj.accountTypeValue === "superAdmin") {
            gatewaysStats = await DBservice.Gateways.getGatewayStats()
        } else {
            const projectId: string = tokenObj.projectId
            gatewaysStats = await DBservice.Gateways.getGatewayStatsByProjectId(projectId)
        }
        configJSON.data.totalGateways.value = gatewaysStats.totalGateways
        configJSON.data.liveGateways.value = gatewaysStats.liveGateways
        return res.status(200).json(configJSON)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})


dashboardRouter.post("/viewDashboardUsersTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(viewDashboardUsersTable)
        const users: UserDBDTO[] = (await DBservice.User.getSubUsers(tokenObj.userId, filters)).rows
        configJSON.config.label = "Related Users"
        configJSON.data.totalRecords = users.length
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
            })
        })
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.columns.order
            const excludedProjectOrder = order.filter((fieldId: string) => fieldId !== "assignedProject")
            configJSON.config.columns.order = excludedProjectOrder
        }
        return res.status(200).json(configJSON)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

dashboardRouter.post("/viewDashboardAuditLogTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(viewDashboardAuditLogTable)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions
            const excludedProjectOptions = selectOptions.filter(({ value }: any) => value !== "project")
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions
        } else {
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions
            const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }))
            selectOptions = [...selectOptions, ...projectSelectOptions]
            configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions
        }
        const auditLogsResponse: DBResponse = await DBservice.AuditLogs.getAuditLogs({ ...filters, userId: tokenObj.userId , projectId: tokenObj.projectId})
        const rows: AuditLogDBDTOD[] = auditLogsResponse.rows
        const totalRecords = auditLogsResponse.totalRecords
        configJSON.data = {
            rows: rows.map(row => {
                return {
                    id: row.auditLogId,
                    user: {
                        label: row.firstName,
                        link: `/admin/users/${row.userId}`
                    },
                    module: row.moduleNameDescription,
                    moduleAction: row.actionNameDescription,
                    time: row.time,
                    description: row.description
                }
            }),
            totalRecords
        }
        return res.status(200).json(configJSON)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

dashboardRouter.post("/viewErrorLogTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(viewErrorLogTable)
        let auditLogsResponse: DBResponse;

        auditLogsResponse = await DBservice.ErrorLogs.getErrorLogs(filters)
        const rows: ErrorLogDBDTO[] = auditLogsResponse.rows
        const totalRecords = auditLogsResponse.totalRecords
        configJSON.data = {
            rows: rows.map(row => {
                return {
                    id: row.errorLogId,
                    meterSerialNo: row.meterSerialNo,
                    errorType: row.errorType,
                    errorMsg: row.errorMsg,
                    time: row.time
                }
            }),
            totalRecords
        }
        return res.status(200).json(configJSON)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

dashboardRouter.post("/viewServiceStatusTable", async (req: Request, res: Response) => {

    try {

        const tokenObj = parseAuthTokenFromReq(req)
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(ServiceStatus)
        const serviceStatusResponse: DBResponse = await DBservice.ServiceSatus.getServiceStatus()
        const rows: ServiceStatusDTO[] = serviceStatusResponse.rows
        console.log(rows,"rowTT")
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
          let jsonData: { [key: string]: any } = {};
          
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
        return res.status(200).json(configJSON)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
});

dashboardRouter.post("/dashboardConsumptionMonthly", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const user_id = req.body.userId
        const year = req.body.year
        const requestType = req.body.filter
        const configJSON = deepCopy(viewMeterCurrentMonthConsumption)
        const data = await DBservice.dashbaordMeterConsumption.getDashboardMeterConsumptionGraph(user_id, year, requestType)
        configJSON.data = data;
        return res.status(200).json(configJSON)
    } catch (e: any) {
       if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})


dashboardRouter.post("/dashboardConsumptionWeekly", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const user_Id = req.body.userId
        const month = req.body.month
        const requestType = req.body.filter
        const configJSON = deepCopy(viewMeterCurrentMonthConsumption)
        const data = await DBservice.dashbaordMeterConsumption.getDashboardMeterConsumptionGraphweekly(user_Id, month, requestType)
        configJSON.data = data;
        return res.status(200).json(configJSON)
    } catch (e: any) {
       if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

dashboardRouter.post("/dashboardConsumptionDaily", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const user_Id = req.body.userId
        const startDate = req.body.startDate
        const endDate = req.body.endDate
        const requestType = req.body.filter
        const configJSON = deepCopy(viewMeterCurrentMonthConsumption)
        const data = await DBservice.dashbaordMeterConsumption.getDashboardMeterConsumptionGraphDaily(user_Id, startDate, endDate, requestType)
        configJSON.data = data;
        return res.status(200).json(configJSON)
    } catch (e: any) {
       if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

export default dashboardRouter
