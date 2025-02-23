import express, { Request, Response } from "express";
import { createLog, deepCopy, extractFiltersFromRequest, parseAuthTokenFromReq } from "../../utilities";
import viewAllConsumerTable from "../../configs/viewAllConsumerTable";
import viewConsumerActions from "../../configs/viewConsumerActions";
import viewMeterRechargesTable from "../../configs/viewMeterRechargesTable";
import viewConsumerDetails from "../../configs/viewConsumerDetails";
import viewMeterStats from "../../configs/viewMeterStats";
import viewMeterSanctionedLoad from "../../configs/viewMeterSanctionedLoad";
import viewMeterCurrentConsumption from "../../configs/viewMeterCurrentConsumption";
import viewConsumersBulkUpload from "../../configs/viewConsumersBulkUpload";
import viewConsumersBulkUploadResult from "../../configs/viewConsumersBulkUploadResult";
const { v4: uuid } = require('uuid');
import { ProjectDBDTO } from "../../services/DBservice/ProjectDBService/types";
import DBservice from "../../services/DBservice";
import { DBResponse, DBStatResponse } from "../../services/DBservice/types";
import MeterRechargeDBservice from "../../services/DBservice/MeterRecharge";
import { ConsumerDBDTO } from "../../services/DBservice/ConsumersDBService/types";
import { FilterInfo } from "../../utilities/types";
import Joi from "joi";
import { TarrifGroupDBDTO } from "../../services/DBservice/TarrifsDBService/types";
import viewMeterCurrentMonthConsumption from "../../configs/viewMeterCurrentMonthConsumption";
import { MeterRechargeDTO } from "../ManualRecharge/type"
import { LOG_ACTION_CONSTS,LOG_MODULE_CONSTS } from "../logConsts";
const { Consumers } = LOG_MODULE_CONSTS
const {
    CREATE_CONSUMER,
    EDIT_CONSUMER,
    ENABLE_CONSUMER,
    DISABLE_CONSUMER,
    COSNUMER_UPLOAD
} = LOG_ACTION_CONSTS[Consumers]


const consumersRouter = express.Router()
const ADMIN_CONSUMER_ENABLED_FIELDS: string[] = [
    "firstName",
    "lastName",
    "address",
    "isVVIP",
    "mobileNo",
    "email",
    "totalLoadDG",
    "DGLoadR",
    "DGLoadY",
    "DGLoadB",
    "totalLoadGrid",
    "gridLoadR",
    "gridLoadY",
    "gridLoadB",
    "tarrifGroup"
];
consumersRouter.post("/createConsumer", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "project": Joi.string().required().min(1),
        "firstName": Joi.string().required().min(1),
        "lastName": Joi.string().required().min(1),
        "mobileNo": Joi.string().required().min(1),
        "tarrifGroup": Joi.string().allow(null),
        "address": Joi.string(),
        "connectionNo": Joi.string().allow(null, ""),
        "panNo": Joi.string(),
        "gstNo": Joi.string(),
        "towerNo": Joi.string(),
        "flatNo": Joi.string(),
        "flatType": Joi.string(),
        "shopNo": Joi.string(),
        "email": Joi.string(),
        // "totalLoadGrid": Joi.string(),
        // "gridLoadR": Joi.string(),
        // "gridLoadY": Joi.string(),
        // "gridLoadB": Joi.string(),
        // "totalLoadDG": Joi.string(),
        // "DGLoadR": Joi.string(),
        // "DGLoadY": Joi.string(),
        // "DGLoadB": Joi.string(),
        "openingBalance": Joi.string(),
        "area": Joi.string(),
        "consumptionReadingGridKwh": Joi.string(),
        // "consumptionReadingDGKwh": Joi.string(),
        // "consumptionReadingGridKvah": Joi.string(),
        // "consumptionReadingDGKvah": Joi.string(),
        "isVVIP": Joi.boolean().allow(null),
        "meterSerialNo": Joi.string().allow(null)
    }).options({
        stripUnknown: true
    })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId
        }
        console.log("hsagcvjsacbjzch", JSON.stringify(data))
        await schema.validateAsync(data)
        const result = await DBservice.Consumers.createConsumer(data)
        let description = ``;
        data.projectId = data.project
        createLog(tokenObj, Consumers, CREATE_CONSUMER, data,description)
        res.status(200).json(result)
    } catch (e: any) {
        console.log(e)
        console.log("in here with err")
        res.status(400).json({ message: e.error })
    }
})

consumersRouter.post("/editConsumer", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    const schema = Joi.object({
        "id": Joi.string().required().min(1),
        "project": Joi.string().required().min(1),
        "firstName": Joi.string().required().min(1),
        "lastName": Joi.string().required().min(1),
        "mobileNo": Joi.string().required().min(1),
        "tarrifGroup": Joi.string().allow(null),
        "address": Joi.string().allow(null),
        "connectionNo": Joi.string().allow(null),
        "panNo": Joi.string().allow(null),
        "gstNo": Joi.string().allow(null),
        "towerNo": Joi.string().allow(null),
        "flatNo": Joi.string().allow(null),
        "flatType": Joi.string().allow(null),
        "shopNo": Joi.string().allow(null),
        "email": Joi.string().allow(null),
        "totalLoadGrid": Joi.string().allow(null, ''),
        "gridLoadR": Joi.string().allow(null),
        "gridLoadY": Joi.string().allow(null),
        "gridLoadB": Joi.string().allow(null),
        "totalLoadDG": Joi.string().allow(null, ''),
        "DGLoadR": Joi.string().allow(null),
        "DGLoadY": Joi.string().allow(null),
        "DGLoadB": Joi.string().allow(null),
        "openingBalance": Joi.string().allow(null),
        "area": Joi.string().allow(null),
        "consumptionReadingGridKwh": Joi.string(),
        "consumptionReadingDGKwh": Joi.string(),
        "consumptionReadingGridKvah": Joi.string(),
        "consumptionReadingDGKvah": Joi.string(),
        "isVVIP": Joi.boolean().allow(null)
    }).options({ allowUnknown: true })
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId
        }
        console.log("edit", data)
        // await schema.validateAsync(data)
        const result = await DBservice.Consumers.editConsumer(data)
        let description = ``;
        data.projectId = data.project
        createLog(tokenObj, Consumers, EDIT_CONSUMER, data,description)
        res.status(200).json(result)
    } catch (e: any) {

        console.log(e)
        res.status(400).json({ message: e.error })
    }
})

consumersRouter.post("/enableConsumer", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId
        }
        console.log("edit", data)
        // await schema.validateAsync(data)
        const result = await DBservice.Consumers.enableConsumer(data)
        let description = ``;
        data.projectId = data.project
        createLog(tokenObj, Consumers, ENABLE_CONSUMER, data, description)
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
    }
})

consumersRouter.post("/disableConsumer", async (req: Request, res: Response) => {
    const data = req?.body ?? {}
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.project = tokenObj.projectId
        }
        console.log("edit", data)
        // await schema.validateAsync(data)
        const result = await DBservice.Consumers.disableConsumer(data)
        let description = ``;
        data.projectId = data.project
        createLog(tokenObj, Consumers, DISABLE_CONSUMER, data,description)
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
    }
})

const resetPasswordSchema = Joi.object({
    consumerId: Joi.string().required(),
});

consumersRouter.post("/reset_Password_consumer", async (req: Request, res: Response) => {
    try {
        await resetPasswordSchema.validateAsync(req.body);
        const tokenObj = parseAuthTokenFromReq(req)
        const { consumerId } = req.body;
        const data = await DBservice.Consumers.resetPassword(consumerId)
        
        if (data.status as any === "success") {
            return res.status(200).json({
                status: data.status,
                message: data.data
            });
        } else {
            return res.status(400).json({
                status: data.status,
                message: data.data || "Unable to reset password. Please try again"
            });
        }

    } catch (e: any) {
        if (e.isJoi) {
            return res.status(400).json({
                message: "INVALID_REQUEST",
                details: e.details
            });
        }
      
        return res.status(500).json({
            message: "INTERNAL_SERVER_ERROR"
        });
    }
});

consumersRouter.post("/viewConsumerActions", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewConsumerActions)
        let meterSerialNoOptions: any[] = []
        let tarrifGroupOptions: any[] = []
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.actions.addConsumer.fields.order
            const excludedProjectOrder = order.filter((fieldId: string) => fieldId !== "project")
            configJSON.config.actions.addConsumer.fields.order = excludedProjectOrder
            const projectId: string = tokenObj.projectId
            const tarrifGroups: TarrifGroupDBDTO[] = (await DBservice.Tarrifs.getTarrifGroupsByProjectId(projectId)).rows
            tarrifGroupOptions = tarrifGroups.map(tG => {
                return {
                    forProject: projectId,
                    value: tG.id,
                    description: tG.tarrifGroupName
                }
            })
            const unAllotedMeters = (await DBservice.Meters.getMeters({
                getAll: true,
                perPage: 1,
                currPage: 1,
                additionalFilters: [
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: `${projectId}`
                    },
                    {
                        trackId: "",
                        filterType: "meters",
                        filterValue: `un-alloted`
                    }
                ]
            })).rows
            meterSerialNoOptions = unAllotedMeters.map((meter) => {
                return {
                    forProject: projectId,
                    value: meter.meterSerialNo,
                    description: meter.meterSerialNo
                }
            })
        } else {
            let selectOptions = configJSON.config.actions.addConsumer.fields.project.selectOptions
            const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }))
            selectOptions = [...selectOptions, ...projectSelectOptions]
            configJSON.config.actions.addConsumer.fields.project.selectOptions = selectOptions

            const tarrifGroups: TarrifGroupDBDTO[] = (await DBservice.Tarrifs.getTarrifGroupsWithTariffRelation()).rows
            tarrifGroupOptions = tarrifGroups.map(tG => {
                return {
                    forProject: tG.projectId,
                    value: tG.id,
                    description: tG.tarrifGroupName
                }
            })
            const unAllotedMeters = (await DBservice.Meters.getMeters({
                getAll: true,
                perPage: 1,
                currPage: 1,
                additionalFilters: [
                    {
                        trackId: "",
                        filterType: "meters",
                        filterValue: `un-alloted`
                    }
                ]
            })).rows
            meterSerialNoOptions = unAllotedMeters.map((meter) => {
                console.log("hvhjhsb", meter);
                return {
                    forProject: meter.projectId,
                    value: meter.meterSerialNo,
                    description: meter.meterSerialNo
                }
            })
        }
        configJSON.config.actions.addConsumer.fields.tarrifGroup.selectOptions = [
            {
                value: '',
                description: ''
            },
            ...tarrifGroupOptions
        ]
        console.log("tarrif grup actions", tarrifGroupOptions)
        configJSON.config.actions.addConsumer.fields.meterSerialNo.selectOptions = [
            {
                value: '',
                description: ''
            },
            ...meterSerialNoOptions
        ]
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

consumersRouter.post("/viewAllConsumersTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters = extractFiltersFromRequest(req)
        let consumersResponse: DBResponse
        let rows: ConsumerDBDTO[] = []
        const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
        const projectSelectOptions = projects.map(project => ({
            value: project.projectId,
            description: project.projectName
        }))
        const configJSON = deepCopy(viewAllConsumerTable)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = configJSON.config.columns.order
            const excludedProjectOrder = order.filter((fieldId: string) => fieldId !== "project")
            configJSON.config.columns.order = excludedProjectOrder
            const projectId = tokenObj.projectId
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions
            const excludedProjectOptions = selectOptions.filter(({ value }: any) => value !== "project")
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions
            consumersResponse = await DBservice.Consumers.getConsumersByProjectId(projectId, filters)
            rows = consumersResponse.rows
        } else {
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions
            selectOptions = [...selectOptions, ...projectSelectOptions]
            configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions
            consumersResponse = await DBservice.Consumers.getConsumers(filters)
            rows = consumersResponse.rows
        }
        configJSON.data.totalRecords = consumersResponse.totalRecords
        configJSON.data.rows = rows.map((row: any) => {
            row.id = row.consumerId
            row.consumerName = {
                label: row.consumerName,
                link: `/admin/consumers/${row.consumerId}`
            }
            row.project = {
                label: projectSelectOptions.find(project => project.value === `${row.projectId}`)?.description ?? "ProjectNameNotFound",
                link: `/admin/projects/${row.projectId}`
            }
            row.meter = {
                label: row.meterSerialNo,
                link: `/admin/meters/${row.meterId}`
            }
            row.DGLoadR = row.dgloadR

            row.DGLoadY = row.dgloadY

            row.DGLoadB = row.dgloadB
            row.emailId = row.email
            //row.meter = row.meterSerialNo
            return row
        })
        return res.status(200).json(configJSON)
    } catch (e: any) {
        console.error(e)
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

consumersRouter.post("/viewConsumerDetails", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req, true)
        console.log(tokenObj)
        const configJSON = deepCopy(viewConsumerDetails)
        let id = req.body.id
        configJSON.config.id = id
        const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
        const projectSelectOptions = projects.map(project => ({
            value: project.projectId,
            description: project.projectName
        }))
        let tarrifGroupOptions: any[] = []
        let meterSerialNoOptions: any[] = []
        for (const field of configJSON.config.actions.editConsumer.fields.order) {
            configJSON.config.actions.editConsumer.fields[field].disabled = !ADMIN_CONSUMER_ENABLED_FIELDS.includes(field)
        }
        if (tokenObj.accountTypeValue === "superAdmin") {
            let selectOptions = configJSON.config.actions.editConsumer.fields.project.selectOptions

            selectOptions = [...selectOptions, ...projectSelectOptions]
            configJSON.config.actions.editConsumer.fields.project.selectOptions = selectOptions

            const tarrifGroups: TarrifGroupDBDTO[] = (await DBservice.Tarrifs.getTarrifGroups()).rows
            tarrifGroupOptions = tarrifGroups.map(tG => {
                return {
                    forProject: tG.projectId,
                    value: tG.id,
                    description: tG.tarrifGroupName
                }
            })
            const unAllotedMeters = (await DBservice.Meters.getMeters({
                getAll: true,
                perPage: 1,
                currPage: 1,
                additionalFilters: [
                    {
                        trackId: "",
                        filterType: "meters",
                        filterValue: `un-alloted`
                    }
                ]
            })).rows
            meterSerialNoOptions = unAllotedMeters.map((meter) => {
                return {
                    forProject: meter.projectId,
                    value: meter.meterSerialNo,
                    description: meter.meterSerialNo
                }
            })
        } else {
            const order = configJSON.config.actions.editConsumer.fields.order
            const excludedProjectOrder = order.filter((fieldId: string) => fieldId !== "project")
            configJSON.config.actions.editConsumer.fields.order = excludedProjectOrder

            const projectId: string = tokenObj.projectId

            const tarrifGroups: TarrifGroupDBDTO[] = (await DBservice.Tarrifs.getTarrifGroupsByProjectId(projectId)).rows
            tarrifGroupOptions = tarrifGroups.map(tG => {
                return {
                    forProject: projectId,
                    value: tG.id,
                    description: tG.tarrifGroupName
                }
            })
            const unAllotedMeters = (await DBservice.Meters.getMeters({
                getAll: true,
                perPage: 1,
                currPage: 1,
                additionalFilters: [
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: `${projectId}`
                    },
                    {
                        trackId: "",
                        filterType: "meters",
                        filterValue: `un-alloted`
                    }
                ]
            })).rows
            meterSerialNoOptions = unAllotedMeters.map((meter) => {
                return {
                    forProject: projectId,
                    value: meter.meterSerialNo,
                    description: meter.meterSerialNo
                }
            })
        }

        if (tokenObj.accountTypeValue === "consumer") {
            id = tokenObj.consumerId
        }
        console.log("id before requesting", id)
        const consumers: ConsumerDBDTO[] = (await DBservice.Consumers.getConsumerById(id)).rows
        const excludedFields: string[] = []
        if (tokenObj.accountTypeValue !== "superAdmin") {
            excludedFields.push("project")
        }
        if (consumers?.[0]) {
            const consumer: any = consumers[0]
            consumer.meter = {
                value: consumer.meterSerialNo,
                link: `/admin/meters/${consumer.meterId}`
            }
            consumer.project = {
                value: projectSelectOptions.find(option => option.value === String(consumer.projectId))?.description ?? "-",
                link: `/admin/projects/${consumer.projectId}`
            }
            consumer.DGLoadR = consumer.dgloadR
            consumer.DGLoadY = consumer.dgloadY
            consumer.DGLoadB = consumer.dgloadB
            if ((!consumer.projectId || consumer.projectId.length === 0) && !excludedFields.includes("project")) {
                excludedFields.push("project")
            }
            if ((!consumer.meterId || consumer.meterId.length === 0)) {
                excludedFields.push("meter")
            }
            const consumerCpy = deepCopy(consumer)
            configJSON.data = {
                ...consumerCpy,
                flatType: configJSON.config.actions.editConsumer.fields.flatType.selectOptions.find((option: any) => option.value === consumerCpy.flatType)?.description ?? "",
                enabled: consumer.enabled ? "Yes": "No"
            }
            configJSON.config.actions.editConsumer.data = {
                ...deepCopy(consumer),
                project: String(consumer.projectId),
                email: consumer.email,
                tarrifGroup: consumer.tarrifGroupId,
                isVVIP: consumer?.isVVIP === "Yes"
                // project: consumer.projectId
            }
            console.log(configJSON.data)
            delete configJSON.config.actions.editConsumer.data.emailId
            delete configJSON.config.actions.editConsumer.data.meter
            delete configJSON.config.actions.editConsumer.data.meterId
            delete configJSON.config.actions.editConsumer.data.consumerId

            const order = configJSON.config.actions.order
            const excludedOrder = order.filter((fieldId: string) => fieldId !== (consumer.enabled ? "enable": "disable"))
            console.log("consumer.enabled", (consumer.enabled ? "enable": "disable"))
            configJSON.config.actions.order = excludedOrder
        }
        const order = configJSON.config.fields.order 
        const excludedFieldsOrder = order.filter((fieldId: string) => !excludedFields.includes(fieldId))
        configJSON.config.fields.order = excludedFieldsOrder
        configJSON.config.actions.editConsumer.fields.meterSerialNo.selectOptions = [
            {
                value: '',
                description: ''
            },
            ...meterSerialNoOptions
        ]

        configJSON.config.actions.editConsumer.fields.tarrifGroup.selectOptions = [
            {
                value: '',
                description: ''
            },
            ...tarrifGroupOptions
        ]
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.actions.hide = true
            delete configJSON.data.meter.link
        }
        configJSON.config.id = id
        return res.status(200).json(configJSON)
    } catch (e: any) {
        console.log("-------", e)
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

consumersRouter.post("/viewMeterStats", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req, true)
        const configJSON = deepCopy(viewMeterStats)
        let consumerId = req.body.id
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId
        }
        const data = await DBservice.Consumers.getConsumerMeterStats(consumerId)
        configJSON.data = data

        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId
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

consumersRouter.post("/viewMeterSanctionedLoad", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req, true)
        const configJSON = deepCopy(viewMeterSanctionedLoad)
        let consumerId = req.body.id
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId
        }
        const data = await DBservice.Consumers.getConsumerSanctionedLoadStats(consumerId)
        configJSON.data = data
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId
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

consumersRouter.post("/viewMeterCurrentConsumption", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req, true)
        const configJSON = deepCopy(viewMeterCurrentConsumption)
        let consumerId = req.body.id

        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId
        }
        const data = await DBservice.Consumers.getConsumerCurrentConsumptionStats(consumerId)
        configJSON.data = data
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId
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

consumersRouter.post("/viewMeterCurrentMonthConsumption", async (req: Request, res: Response) => {
    try {
        console.log("hvcvcjhvjvjhvjvjhcvjhh");
        const tokenObj = parseAuthTokenFromReq(req, true)
        const configJSON = deepCopy(viewMeterCurrentMonthConsumption)
        let consumerId = req.body.id
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId
        }
        const data = await DBservice.Consumers.getConsumerCurrentMonthBalanceStats(consumerId)
        configJSON.data = data
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId
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


consumersRouter.post("/viewMeterRechargesTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req, true)
        let consumerId = req.body.id
        console.log("sdvcjd", consumerId);
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(viewMeterRechargesTable)
        let meterRecharge: MeterRechargeDTO[] = []
        let totalRecords = 0

        if (tokenObj.accountTypeValue === "consumer") {
            console.log("inside table")
            consumerId = tokenObj.consumerId
        }
        let manualRechargeRespose: DBResponse = await MeterRechargeDBservice.getAllPaymentRechargeList(consumerId, filters)
        console.log("manual recharge", manualRechargeRespose)
        totalRecords = manualRechargeRespose.totalRecords;
        ;
        console.log("final test", meterRecharge);
        configJSON.data.rows = manualRechargeRespose.rows.map(row => {
            return {
                "paymentType": row.transaction_type,
                "meter": row.meterSNo,
                "method": row.method,
                "transactionId": row.transactionId,
                "checqueNo": row.chequeNo,
                "checqueDate": row.chequeDate,
                "bankName": row.bankName,
                "amount": row.amount,
                "availableBalance": row.remainingBalance,
                "comment": row.comment,
                "venderCode": row.vendorCode,
                "createdAt": row.createdAt,
            }
        })
        configJSON.data.totalRecords = totalRecords;
        // const meterRecharges: DBResponse = await DBservice.Consumers.getConsumerRechargesByConsumerId(consumerId, filters)
        // configJSON.data.totalRecords = meterRecharges.totalRecords
        //configJSON.data.totalRecords = 0
        // configJSON.data.rows = meterRecharges.rows.map(row => {
        //     row.id = row.rechargeId
        //     row.meter = {
        //         link: `/admin/meters/${row.meterId}`,
        //         label: row.meterSerialNo
        //     }
        //     return row
        // })
        //configJSON.data.rows = []
        console.log("sduyjbhcjxv", configJSON);

        if (tokenObj.accountTypeValue === "consumer") {
            console.log("inside table")
            configJSON.config.id = tokenObj.consumerId
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


consumersRouter.post("/viewConsumersBulkUpload", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const configJSON = deepCopy(viewConsumersBulkUpload)
        const consumerActionsConfigJSON = deepCopy(viewConsumerActions)
        const consumerActionFields = consumerActionsConfigJSON.config.actions.addConsumer.fields
        consumerActionFields.order.forEach((fieldId: string) => {
          if (consumerActionFields[fieldId].inputType === "selectInput") {
            configJSON.config.columns[fieldId].allowedOptions = consumerActionFields[fieldId].selectOptions.map(({description}: any) => description)
          }
        })
        if (tokenObj.accountTypeValue !== "superAdmin") {
          const order: string[] = configJSON.config.columns.order
          const excludedProjectOrder = order.filter(fieldId => fieldId !== "project")
          configJSON.config.columns.order = excludedProjectOrder
        }
        configJSON.config.uploadNonce = uuid();
        // createLog(tokenObj, Consumers, CONSUMER_CSV_UPLOAD, configJSON);
        return res.status(200).json(configJSON)
    } catch (e: any) {
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})
consumersRouter.post("/viewConsumersBulkUploadResult", async (req: Request, res: Response) => {
    try {

        const filters: FilterInfo = extractFiltersFromRequest(req)

        const configJSON = deepCopy(viewConsumersBulkUploadResult)

        return res.status(200).json(configJSON)
    } catch (e: any) {
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

const storePieces: Record<string, string[]> = {};

consumersRouter.post("/viewReceivedConsumers", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req);
        const { messageType, nonce, piece } = req.body;
        if (!storePieces[nonce]) {
            storePieces[nonce] = [];
        }
        storePieces[nonce].push(piece);
        const csvStr = storePieces[nonce].join('');

        console.log("concatenated str", csvStr);
        console.log(storePieces[nonce]);
        if (messageType == 'FINISH') {
            let csvJson: any
            try {
                csvJson = JSON.parse(csvStr);
            } catch (e) {
                throw new Error("Parse Unsuccessfull")
            }
            if (tokenObj.accountTypeValue !== "superAdmin") {
              const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects())
                  .rows;
              let projectName: any = undefined
              csvJson = csvJson.map((row: any) => {
                projectName = !projectName ? projects.find(project => project.projectId === tokenObj.projectId)?.projectName : projectName
                return ({
                  ...row,
                  project: projectName
                })
              })
            }
            storePieces[nonce] = []
            const data: DBStatResponse = await DBservice.Consumers.receivedConsumers(csvJson);
            return res.status(200).json(data);
        }
        return res.status(200).json({
            message: 'Receiving consumers..'
        })

    } catch (e: any) {
        return res
            .status(400)
            .json({
                message: e?.message
            })
    }
})

export default consumersRouter