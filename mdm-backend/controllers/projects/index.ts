import express, { Request, Response } from "express";
import { createLog, deepCopy, extractFiltersFromRequest, parseAuthTokenFromReq } from "../../utilities";
import viewAllProjectsTable from "../../configs/viewAllProjectsTable";
import viewProjectActions from "../../configs/viewProjectActions";
import viewProjectMetersTable from "../../configs/viewProjectMetersTable";
import viewProjectDetails from "../../configs/viewProjectDetails";
import viewProjectMeters from "../../configs/viewProjectMeters";
import viewProjectGateways from "../../configs/viewProjectGateways";
import { ProjectDBDTO } from "../../services/DBservice/ProjectDBService/types";
import DBservice from "../../services/DBservice";
import { DBResponse, DBStatResponse } from "../../services/DBservice/types";
import viewMeterCurrentMonthConsumption from "../../configs/viewMeterGraphConsumption";
import Joi from "joi";
import { FilterInfo } from "../../utilities/types";
import { LOG_ACTION_CONSTS, LOG_MODULE_CONSTS } from "../logConsts";
const { Projects } = LOG_MODULE_CONSTS
const {
    CREATE_PROJECT,
    EDIT_PROJECT,
    DISABLE_PROJECT,
    ENABLE_PROJECT,
} = LOG_ACTION_CONSTS[Projects]

const projectsRouter = express.Router()

projectsRouter.post("/createProject", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "projectName": Joi.string().required().min(1),
        "projectAddress": Joi.string().required().min(1),
        "projectCode": Joi.string().required().min(1),
        "billingType": Joi.string().required().valid('kwh', 'kvah'),

    })
    let result: any
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        delete data['userType'];
        //await schema.validateAsync(data)
        console.log(data)
        result = await DBservice.Project.createProject(data)
        let description = `Project ${data.projectName}`;
        createLog(tokenObj, Projects, CREATE_PROJECT, data, description)
        res.status(200).json(result)
    } catch (e: any) {
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

projectsRouter.post("/editProject", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "id": Joi.string().required().min(1),
        "projectName": Joi.string().required().min(1),
        "projectAddress": Joi.string().required().min(1),
        "projectCode": Joi.string().required().min(1),
        "billingType": Joi.string().required().valid('kwh', 'kvah')
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        // await schema.validateAsync(data)
        console.log(data)
        const result = await DBservice.Project.editProject(data)
        let description = ``;
        createLog(tokenObj, Projects, EDIT_PROJECT, data,description)
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
    }
})

projectsRouter.post("/enableProject", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "id": Joi.string().required().min(1),
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        await schema.validateAsync(data)
        console.log("enableProject Called", data)
        const result = await DBservice.Project.enableProject(data)
        let description = ``;
        createLog(tokenObj, Projects, ENABLE_PROJECT, data,description)
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
    }
})

projectsRouter.post("/disableProject", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "id": Joi.string().required().min(1),
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        await schema.validateAsync(data)
        console.log("disableProject Called", data)
        const result = await DBservice.Project.disableProject(data)
        let description = ``;
        createLog(tokenObj, Projects, DISABLE_PROJECT, data,description)
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
    }
})

projectsRouter.post("/deleteProject", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "id": Joi.string().required().min(1),
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        await schema.validateAsync(data)
        console.log("deleteProject Called", data)
        const result = await DBservice.Project.deleteProject(data)
        let description = ``;
        createLog(tokenObj, "projects", "deleteProject", data, description)
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
    }
})

projectsRouter.post("/viewProjectActions", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewProjectActions)
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

projectsRouter.post("/viewAllProjectsTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters = extractFiltersFromRequest(req)
        const configJSON = deepCopy(viewAllProjectsTable)
        const projectsResponse = await DBservice.Project.getProjectsWFilters(filters)
        const projects: ProjectDBDTO[] = projectsResponse.rows
        const totalRecords = projectsResponse.totalRecords
        configJSON.data.totalRecords = totalRecords
        configJSON.data.rows = projects.map(project => {
            console.log(project,
                'projectssss'
            )
            return {
                id: project.projectId,
                projectName: {
                    link: `/admin/projects/${encodeURIComponent(project.projectId)}`,
                    label: project.projectName
                },
                projectAddress: project.projectAddress,
                projectCode: project.projectCode,
                billingType: project.projectBillingTypeDescription,
                isLive: true
            }
        })
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

projectsRouter.post("/viewProjectMetersTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters = extractFiltersFromRequest(req)
        const projectId = req.body.id
        const configJSON = deepCopy(viewProjectMetersTable)
        const projectsResponse: DBResponse = await DBservice.Project.getProjectById(projectId)
        if (projectsResponse.rows.length > 0) {
            configJSON.config.label = `Meters For Project '${projectsResponse.rows[0].projectName}'`
        }
        const metersResponse: DBResponse = await DBservice.Meters.getMetersByProjectId(projectId, filters)
        const rows: any[] = metersResponse.rows
        const totalRecords = metersResponse.totalRecords
        configJSON.data.rows = rows.map(row => {
            return {
                "id": row.meterId,
                "meterSerialNo": {
                    "label": row.meterSerialNo,
                    "link": `/admin/meters/${encodeURIComponent(row.meterId)}`
                },
                "consumerName": {
                    "label": row.consumerName,
                    "link": `/admin/consumers/${row.consumerId}`
                },
                "firmwareVersion": row.firmwareVersion,
            }
        })
        configJSON.data.totalRecords = totalRecords
        return res.status(200).json(configJSON)
    } catch (e: any) {
        console.log("viewProjectMetersTable Error", e)
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
// viewProjectDetails

projectsRouter.post("/viewProjectDetails", async (req: Request, res: Response) => {
    try {
        const projectId: string = req.body.id
        console.log("withing project id", req.body)
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewProjectDetails)
        const projects: ProjectDBDTO[] = (await DBservice.Project.getProjectById(projectId)).rows
        const project = projects?.[0]
        if (!project) {
            configJSON.data = {
                "projectName": "",
                "projectAddress": "",
                "projectCode": "",
                "billingType": ""
            }
            return res.status(200).json(configJSON)
        }
        const order = configJSON.config.actions.order
        if (project.enabled) {
            const excludedEnabledOrder = order.filter((fieldId: string) => fieldId !== "enableProject")
            configJSON.config.actions.order = excludedEnabledOrder
        } else {
            const excludedDisabledOrder = order.filter((fieldId: string) => fieldId !== "disableProject")
            configJSON.config.actions.order = excludedDisabledOrder
        }
        console.log("project found", project);
        configJSON.config.actions.editProject.data = {
            "projectName": project.projectName,
            "projectAddress": project.projectAddress,
            "projectCode": project.projectCode,
            "billingType": project.projectBillingTypeValue,
            "happyHours": project.happyHoursList,
            "holidays": project.holidaysList
        }
        configJSON.data = {
            "projectName": project.projectName,
            "projectAddress": project.projectAddress,
            "projectCode": project.projectCode,
            "billingType": project.projectBillingTypeDescription,
            enabled: project.enabled ? "Yes": "No"
        }
        return res.status(200).json(configJSON)
    } catch (e: any) {
        console.log(e)
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})

const addProjectFilter = (list: any[], projectId: any) => {
    return list.map(l => l.filterType === "project" ? ({
        ...l,
        filterValue: String(projectId)
    }): l)
}

projectsRouter.post("/viewProjectMeters", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(viewProjectMeters)
        const projectId = req.body.id
        const meterStats: DBStatResponse = await DBservice.Meters.getMetersStatsByProjectId(projectId)
        configJSON.data.down.value = meterStats.down
        configJSON.data.down.tableFilters.additionalFilters = addProjectFilter(
            configJSON.data.down.tableFilters.additionalFilters,
            projectId
        )
        configJSON.data.lowBalance.value = meterStats.lowBalance
        configJSON.data.lowBalance.tableFilters.additionalFilters = addProjectFilter(
            configJSON.data.lowBalance.tableFilters.additionalFilters,
            projectId
        )
        configJSON.data.overloaded.value = meterStats.overloaded
        configJSON.data.overloaded.tableFilters.additionalFilters = addProjectFilter(
            configJSON.data.overloaded.tableFilters.additionalFilters,
            projectId
        )
        configJSON.data.relayOff.value = meterStats.relayOff
        configJSON.data.relayOff.tableFilters.additionalFilters = addProjectFilter(
            configJSON.data.relayOff.tableFilters.additionalFilters,
            projectId
        )
        configJSON.data.total.value = meterStats.total
        configJSON.data.total.tableFilters.additionalFilters = addProjectFilter(
            configJSON.data.total.tableFilters.additionalFilters,
            projectId
        )
        configJSON.data.unalloted.value = meterStats.unalloted
        configJSON.data.unalloted.tableFilters.additionalFilters = addProjectFilter(
            configJSON.data.unalloted.tableFilters.additionalFilters,
            projectId
        )
        configJSON.data.unstate.value = meterStats.unstate
        configJSON.data.unstate.tableFilters.additionalFilters = addProjectFilter(
            configJSON.data.unstate.tableFilters.additionalFilters,
            projectId
        )
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

projectsRouter.post("/viewProjectGateways", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const projectId = req.body.id
        const configJSON = deepCopy(viewProjectGateways)
        const gatewaysStats: DBStatResponse = await DBservice.Gateways.getGatewayStatsByProjectId(projectId)
        configJSON.data.totalGateways.value = gatewaysStats.totalGateways
        configJSON.data.totalGateways.tableFilters.additionalFilters = addProjectFilter(
            configJSON.data.totalGateways.tableFilters.additionalFilters,
            projectId
        )
        configJSON.data.liveGateways.value = gatewaysStats.liveGateways
        configJSON.data.liveGateways.tableFilters.additionalFilters = addProjectFilter(
            configJSON.data.liveGateways.tableFilters.additionalFilters,
            projectId
        )
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

projectsRouter.post("/projectMeterConsumptionMonthly", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const user_id = req.body.userId
        const projectId = req.body.projectId
        const year = req.body.year
        const requestType = req.body.filter
        const configJSON = deepCopy(viewMeterCurrentMonthConsumption)
        const data = await DBservice.Project.getProjectMeterConsumptionGraph(user_id,projectId,year,requestType)
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


projectsRouter.post("/projectMeterConsumptionWeekly", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const user_id = req.body.userId
        const projectId = req.body.projectId
        const month = req.body.month
        const requestType = req.body.filter
        const configJSON = deepCopy(viewMeterCurrentMonthConsumption)
        const data = await DBservice.Project.getProjectMeterConsumptionGraphweekly(user_id,projectId,month,requestType)
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

projectsRouter.post("/projectMeterConsumptionDaily", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        console.log(req.body,"reqqq")
        const user_id = req.body.userId
        const projectId = req.body.projectId
        const startDate = req.body.startDate
        const endDate = req.body.endDate
        const requestType = req.body.filter
        const configJSON = deepCopy(viewMeterCurrentMonthConsumption)
        const data = await DBservice.Project.getProjectMeterConsumptionGraphDaily(user_id,projectId,startDate,endDate,requestType)
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
export default projectsRouter
