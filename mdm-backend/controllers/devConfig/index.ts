import express, { Request, Response } from "express";
import { createLog, deepCopy, extractFiltersFromRequest, parseAuthTokenFromReq } from "../../utilities";
import viewDevConfigActions from "../../configs/viewDevConfigActions";
import { FilterInfo } from "../../utilities/types";
import viewAllDeviceConfigRequestsTable from "../../configs/viewAllDeviceConfigRequestsTable";
import DBservice from "../../services/DBservice";
import { ProjectDBDTO } from "../../services/DBservice/ProjectDBService/types";
import vieaAllMetersTableForDevConfig from "../../configs/viewAllMetersTableForDevConfig";
import { DBResponse, DBStatResponse } from "../../services/DBservice/types";
import { LOG_ACTION_CONSTS, LOG_MODULE_CONSTS } from "../logConsts";
const { DeviceConfiguration } = LOG_MODULE_CONSTS
const {
    SET_METER,
} = LOG_ACTION_CONSTS[DeviceConfiguration]


const devConfigRouter = express.Router()


devConfigRouter.post("/viewDevConfigActions", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(viewDevConfigActions)
        return res.status(200).json(configJSON)
    } catch (e: any) {
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})

devConfigRouter.post(
    "/viewAllMetersTableForDeviceConfig",
    async (req: Request, res: Response) => {
      try {
        const tokenObj = parseAuthTokenFromReq(req);
        const filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(vieaAllMetersTableForDevConfig)
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
              moduleNo: meter.moduleNo,
              phaseType: meter.phaseTypeDescription,
              sourceType: meter.sourceTypeDescription,
              consumptionType: meter.consumptionTypeDescription,
              firmwareVersion: meter.firmwareVersion,
            };
          }),
          totalRecords: metersResponse.totalRecords,
        };
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

devConfigRouter.post("/setMeterActions", async (req: Request, res: Response) => {
    await new Promise((resolve, reject) => setTimeout(() => { resolve({}) }, 3000))
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        
        // const configJSON = deepCopy(viewDevConfigActions)
        const actionsConfigJSON = deepCopy(viewDevConfigActions)
        const actions: any[] = actionsConfigJSON.config.actions.setMeters.actions
        const filters = {
          getAll: true,
          additionalFilters: [
            {
              trackId: "",
              filterType: "reqType",
              filterValue: "pending"
            }
          ]
        }
        let pendingRequests = (await DBservice.DeviceConfig.getMeterActionRequests(filters)).rows
        pendingRequests = pendingRequests.map(r => {
            r.meterSerialNo = {
                "label": r.meterSerialNo,
                "link": `/admin/meters/${encodeURIComponent(r.meterId)}`
            }
            r.project = {
                "label": r.projectName,
                "link": `/admin/projects/${encodeURIComponent(r.projectId)}`
            }
            r.rawActionName = String(r.actionName ?? "").slice(0)
            r.actionName = actions.find(action => action.id === r.actionName)?.label
            return r
        })
        const requestActions =
          req.body.actions
          .map((a: any) => {
            return {
              actionName: a.id,
              actionValue: a.value,
              meterSerialNo: a.meterSerialNo
            }
          })
        const foundPendingActions = 
          pendingRequests
          .map((a: any) => {
            return {
              actionName: a.rawActionName,
              actionValue: a.value,
              meterSerialNo: a.meterSerialNo.label
            }
          })
        console.log(foundPendingActions, requestActions)
        const foundPendingActionKeyMaps: any = foundPendingActions
        .reduce((acc: any, obj: any) => {
          return {
            ...acc,
            [`${obj.actionName}-${obj.actionValue}-${obj.meterSerialNo}`]: true
          }
        }, {})
        const finalActions = req.body.actions.map((action: any) => {
          if (foundPendingActionKeyMaps.hasOwnProperty(`${action.id}-${action.value}-${action.meterSerialNo}`)) {
            action.isPresent = true
          }
          return action
        })
        const resp = await DBservice.DeviceConfig.addRequests({actions: finalActions})
        let description = ``;
        resp.projectId = tokenObj.projectId
        createLog(tokenObj,DeviceConfiguration,SET_METER,resp, description)

        return res.status(200).json(resp)
    } catch (e: any) {
      console.error(e)
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

devConfigRouter.post("/viewAllDeviceConfigRequestsTable", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        let filters: FilterInfo = extractFiltersFromRequest(req)
        const configJSON = deepCopy(viewAllDeviceConfigRequestsTable)
        const actionsConfigJSON = deepCopy(viewDevConfigActions)
        const actions: any[] = actionsConfigJSON.config.actions.setMeters.actions
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions
            const excludedProjectOptions = selectOptions.filter(({ value }: any) => value !== "project")
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions

            const columns = configJSON.config.columns.order
            const excludedProjectColumns = columns.filter((value : string) => value !== "project")
            configJSON.config.columns.order = excludedProjectColumns
            filters = {
              ...(filters ?? {}),
              additionalFilters: [
                ...(filters?.additionalFilters ?? []),
                {
                  trackId: "",
                  filterType: "project",
                  filterValue: String(tokenObj.projectId)
                }
              ]
            }
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
        const resp = await DBservice.DeviceConfig.getMeterActionRequests(filters)
        configJSON.data.rows = resp.rows.map(r => {
            r.meterSerialNo = {
                "label": r.meterSerialNo,
                "link": `/admin/meters/${encodeURIComponent(r.meterId)}`
            }
            r.project = {
                "label": r.projectName,
                "link": `/admin/projects/${encodeURIComponent(r.projectId)}`
            }
            r.actionName = actions.find(action => action.id === r.actionName)?.label
            return r
        })

        configJSON.data.totalRecords = resp.totalRecords
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
export default devConfigRouter