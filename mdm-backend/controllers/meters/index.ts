import express, { Request, Response } from "express";
import {
  createLog,
  deepCopy,
  extractFiltersFromRequest,
  parseAuthTokenFromReq,
} from "../../utilities";
import viewMeterActions from "../../configs/viewMeterActions";
import viewAllMetersTable from "../../configs/viewAllMetersTable";
import viewMetersPushDataTable from "../../configs/viewMetersPushDataTable";
import viewMeterDetails from "../../configs/viewMeterDetails";
import viewMeterDynamicParams from "../../configs/viewMeterDynamicParams";
import viewMeterFinancialThisMonth from "../../configs/viewMeterFinancialThisMonth";
import viewMeterFinancialPrevMonth from "../../configs/viewMeterFinancialPrevMonth";
import viewMetersBulkUpload from "../../configs/viewMetersBulkUpload";
import { ProjectDBDTO } from "../../services/DBservice/ProjectDBService/types";
import DBservice from "../../services/DBservice";
import { DBResponse, DBStatResponse } from "../../services/DBservice/types";
import { FilterInfo } from "../../utilities/types";
import { MeterDBDTO } from "../../services/DBservice/MetersDBService/types";
import Joi from "joi";
import viewMetersBulkUploadResult from "../../configs/viewMetersBulkUploadResult";
const { v4: uuid } = require('uuid');
import { LOG_ACTION_CONSTS, LOG_MODULE_CONSTS } from "../logConsts";
const { Meters } = LOG_MODULE_CONSTS
const {
    CREATE_METER,
    EDIT_METER,
    METER_CSV_UPLOAD,
} = LOG_ACTION_CONSTS[Meters]
const metersRouter = express.Router();

metersRouter.post("/viewMeterActions", async (req: Request, res: Response) => {
  try {
    const tokenObj = parseAuthTokenFromReq(req);
    const configJSON = deepCopy(viewMeterActions);
    if (tokenObj.accountTypeValue !== "superAdmin") {
      const order = configJSON.config.actions.createMeter.fields.order;
      const excludedProjectOrder = order.filter(
        (fieldId: string) => fieldId !== "project"
      );
      configJSON.config.actions.createMeter.fields.order = excludedProjectOrder;
    } else {
      let selectOptions =
        configJSON.config.actions.createMeter.fields.project.selectOptions;
      const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects())
        .rows;
      const projectSelectOptions = projects.map((project) => ({
        value: project.projectId,
        description: project.projectName,
      }));
      selectOptions = [...selectOptions, ...projectSelectOptions];
      configJSON.config.actions.createMeter.fields.project.selectOptions =
        selectOptions;
    }
    return res.status(200).json(configJSON);
  } catch (e: any) {
    console.log(e);
    return res.status(400).json({
      message: e?.message,
    });
  }
});

metersRouter.post("/createMeter", async (req: Request, res: Response) => {
  const data = req?.body ?? {};
  const schema = Joi.object({
    meterSerialNo: Joi.string().required().min(1),
    consumptionType: Joi.string().required().min(1),
    firmwareVersion: Joi.string(),
    project: Joi.string().required().min(1),
    encryptionKey: Joi.string(),
    deveui:Joi.string(),
  });
  try {
    const tokenObj = parseAuthTokenFromReq(req);
    if (tokenObj.accountTypeValue !== "superAdmin") {
      data.project = tokenObj.projectId;
    }
    await schema.validateAsync(data);
    console.log(data);
    const result = await DBservice.Meters.createMeter(data);
    let description = `Meter Serial No - ${data.meterSerialNo}`;
    data.projectId = data.project
    createLog(tokenObj, Meters, CREATE_METER, data,description);
    res.status(200).json(result);
  } catch (e: any) {
    console.log(e);
    res.status(400).json({message: e.error})
  }
});

metersRouter.post("/editMeter", async (req: Request, res: Response) => {
  const data = req?.body ?? {};
  const schema = Joi.object({
    id: Joi.string().required().min(1),
    meterId: Joi.string().required().min(1),
    meterSerialNo: Joi.string().required().min(1),
    encryptionKey: Joi.string().required().min(1),
    // moduleNo: Joi.string().required().min(1),
    // sourceType: Joi.string().required().min(1),
    // phaseType: Joi.string().required().min(1),
    firmwareVersion: Joi.string(),
    consumptionType: Joi.string().required().min(1),
    project: Joi.string().required().min(1),
  });
  try {
    const tokenObj = parseAuthTokenFromReq(req);
    if (tokenObj.accountTypeValue !== "superAdmin") {
      data.project = tokenObj.projectId;
    }
    await schema.validateAsync(data);
    console.log(data);
    const result = await DBservice.Meters.editMeter(data);
    let description = ``;
    data.projectId = data.project
    createLog(tokenObj, Meters, EDIT_METER, data, description);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
});

metersRouter.post(
  "/viewAllMetersTable",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const filters: FilterInfo = extractFiltersFromRequest(req);
      const configJSON = deepCopy(viewAllMetersTable);
      let metersResponse: DBResponse;
      if (tokenObj.accountTypeValue !== "superAdmin") {
        metersResponse = await DBservice.Meters.getMetersByProjectId(
          tokenObj.projectId,
          filters
        );
        const order = configJSON.config.columns.order;
        const excludedProjectOrder = order.filter(
          (fieldId: string) => fieldId !== "project"
        );
        configJSON.config.columns.order = excludedProjectOrder;

        const selectOptions =
          configJSON.config.filterConfig.filterType.selectOptions;
        const excludedProjectSelectOptions = selectOptions.filter(
          ({ value }: any) => value !== "project"
        );
        configJSON.config.filterConfig.filterType.selectOptions =
          excludedProjectSelectOptions;
        // const filtersOrder = await DBservice.Project.getProjects()
      } else {
        metersResponse = await DBservice.Meters.getMeters(filters);
        console.log(metersResponse,"meterResponseeeee")
        let selectOptions =
          configJSON.config.filterConfig.filterValue.project.selectOptions;
        const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects())
          .rows;
        const projectSelectOptions = projects.map((project) => ({
          value: project.projectId,
          description: project.projectName,
        }));
        selectOptions = [...selectOptions, ...projectSelectOptions];
        configJSON.config.filterConfig.filterValue.project.selectOptions =
          selectOptions;
      }
      configJSON.data = {
        rows: metersResponse.rows.map((meter) => {
          return {
            id: meter.meterId,
            meterSerialNo: {
              label: meter.meterSerialNo,
              link: `/admin/meters/${encodeURIComponent(meter.meterId)}`,
            },
            project: {
              label: meter.projectName,
              link: `/admin/projects/${encodeURIComponent(meter.projectId)}`,
            },
            consumer: {
              label: meter.consumerName,
              link: `/admin/consumers/${meter.consumerId}`,
            },
            encryptionKey:meter.encryptionKey,
            deveui: meter.deveui,
            // phaseType: meter.phaseTypeDescription,
            // sourceType: meter.sourceTypeDescription,
            consumptionType: meter.consumptionTypeDescription,
            firmwareVersion: meter.firmwareVersion,
          };
        }),
        totalRecords: metersResponse.totalRecords,
      };
      return res.status(200).json(configJSON);
    } catch (e: any) {
      return res.status(400).json({
        message: e?.message,
      });
    }
  }
);

metersRouter.post(
  "/viewMetersPushDataTable",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const filters = extractFiltersFromRequest(req);
      const configJSON = deepCopy(viewMetersPushDataTable);
      const meterId: string = req.body.id;
      configJSON.config.id = meterId;
      const meters: MeterDBDTO[] = (await DBservice.Meters.getMeterById(meterId)).rows;
      const meterSerialNo = meters?.[0]?.meterSerialNo ?? ""
      configJSON.config.label = `${meterSerialNo} Meter Push Data`;
      let metersPushDataResponse: DBResponse;
      if (tokenObj.accountTypeValue !== "superAdmin") {
        const projectId = tokenObj.projectId;
        metersPushDataResponse =
          await DBservice.MetersPushData.getMeterPushDataByProjectId(
            meterId,
            projectId,
            filters
          );
        const order = configJSON.config.columns.order;
        const excludedProjectOrder = order.filter(
          (fieldId: string) => fieldId !== "project"
        );
        configJSON.config.columns.order = excludedProjectOrder;

        const filterConfigSelectOptions =
          configJSON.config.filterConfig.filterType.selectOptions;
        const excludedProjectFilterConfigSelectOptions =
          filterConfigSelectOptions.filter(
            ({ value }: any) => value !== "project"
          );
        configJSON.config.filterConfig.filterType.selectOptions =
          excludedProjectFilterConfigSelectOptions;
      } else {
        metersPushDataResponse =
          await DBservice.MetersPushData.getMeterPushData(meterId, filters);
      }
      configJSON.data.totalRecords = metersPushDataResponse.totalRecords;
      configJSON.data.rows = metersPushDataResponse.rows.map((row) => {
        return {
          id: row.id,
          meterSerialNo: row?.meterSerialNo,
          project: {
            link: `/admin/projects/${row?.projectId}`,
            label: row?.projectName,
          },
          powerFactor: row?.powerFactor || "", // Optional chaining with a default value
          cumulativeWh: row?.cumulativeWh || "",
          cumulativeVah: row?.cumulativeVah || "", // Changed from cumulativeWh to cumulativeVah
          overloadStatus: row?.overloadStatus || "",
          receiveTime: row?.receiveTime || "",
          //consumption_type: row?.consumption_type || "", // Use optional chaining
          cumulative_vah_genset: row?.cumulative_vah_genset || "",
          cumulative_vah_grid: row?.cumulative_vah_grid || "",
          cumulative_wh_genset: row?.cumulative_wh_genset || "",
          cumulative_wh_grid: row?.cumulative_wh_grid || "",
          dg_enable_disable: row?.dg_enable_disable || "",
          energy_source_id: row?.energy_source_id || "",
          grid_enable_disable: row?.grid_enable_disable || "",
          master_cutoff_status: row?.master_cutoff_status || "",
          md_kva_dg_current_mth: row?.md_kva_dg_current_mth || "",
          md_kva_grid_current_mth: row?.md_kva_grid_current_mth || "",
          md_kw_dg_current_mth: row?.md_kw_dg_current_mth || "",
          md_kw_grid_current_mth: row?.md_kw_grid_current_mth || "",
          meter_consumption: row?.meter_consumption || "",
          meter_balance_dg: row?.meter_balance_dg || "",
          meter_balance_grid: row?.meter_balance_grid || "",
          overload_status: row?.overload_status || "", // Optional chaining
          overload_threshold_for_dg: row?.overload_threshold_for_dg || "",
          overload_threshold_for_grid: row?.overload_threshold_for_grid || "",
          push_interval_in_minute: row?.push_interval_in_minute || "",
          total_active_power: row?.total_active_power || "",
          total_apparent_power: row?.total_apparent_power || "",
        };
        
      });
      return res.status(200).json(configJSON);
    } catch (e: any) {
      res.status(400).json({message: e.error})
    }
  }
);

metersRouter.post("/viewMeterDetails", async (req: Request, res: Response) => {
  try {
    const tokenObj = parseAuthTokenFromReq(req);
    const configJSON = deepCopy(viewMeterDetails);
    if (tokenObj.accountTypeValue === "superAdmin") {
      let selectOptions =
        configJSON.config.actions.editMeter.fields.project.selectOptions;
      const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects())
        .rows;
      const projectSelectOptions = projects.map((project) => ({
        value: project.projectId,
        description: project.projectName,
      }));
      selectOptions = [...selectOptions, ...projectSelectOptions];
      configJSON.config.actions.editMeter.fields.project.selectOptions =
        selectOptions;
    } else {
      const order = configJSON.config.actions.editMeter.fields.order;
      const excludedProjectOrder = order.filter(
        (fieldId: string) => fieldId !== "project"
      );
      configJSON.config.actions.editMeter.fields.order = excludedProjectOrder;
    }
    const id = req.body.id;
    configJSON.config.id = id;
    const meters: MeterDBDTO[] = (await DBservice.Meters.getMeterById(id)).rows;
    console.log("meters", meters);
    if (meters?.[0]) {
      const meter = meters[0];
      configJSON.data = {
        meterSerialNo: meter.meterSerialNo,
        encryptionKey:meter.encryptionKey,
        // moduleNo: meter.moduleNo,
        // phaseType: meter.phaseTypeDescription,
        // sourceType: meter.sourceTypeDescription,
        consumptionType: meter.consumptionTypeDescription,
        project: {
          value: meter.projectName,
          link: `/admin/projects/${encodeURIComponent(meter.projectId)}`,
        },
        consumer: {
          value: meter.consumerName,
          link: `/admin/consumers/${encodeURIComponent(meter.consumerId)}`,
        },
        firmwareVersion: meter?.firmwareVersion,
      };
      configJSON.config.actions.editMeter.data = {
        ...deepCopy(configJSON.data),
        project: meter.projectId,
        phaseType: meter.phaseTypeValue,
        sourceType: meter.sourceTypeValue,
        consumptionType: meter.consumptionTypeValue,
      };
      delete configJSON.config.actions.editMeter.data.consumer;
      return res.status(200).json(configJSON);
    }
    return res.status(200).json(configJSON);
  } catch (e: any) {
    return res.status(400).json({
      message: e?.message,
    });
  }
});

metersRouter.post(
  "/viewMeterDynamicParams",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const configJSON = deepCopy(viewMeterDynamicParams);
      const meterId = req.body.id;
      const data = await DBservice.Meters.getMeterDynamicParamsStats(meterId);
      // configJSON.data = data;
      console.log("data recieved", data)
      configJSON.data = {
        relay: data.rows?.[0]?.relayStatus ?? ""
      }
      return res.status(200).json(configJSON);
    } catch (e: any) {
      return res.status(400).json({
        message: e?.message,
      });
    }
  }
);

metersRouter.post(
  "/viewMeterFinancialThisMonth",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const meterId = req.body.id;
      const configJSON = deepCopy(viewMeterFinancialThisMonth);
      const data: DBStatResponse =
        await DBservice.Financials.getThisMonthFinancials(meterId);
      console.log("data financials", data);
      configJSON.data = data;
      return res.status(200).json(configJSON);
    } catch (e: any) {
      return res.status(400).json({
        message: e?.message,
      });
    }
  }
);

metersRouter.post(
  "/viewMeterFinancialPrevMonth",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const configJSON = deepCopy(viewMeterFinancialPrevMonth);
      const meterId = req.body.id;
      const data: DBStatResponse =
        await DBservice.Financials.getPrevMonthFinancials(meterId);
      configJSON.data = data;
      return res.status(200).json(configJSON);
    } catch (e: any) {
      return res.status(400).json({
        message: e?.message,
      });
    }
  }
);

metersRouter.post(
  "/viewMetersBulkUpload",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const configJSON = deepCopy(viewMetersBulkUpload);
      const meterActionsConfigJSON = deepCopy(viewMeterActions)
      const meterActionFields = meterActionsConfigJSON.config.actions.createMeter.fields
      meterActionFields.order.forEach((fieldId: string) => {
        if (meterActionFields[fieldId].inputType === "selectInput") {
          configJSON.config.columns[fieldId].allowedOptions = meterActionFields[fieldId].selectOptions.map(({description}: any) => description)
        }
      })
      if (tokenObj.accountTypeValue !== "superAdmin") {
        const order: string[] = configJSON.config.columns.order
        const excludedProjectOrder = order.filter(fieldId => fieldId !== "project")
        configJSON.config.columns.order = excludedProjectOrder
      }
      configJSON.config.uploadNonce = uuid();
      let description = ``;
      createLog(tokenObj, Meters, METER_CSV_UPLOAD, configJSON, description);
      return res.status(200).json(configJSON);
    } catch (e: any) {
      return res.status(400).json({
        message: e?.message,
      });
    }
  }
);
metersRouter.post("/viewMetersBulkUploadResult", async (req: Request, res: Response) => {
  try {
    const configJSON = deepCopy(viewMetersBulkUploadResult)
    return res.status(200).json(configJSON )
  } catch (e: any) {
      return res
      .status(400)
      .json({
          message: e?.message
      })
  }
})
const storePieces:Record<string,string[]>={};

metersRouter.post("/viewReceivedMeters", async (req: Request, res: Response) => {
  try {
    const tokenObj = parseAuthTokenFromReq(req);
    const { messageType, nonce, piece } = req.body;
    if (!storePieces[nonce]) {
      storePieces[nonce] = [];
    }
    storePieces[nonce].push(piece);
    const csvStr = storePieces[nonce].join('');
    if (messageType === 'FINISH') {
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
      const data: DBStatResponse = await DBservice.Meters.receivedMeters(csvJson);
      return res.status(200).json(data);
    }
    return res.status(200).json({
      message: 'Receiving meters..'
    })
  } catch (e: any) {
    return res
      .status(400)
      .json({
        message: e?.message
      })
  }
})

export default metersRouter;
