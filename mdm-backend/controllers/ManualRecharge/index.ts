import express, { Request, Response } from "express";
import {
  createLog,
  deepCopy,
  extractFiltersFromRequest,
  parseAuthTokenFromReq,
} from "../../utilities";
import viewManualRecharge from "../../configs/viewManualRecharge";
import { DBResponse } from "../../services/DBservice/types";
import DBservice from "../../services/DBservice/MeterRecharge";
import ConsumersDBService from "../../services/DBservice/ConsumersDBService";
import viewManualRechargeGroupTable from "../../configs/viewManualRechargeGroupTable";
import { MeterRechargeDTO } from "./type";
import { ConsumerDBDTO } from "../../services/DBservice/ConsumersDBService/types";
import viewDebitNoteTable from "../../configs/viewDebitNoteTable";
import viewCreditNoteTable from "../../configs/viewCreditNoteTable";
import { ProjectDBDTO } from "../../services/DBservice/ProjectDBService/types";
import ProjectDBService from "../../services/DBservice/ProjectDBService";
import banks from "../../configs/readableConfigs/banks"
import { LOG_ACTION_CONSTS,LOG_MODULE_CONSTS } from "../logConsts";
const { MeterRecharge } = LOG_MODULE_CONSTS
const {
    CREATE_MANUAL_RECHARGE,
    CREATE_CREDIT_NOTE,
    CREATE_DEBIT_NOTE,
} = LOG_ACTION_CONSTS[MeterRecharge]
const meterRechargeRouter = express.Router();

const RUN_MODE = process.env.RUN_MODE || "dev";

meterRechargeRouter.post("/viewManualChargeActions",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const configJSON = deepCopy(viewManualRecharge);
      configJSON.config.actions.manualRecharge.fields.bankName.selectOptions = [
        {
          value: "-",
          description: "-"
        },
        ...banks.banks
      ]
      const filters: any = {}
      if (tokenObj.accountTypeValue !== "superAdmin") {
        filters.additionalFilters = [
          {
            trackId: "",
            filterType: "project",
            filterValue: String(tokenObj.projectId)
          }
        ]
      }
      if (RUN_MODE != "dev") {
        const consumers: ConsumerDBDTO[] = (
          await ConsumersDBService.getAllConsumers(filters)
        ).rows;
        const consumerSelectOptions = consumers.map((consumer) => ({
          value: consumer.consumerId,
          crnNo: consumer.crnNo,
          meterSerialNo: consumer.meterSerialNo,
          description: consumer.consumerName,
        }));
        const meterOptions = consumers.map(consumer => {
          return {
            value: consumer.meterSerialNo,
            crnNo: consumer.crnNo,
            consumerId: consumer.consumerId,
            description: consumer.meterSerialNo
          }
        })
        const crnOptions = consumers.map((consumer) => {
          return {
            value: consumer.consumerId,
            description: consumer.crnNo,
            meterSerialNo: consumer.meterSerialNo
          }
        })
        console.log(consumerSelectOptions);
        //let MAnualRechargeMeterSelectOptions=configJSON.config.actions.manualRecharge.fields.meterInfo.selectOptions;
        let manualRechargeSelectOptions =
          configJSON.config.actions.manualRecharge.fields.consumer.selectOptions;
        let creditNoteSelectOptions =
          configJSON.config.actions.creditNote.fields.consumer.selectOptions;
        let debitNoteSelectOptions =
          configJSON.config.actions.debitNote.fields.consumer.selectOptions;
        //MAnualRechargeMeterSelectOptions=[...manualRechargeSelectOptions,...data];
        manualRechargeSelectOptions = [
          ...manualRechargeSelectOptions,
          ...consumerSelectOptions,
        ];
        creditNoteSelectOptions = [
          ...creditNoteSelectOptions,
          ...consumerSelectOptions,
        ];
        debitNoteSelectOptions = [
          ...debitNoteSelectOptions,
          ...consumerSelectOptions,
        ];
        //configJSON.config.actions.manualRecharge.fields.meterInfo.selectOptions=MAnualRechargeMeterSelectOptions
        
  
        configJSON.config.actions.manualRecharge.fields.meter.selectOptions = [
          {
            value: "-",
            description: "-"
          },
          ...meterOptions
        ]
        configJSON.config.actions.manualRecharge.fields.crnNo.selectOptions = [
          {
            value: "-",
            description: "-"
          },
          ...crnOptions
        ]
        configJSON.config.actions.manualRecharge.fields.consumer.selectOptions =
          manualRechargeSelectOptions;
  
  
        configJSON.config.actions.creditNote.fields.crnNo.selectOptions = [
          {
            value: "-",
            description: "-"
          },
          ...crnOptions
        ]
        configJSON.config.actions.creditNote.fields.meter.selectOptions = [
          {
            value: "-",
            description: "-"
          },
          ...meterOptions
        ]
        configJSON.config.actions.creditNote.fields.consumer.selectOptions =
          creditNoteSelectOptions;
  
  
        configJSON.config.actions.debitNote.fields.crnNo.selectOptions = [
          {
            value: "-",
            description: "-"
          },
          ...crnOptions
        ]
        configJSON.config.actions.debitNote.fields.meter.selectOptions = [
          {
            value: "-",
            description: "-"
          },
          ...meterOptions
        ]
        configJSON.config.actions.debitNote.fields.consumer.selectOptions =
          debitNoteSelectOptions;
      }
      console.log("qweeysjvj",configJSON);
      return res.status(200).json(configJSON);
    } catch (e: any) {
      return res.status(400).json({
        message: e?.message,
      });
    }
  }
);

meterRechargeRouter.post("/createManualRechargeActions",
  async (req: Request, res: Response) => {
    const data = req?.body ?? {};
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const result = await DBservice.createManualRecharge(data);
      let description = `${data.method}`;
      data.projectId = tokenObj.projectId;
      createLog(tokenObj,MeterRecharge,CREATE_MANUAL_RECHARGE,data,description)
      res.status(200).json(result);
    } catch (e: any) {
      return res.status(400).json({
        message: e?.message,
      });
    }
  }
);

meterRechargeRouter.post("/createCreditNoteActions",
  async (req: Request, res: Response) => {
    const data = req?.body ?? {};
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      console.log(data);
      const result = await DBservice.createCreditNote(data);
      let description = `${data.method}`;
      data.projectId = tokenObj.projectId;
      createLog(tokenObj,MeterRecharge,CREATE_CREDIT_NOTE,data, description)
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  }
);

meterRechargeRouter.post(
  "/createDebitNoteActions",
  async (req: Request, res: Response) => {
    const data = req?.body ?? {};
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      console.log(data);
      const result = await DBservice.createDebitNote(data);
      let description = `${data.method}`;
      data.projectId = tokenObj.projectId;
      createLog(tokenObj,MeterRecharge,CREATE_DEBIT_NOTE,data, description)
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  }
);

meterRechargeRouter.post("/viewAllManualRechargeTable",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      let filters = extractFiltersFromRequest(req);
      let meterRecharge: MeterRechargeDTO[] = [];
      let totalRecords = 0;
      const configJSON = deepCopy(viewManualRechargeGroupTable);
      if (tokenObj.accountTypeValue !== "superAdmin") {
        filters = {
          ...(filters ?? {}),
          additionalFilters: [
            ...(filters.additionalFilters ?? []),
            {
              "trackId": "",
              filterType: "project",
              filterValue: String(tokenObj.projectId)
            }
          ]
        }
        const selectOptions = configJSON.config.filterConfig.filterType.selectOptions
        const excludedProjectOptions = selectOptions.filter(({ value }: any) => value !== "project")
        configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions
      } else {
        let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions
        const projects: ProjectDBDTO[] = (await ProjectDBService.getProjects()).rows
        const projectSelectOptions = projects.map(project => ({
            value: project.projectId,
            description: project.projectName
        }))
        selectOptions = [...selectOptions, ...projectSelectOptions]
        configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions
      }
      let manualRechargeRespose: DBResponse =
        await DBservice.getAllManualRechargeList(filters);
      totalRecords = manualRechargeRespose.totalRecords;
      meterRecharge = manualRechargeRespose.rows;
      console.log("final test", meterRecharge);
      configJSON.data.rows = meterRecharge.map((row: any) => {
        return {
          consumer: {
            label: row.consumerName,
            link: `/admin/consumers/${row.consumerId}`,
          },
          meter: row.meterSNo,
          method: row.method,
          transactionId: row.transactionId,
          checqueNo: row.chequeNo,
          checqueDate: row.chequeDate,
          bankName: row.bankName,
          amount: row.amount,
          //availableBalance: row.availableBalance,
          comment: row.comment,
          createdAt: row.createdAt,
          venderCode: row.vendorCode,

        };
      });
      configJSON.data.totalRecords = totalRecords;
      return res.status(200).json(configJSON);
    } catch (e: any) {
      return res.status(400).json({
        message: e?.message,
      });
    }
  }
);

meterRechargeRouter.post("/viewAllCreditNoteTable",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      let filters = extractFiltersFromRequest(req);
      const configJSON = deepCopy(viewCreditNoteTable);
      let meterRecharge: MeterRechargeDTO[] = [];
      let totalRecords = 0;
      if (tokenObj.accountTypeValue !== "superAdmin") {
        filters = {
          ...(filters ?? {}),
          additionalFilters: [
            ...(filters.additionalFilters ?? []),
            {
              "trackId": "",
              filterType: "project",
              filterValue: String(tokenObj.projectId)
            }
          ]
        }
        const selectOptions = configJSON.config.filterConfig.filterType.selectOptions
        const excludedProjectOptions = selectOptions.filter(({ value }: any) => value !== "project")
        configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions
      } else {
        let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions
        const projects: ProjectDBDTO[] = (await ProjectDBService.getProjects()).rows
        const projectSelectOptions = projects.map(project => ({
            value: project.projectId,
            description: project.projectName
        }))
        selectOptions = [...selectOptions, ...projectSelectOptions]
        configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions
      }
      let manualRechargeRespose: DBResponse =
        await DBservice.getAllCreditNoteList(filters);
      console.log("manual recharge", manualRechargeRespose);
      totalRecords = manualRechargeRespose.totalRecords;
      meterRecharge = manualRechargeRespose.rows;
      console.log("final test", meterRecharge);
      configJSON.data.rows = meterRecharge.map((row: any) => {
        return {
          consumer: {
            label: row.consumerName,
            link: `/admin/consumers/${row.consumerId}`,
          },
          meter: row.meterSNo,
          amount: row.amount,
          //availableBalance: row.availableBalance,
          comment: row.comment,
           venderCode: row.vendorCode,
          createdAt: row.createdAt,
        };
      });
      configJSON.data.totalRecords = totalRecords;
      return res.status(200).json(configJSON);
    } catch (e: any) {
      if(e?.code === "ECONNREFUSED"){
        return res
        .status(500)
        .json({
            message: "Database ECONNREFUSED"
        }) 
    }
      return res.status(400).json({
        message: e?.message,
      });
    }
  }
);

meterRechargeRouter.post("/viewAllDebitNoteTable",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      let filters = extractFiltersFromRequest(req);
      const configJSON = deepCopy(viewDebitNoteTable);
      if (tokenObj.accountTypeValue !== "superAdmin") {
        filters = {
          ...(filters ?? {}),
          additionalFilters: [
            ...(filters.additionalFilters ?? []),
            {
              "trackId": "",
              filterType: "project",
              filterValue: String(tokenObj.projectId)
            }
          ]
        }
        const selectOptions = configJSON.config.filterConfig.filterType.selectOptions
        const excludedProjectOptions = selectOptions.filter(({ value }: any) => value !== "project")
        configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions
      } else {
        let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions
        const projects: ProjectDBDTO[] = (await ProjectDBService.getProjects()).rows
        const projectSelectOptions = projects.map(project => ({
            value: project.projectId,
            description: project.projectName
        }))
        selectOptions = [...selectOptions, ...projectSelectOptions]
        configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions
      }
      let meterRecharge: MeterRechargeDTO[] = [];
      let totalRecords = 0;
      let manualRechargeRespose: DBResponse =
        await DBservice.getAllDebitNoteList(filters);
      console.log("manual recharge", manualRechargeRespose);
      totalRecords = manualRechargeRespose.totalRecords;
      meterRecharge = manualRechargeRespose.rows;
      console.log("final test", meterRecharge);
      configJSON.data.rows = meterRecharge.map((row: any) => {
        return {
          consumer: {
            label: row.consumerName,
            link: `/admin/consumers/${row.consumerId}`,
          },
          meter: row.meterSNo,
          amount: row.amount,
          //availableBalance: row.availableBalance,
          comment: row.comment,
           venderCode: row.vendorCode,
          createdAt: row.createdAt,
        };
      });
      configJSON.data.totalRecords = totalRecords;
      return res.status(200).json(configJSON);
    } catch (e: any) {
      if(e?.code === "ECONNREFUSED"){
        return res
        .status(500)
        .json({
            message: "Database ECONNREFUSED"
        }) 
    }
      return res.status(400).json({
        message: e?.message,
      });
    }
  }
);

meterRechargeRouter.post(
  "/getMeterSerialNoByConsumerId",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const configJSON = deepCopy(viewManualRecharge);
      const id = req.body.consumerId
      let resp;
      if (RUN_MODE != "dev") {
        resp = await DBservice.getMeterSerialNoByConsumerId(id);
      }
      return res.status(200).json(resp);
    } catch (e: any) {
      if(e?.code === "ECONNREFUSED"){
        return res
        .status(500)
        .json({
            message: "Database ECONNREFUSED"
        }) 
    }
      return res.status(400).json({
        message: e?.message,
      });
    }
  }
);

export default meterRechargeRouter;
