import express, { Request, Response } from "express";
import { createLog, deepCopy, extractFiltersFromRequest, parseAuthTokenFromReq } from "../../utilities";
import viewAllMetersTable from "../../configs/viewAllMetersTable";
import viewGatewayActions from "../../configs/viewGatewayActions";
import viewAllGatewaysTable from "../../configs/viewAllGatewaysTable";
import { ProjectDBDTO } from "../../services/DBservice/ProjectDBService/types";
import DBservice from "../../services/DBservice";
import { FilterInfo } from "../../utilities/types";
import { GatewaysDBDTO } from "../../services/DBservice/GatewaysDBService/types";
import { DBResponse } from "../../services/DBservice/types";
import { LOG_ACTION_CONSTS, LOG_MODULE_CONSTS } from "../logConsts";
const { Gateways } = LOG_MODULE_CONSTS
const {
    CREATE_GATEWAY,
} = LOG_ACTION_CONSTS[Gateways]
import Joi from "joi";

const gatewaysRouter = express.Router()

gatewaysRouter.post("/createGateway", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "gatewayNumber": Joi.string().required().min(1),
        "project": Joi.string().required().min(1),
        "connectivityType": Joi.string().required().valid('ethernet', 'gprs'),
        "simNo": Joi.string(),
        "ipAddress": Joi.string()
    }).options({
        stripUnknown: true
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId
        }
        await schema.validateAsync(data)
        console.log(data)
        const result = await DBservice.Gateways.createGateway(data)
        let description = `Gateway Number -${data.gatewayNumber}`;
        data.projectId = data.project
        createLog(tokenObj, Gateways, CREATE_GATEWAY, data,description)
        res.status(200).json(result)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        console.log(e)
        res.status(400).json({message: e.error})
    }
})

gatewaysRouter.post("/editGateway", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "gatewayId": Joi.string().required().min(1),
        "gatewayNumber": Joi.string().required().min(1),
        "project": Joi.string().required().min(1),
        "connectivityType": Joi.string().required().valid('ethernet', 'gprs'),
        "simNo": Joi.string().allow(null, ""),
        "ipAddress": Joi.string().allow(null, "")
    }).options({
        stripUnknown: true
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId
        }
        await schema.validateAsync(data)
        console.log(data)
        const result = await DBservice.Gateways.editGateway(data)
        // createLog(tokenObj, Gateways, CREATE_GATEWAY, data)
        res.status(200).json(result)
    } catch (e: any) {
        console.log(e)
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        res.status(400).json({message: e.error})
    }
})

gatewaysRouter.post("/viewGatewayActions", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewGatewayActions)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.actions.createGateway.fields.order
            const excludedProjectOrder = order.filter((fieldId: string) => fieldId !== "project")
            configJSON.config.actions.createGateway.fields.order = excludedProjectOrder
        } else {
            let selectOptions = configJSON.config.actions.createGateway.fields.project.selectOptions
            const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }))
            selectOptions = [...selectOptions, ...projectSelectOptions]
            configJSON.config.actions.createGateway.fields.project.selectOptions = selectOptions
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

gatewaysRouter.post("/viewAllGatewaysTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(viewAllGatewaysTable)
        let gateways: GatewaysDBDTO[] = []
        let totalRecords = 0
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions
            const excludedProjectOptions = selectOptions.filter(({ value }: any) => value !== "project")
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions
            const projectId = tokenObj.projectId
            const gatewaysResponse: DBResponse = await DBservice.Gateways.getGatewaysByProjectId(projectId, filters)
            gateways = gatewaysResponse.rows
            totalRecords = gatewaysResponse.totalRecords
            const editGatewayFields = configJSON.config.actions.editGateway.fields.order
            const editGatewayExcludedProjectOptions = editGatewayFields.filter(( value: string ) => value !== "project")
            configJSON.config.actions.editGateway.fields.order = editGatewayExcludedProjectOptions
        } else {
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions
            const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }))
            selectOptions = [...selectOptions, ...projectSelectOptions]
            configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions
            // console.log(configJSON.config.actions.editGateway)
            configJSON.config.actions.editGateway.fields.project.selectOptions = [
                {
                    value: "-",
                    description: "-"
                },
                ...projectSelectOptions
            ]
            const gatewaysResponse: DBResponse = await DBservice.Gateways.getGateways(filters)
            gateways = gatewaysResponse.rows
            totalRecords = gatewaysResponse.totalRecords
        }
        configJSON.data.rows = gateways.map(row => {
            return {
                ...row,
                "id": row.gatewayId,
                "gatewayNumber": row.gatewayNumber,
                "project": {
                    "label": row.projectName,
                    "link": `/admin/projects/${row.projectId}`
                },
                "ipAddress": row.ipAddress,
                "simNo": row.simNo,
                "connectivityType": row.connectivityTypeDescription,
                "status": row.status,
                "lastReportedTime": row.lastReportedTime,
            }
        })
        configJSON.data.totalRecords = totalRecords
        return res.status(200).json(configJSON)
    } catch (e: any) {
        console.log(e)
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
export default gatewaysRouter