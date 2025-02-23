import express, { Request, Response } from "express";
import { capitalizeFirstLetter, createLog, deepCopy, extractFiltersFromRequest, parseAuthTokenFromReq } from "../../utilities";
import viewUserActions from "../../configs/viewUserActions";
import viewAllUsersTable from "../../configs/viewAllUsersTable";
import viewUserAuditLogTable from "../../configs/viewUserAuditLogTable";
import viewUserDetails from "../../configs/viewUserDetails";
import viewUserUsersTableTable from "../../configs/viewUserUsersTableTable";
import DBservice from "../../services/DBservice";
import { ProjectDBDTO } from "../../services/DBservice/ProjectDBService/types";
import { UserDBDTO } from "../../services/DBservice/UserDBService/types";
import { FilterInfo } from "../../utilities/types";
import viewEditPermissionsTable from "../../configs/viewEditPermissionsTable"
import { DBResponse } from "../../services/DBservice/types";
//import { AuditLogDBDTO } from "../../services/DBservice/AuditLogDBService/types";
import { AuditLogDBDTOD } from "../../services/DBservice/AuditLogDBService/types";
import Joi from "joi";
import { LOG_ACTION_CONSTS, LOG_MODULE_CONSTS } from "../logConsts";
const { Users } = LOG_MODULE_CONSTS
const {
    CREATE_USER,
    EDIT_USER,
    ENABLE_USER,
    DISABLE_USER
} = LOG_ACTION_CONSTS[Users]

const usersRouter = express.Router()

usersRouter.post("/createUser", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "name": Joi.string().required().min(1),
        "username": Joi.string().required().min(1),
        "designation": Joi.string().required().valid(
            "admin",
            "vendingManager",
            "accountManager",
            "operationManager"
        ),
        "projectName": Joi.number(),
        "email": Joi.string().required().min(1),
        "mobileNo": Joi.string().required().min(10).max(10)
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        console.log(tokenObj)
        await schema.validateAsync(data)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.projectName = tokenObj.projectId
        }
        console.log(data)
        data.userName = data.username
        const nameParts = data.name.split(" ")
        data.firstName = nameParts[0]
        data.lastName = nameParts?.[1] ?? ""
        data.projectId = data.projectName
        const result = await DBservice.User.createUser(data)
        let description = `Username - ${data.userName} Designation - ${data?.designation}`;
        data.userName = tokenObj.firstName
        createLog(tokenObj, Users, CREATE_USER, data,description)
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

usersRouter.post("/editUser", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "id": Joi.string().required().min(1),
        "name": Joi.string().required().min(1),
        "username": Joi.string().required().min(1),
        "designation": Joi.string().required().valid(
            "admin",
            "vendingManager",
            "accountManager",
            "operationManager"
        ),
        "projectName": Joi.string(),
        "email": Joi.string().required().min(1),
        "mobileNo": Joi.number()
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        await schema.validateAsync(data)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.projectName = tokenObj.projectId
        }
        console.log(data)
        const result = await DBservice.User.editUser({...data, projectId: data.projectName, userId: data.id})
        let description = ``;
        createLog(tokenObj, Users, EDIT_USER, data,description)
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

usersRouter.post("/enableUser", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "id": Joi.string().required().min(1),
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        await schema.validateAsync(data)
        console.log("enableUser Called", data)
        const result = await DBservice.User.enableUser(data);
        let description = ``;
        data.projectId = tokenObj.projectId
        createLog(tokenObj, Users, ENABLE_USER, data, description)
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
    }
})

usersRouter.post("/disableUser", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "id": Joi.string().required().min(1),
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        await schema.validateAsync(data)
        console.log("disableUser Called", data)
        const result = await DBservice.User.disableUser({...data, userId: data.id});
        let description = ``;
        data.projectId = tokenObj.projectId
        createLog(tokenObj, Users, DISABLE_USER, data,description)
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
    }
})

usersRouter.post("/changePassword", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "id": Joi.string().required().min(1),
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        // await schema.validateAsync(data)
        console.log("changePassword Called", data)
        const result = await DBservice.User.changePassword({...data})
        // createLog(tokenObj, Users, DISABLE_USER, data)
        return res.status(200).json(result)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res.status(400).json({message: e?.message})
    }
})

usersRouter.post("/resetPassord", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "id": Joi.string().required().min(1),
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        // await schema.validateAsync(data)
        console.log("resetPassword Called", data)
        const result = await DBservice.User.resetPassword({...data})
        // createLog(tokenObj, Users, DISABLE_USER, data)
        res.status(200).json(result)
    } catch (e: any ) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        console.log(e)
    }
})

usersRouter.post("/deleteUser", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "id": Joi.string().required().min(1),
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        await schema.validateAsync(data)
        console.log("deleteUser Called", data)
        const result = await DBservice.User.deleteUser(data)
        let description = ``;
        createLog(tokenObj, "users", "deleteUser", data, description)
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
    }
})

usersRouter.post("/viewUserActions", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewUserActions)
        let selectOptions = configJSON.config.actions.createUser.fields.projectName.selectOptions
        if (tokenObj.accountTypeValue === "superAdmin") {
            const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
            console.log("projects", projects)
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }))
            selectOptions = [{value: "", description: ""}, ...projectSelectOptions]
            configJSON.config.actions.createUser.fields.projectName.selectOptions = selectOptions
            
        } else {
            const order = configJSON.config.actions.createUser.fields.order
            const projectNameExludedOrder = order.filter((fieldId: string) => fieldId !== "projectName")
            configJSON.config.actions.createUser.fields.order = projectNameExludedOrder
            const userDesignationOptions = configJSON.config.actions.createUser.fields.designation.selectOptions
            const excludedAdminDesignationOptions = userDesignationOptions.filter(({ value }: any) => value !== "admin")
            configJSON.config.actions.createUser.fields.designation.selectOptions = excludedAdminDesignationOptions
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

usersRouter.post("/viewAllUsersTable", async (req: Request, res: Response) => {
    try {
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewAllUsersTable)
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


usersRouter.post("/viewUserAuditLogTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const id = req.body.id
        const configJSON = deepCopy(viewUserAuditLogTable)
        configJSON.config.id = id
        configJSON.config.label = `Audit Log`
        const auditLogResponse: DBResponse = await DBservice.AuditLogs.getAuditLogsByUserId(id, filters)
        const auditLogs: AuditLogDBDTOD[] = auditLogResponse.rows
        configJSON.data = {
            rows: auditLogs.map(row => {
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
            totalRecords: auditLogResponse.totalRecords
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

usersRouter.post("/viewUserDetails", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const id: string = req.body.id
        const configJSON = deepCopy(viewUserDetails)

        // configJSON.config.id = id
        const users: UserDBDTO[] = (await DBservice.User.getUserById(id)).rows
        const user = users[0]
        configJSON.data = {
            "name": `${user?.firstName} ${user?.lastName}`,
            "designation": user?.accountTypeDescription,
            "userName": user?.userName,
            "email": user?.email,
            "mobileNo": user?.mobileNo,
            "projectName": user?.projectName
        }
        let hiddenFields: string[] = []
        if (tokenObj.accountTypeValue !== "superAdmin" || (tokenObj.accountTypeValue === "superAdmin" && tokenObj.userId == user.userId)) {
            hiddenFields.push("resetPassword")
        }
        if (tokenObj.userId != user.userId) {
            hiddenFields.push("changePassword")
        }
        if (user.accountTypeValue === "superAdmin") {
            const order = configJSON.config.fields.order
            const excludedProjectNameOrder = order
                .filter((fieldId: string) => fieldId !== "projectName")
            configJSON.config.fields.order = excludedProjectNameOrder
        }
        if (tokenObj.accountTypeValue === "superAdmin" && tokenObj.accessLevel < user.accessLevel) {
            configJSON.config.fields.projectName.inputType = "link"
            configJSON.data = {
                ...deepCopy(configJSON.data),
                projectName: {
                    value: user.projectName,
                    link: `/admin/projects/${encodeURIComponent(user.projectId ?? "")}`
                }
            }
        }
        if (tokenObj.accessLevel >= user.accessLevel) {
            hiddenFields = hiddenFields.concat(["editUser", "disableUser", "enableUser"])
        } else {
            if (tokenObj.accountTypeValue !== "superAdmin") {
                hiddenFields.push("editUser")
            } else {
                configJSON.config.actions.editUser.data = {
                    name: `${user.firstName} ${user.lastName}`,
                    username: user.userName,
                    designation: user.accountTypeValue,
                    email: user.email,
                    mobileNo: user.mobileNo,
                    projectName: user.projectId
                }
                let selectOptions = configJSON.config.actions.editUser.fields.projectName.selectOptions
                const projects = (await DBservice.Project.getProjects()).rows
                const projectSelectOptions = projects.map(project => ({
                    value: project.projectId,
                    description: project.projectName
                }))
                selectOptions = [...selectOptions, ...projectSelectOptions]
                configJSON.config.actions.editUser.fields.projectName.selectOptions = selectOptions
            }
        }
        if (user.enabled) {
            hiddenFields.push("enableUser")
        } else {
            hiddenFields.push("disableUser")
        }
        const order = configJSON.config.actions.order
        const excludedDisableUserOrder = order.filter((fieldId: string) => !hiddenFields.includes(fieldId))
        configJSON.config.actions.order = excludedDisableUserOrder
        // configJSON.config.label = `${capitalizeFirstLetter(String(id).toLowerCase())} Audit Log`

        return res.status(200).json(configJSON)
    } catch (e: any) {
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})

usersRouter.post("/viewUserUsersTableTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters = extractFiltersFromRequest(req)
        const id = req.body.id
        const configJSON = deepCopy(viewUserUsersTableTable)
        configJSON.config.id = id
        configJSON.config.label = `Related Users`
        const usersResponse = await DBservice.User.getSubUsers(id, filters)
        const users: UserDBDTO[] = usersResponse.rows
        configJSON.data.totalRecords = usersResponse.totalRecords
        configJSON.data.rows = users.map(user => {
            return ({
                id: user.userId,
                user: {
                    label: `${user.firstName} ${user.lastName}`,
                    link: `/admin/users/${user.userId}`
                },
                userName: user?.userName,
                email: user.email,
                accountType: user.accountTypeDescription,
                assignedProject: user.projectName,
                projectName: user.projectName
            })
        })
        return res.status(200).json(configJSON)
    } catch (e: any) {
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})

usersRouter.post("/viewEditUserPermissionsTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const id = req.body.id
        const configJSON = deepCopy(viewEditPermissionsTable)
        return res.status(200).json(configJSON)
    } catch (e: any) {
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})
// `${capitalizeFirstLetter(String(id).toLowerCase())} Audit Log`
// `${capitalizeFirstLetter(String(id).toLowerCase())} Users`
export default usersRouter