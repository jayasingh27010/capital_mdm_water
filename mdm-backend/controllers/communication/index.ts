import express, { Request, Response } from "express";
import { createLog, deepCopy, extractFiltersFromRequest, parseAuthTokenFromReq } from "../../utilities";
// import viewCommunicationActions from "../../configs/viewCommunicationActions";
import { FilterInfo } from "../../utilities/types";
//import viewAllDeviceConfigRequestsTable from "../../configs/viewAllDeviceConfigRequestsTable";
import DBservice from "../../services/DBservice";
import { ProjectDBDTO } from "../../services/DBservice/ProjectDBService/types";
//import vieaAllMetersTableForDevConfig from "../../configs/viewAllMetersTableForDevConfig";
import { DBResponse, DBStatResponse } from "../../services/DBservice/types";
import { LOG_ACTION_CONSTS, LOG_MODULE_CONSTS } from "../logConsts";
import viewCommunicationActions from "../../configs/viewCommunicationActions";
import viewAllUsersTableForCommunication from "../../configs/viewAllUsersTableForCommunication";
import { UserDBDTO } from "../../services/DBservice/UserDBService/types";
const { DeviceConfiguration } = LOG_MODULE_CONSTS
const {
    SET_METER,
} = LOG_ACTION_CONSTS[DeviceConfiguration]


const communicationRouter = express.Router()


communicationRouter.post("/viewCommunicationActions", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(viewCommunicationActions)
        let selectOptions = configJSON.config.actions.setCommunication.fields.project.selectOptions
        console.log("selectOptions",selectOptions)
         if (tokenObj.accountTypeValue === "superAdmin") {
                    const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
                    console.log("projects", projects)
                    const projectSelectOptions = projects.map(project => ({
                        value: project.projectId,
                        description: project.projectName
                    }))
                    selectOptions = [{value: "", description: ""}, ...projectSelectOptions]
                    configJSON.config.actions.setCommunication.fields.project.selectOptions = selectOptions
                    
                } else {
                    const order = configJSON.config.actions.setCommunication.fields.order
                    const projectNameExludedOrder = order.filter((fieldId: string) => fieldId !== "project")
                    configJSON.config.actions.setCommunication.fields.order = projectNameExludedOrder
                   
                }
        return res.status(200).json(configJSON)
    } catch (e: any) {
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})
communicationRouter.post("/viewSendSms", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(viewCommunicationActions)
        let selectOptions = configJSON.config.actions.sendSms.fields.project.selectOptions
        console.log("selectOptions",selectOptions)
         if (tokenObj.accountTypeValue === "superAdmin") {
                    const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
                    console.log("projects", projects)
                    const projectSelectOptions = projects.map(project => ({
                        value: project.projectId,
                        description: project.projectName
                    }))
                    selectOptions = [{value: "", description: ""}, ...projectSelectOptions]
                    configJSON.config.actions.sendSms.fields.project.selectOptions = selectOptions
                    
                } else {
                    const order = configJSON.config.actions.sendSms.fields.order
                    const projectNameExludedOrder = order.filter((fieldId: string) => fieldId !== "project")
                    configJSON.config.actions.sendSms.fields.order = projectNameExludedOrder
                   
                }
        return res.status(200).json(configJSON)
    } catch (e: any) {
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})

// communicationRouter.post(
//     "/viewAllUsersTableForCommunication",
//     async (req: Request, res: Response) => {
//       try {
//         const tokenObj = parseAuthTokenFromReq(req);
//         const filters: FilterInfo = extractFiltersFromRequest(req)
//         const configJSON = deepCopy(viewAllUsersTableForCommunication)
//         let metersResponse: DBResponse;
//         if (tokenObj.accountTypeValue !== "superAdmin") {
//           metersResponse = await DBservice.Meters.getMetersByProjectId(
//             tokenObj.projectId,
//             filters
//           );
//           const order = configJSON.config.columns.order;
//           const excludedProjectOrder = order.filter(
//             (fieldId: string) => fieldId !== "project"
//           );
//           configJSON.config.columns.order = excludedProjectOrder;
  
//           const selectOptions =
//             configJSON.config.filterConfig.filterType.selectOptions;
//           const excludedProjectSelectOptions = selectOptions.filter(
//             ({ value }: any) => value !== "project"
//           );
//           configJSON.config.filterConfig.filterType.selectOptions =
//             excludedProjectSelectOptions;
//           // const filtersOrder = await DBservice.Project.getProjects()
//         } else {
//           metersResponse = await DBservice.Meters.getMeters(filters);
//           let selectOptions =
//             configJSON.config.filterConfig.filterValue.project.selectOptions;
//           const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects())
//             .rows;
//           const projectSelectOptions = projects.map((project) => ({
//             value: project.projectId,
//             description: project.projectName,
//           }));
//           selectOptions = [...selectOptions, ...projectSelectOptions];
//           configJSON.config.filterConfig.filterValue.project.selectOptions =
//             selectOptions;
//         }
//         configJSON.data = {
//           rows: metersResponse.rows.map((meter) => {
//             return {
//               id: meter.meterId,
//               meterSerialNo: {
//                 label: meter.meterSerialNo,
//                 link: `/admin/meters/${encodeURIComponent(meter.meterId)}`,
//               },
//               project: {
//                 label: meter.projectName,
//                 link: `/admin/projects/${encodeURIComponent(meter.projectId)}`,
//               },
//               consumer: {
//                 label: meter.consumerName,
//                 link: `/admin/consumers/${meter.consumerId}`,
//               },
//               moduleNo: meter.moduleNo,
//               phaseType: meter.phaseTypeDescription,
//               sourceType: meter.sourceTypeDescription,
//               consumptionType: meter.consumptionTypeDescription,
//               firmwareVersion: meter.firmwareVersion,
//             };
//           }),
//           totalRecords: metersResponse.totalRecords,
//         };
//         return res.status(200).json(configJSON);
//       } catch (e: any) {
//         if(e?.code === "ECONNREFUSED"){
//           return res
//           .status(500)
//           .json({
//               message: "Database ECONNREFUSED"
//           }) 
//       }
//         return res.status(400).json({
//           message: e?.message,
//         });
//       }
//     }
//   );
communicationRouter.post("/viewAllUsersTableForCommunication", async (req: Request, res: Response) => {
    try {
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewAllUsersTableForCommunication)
        const usersResponse = await DBservice.User.getSubUsers(tokenObj.userId, filters)
        const users: UserDBDTO[] = usersResponse.rows
        configJSON.data.totalRecords = usersResponse.totalRecords
        configJSON.data.rows = users.map((user: any) => {
            delete user.password
            user.name = {
                label: `${user.firstName} ${user.lastName}`,
                link: `/admin/users/${encodeURIComponent(user.userId)}`
            }
            user.designation = user.accountTypeDescription
            return user
        })
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions
            const excludedProjectOptions = selectOptions.filter(({ value }: any) => value !== "multiProject")
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions
        } else {
            let selectOptions = configJSON.config.filterConfig.filterValue.multiProject.selectOptions
            const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }))
            selectOptions = [...selectOptions, ...projectSelectOptions]
            configJSON.config.filterConfig.filterValue.multiProject.selectOptions = selectOptions
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


export default communicationRouter