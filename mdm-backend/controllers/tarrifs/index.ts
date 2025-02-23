import express, { Request, Response } from "express";
import {
  createLog,
  deepCopy,
  extractFiltersFromRequest,
  parseAuthTokenFromReq,
} from "../../utilities";
import viewAllProjectsTable from "../../configs/viewAllProjectsTable";
import viewTarrifActions from "../../configs/viewTarrifActions";
import viewAllTarrifGroupsTable from "../../configs/viewAllTarrifGroupsTable";
import viewAllTarrifsTable from "../../configs/viewAllTarrifsTable";
import viewTarrifDetails from "../../configs/viewTarrifDetails";
import DBservice from "../../services/DBservice";
import { ProjectDBDTO } from "../../services/DBservice/ProjectDBService/types";
import { DBResponse } from "../../services/DBservice/types";
import {
  slab,
  TarrifGroupDBDTO,fixedCharge
} from "../../services/DBservice/TarrifsDBService/types";
import Joi from "joi";
import viewAllAtachTariffHistory from "../../configs/viewAllAtachTariffHistory";
import moment from "moment";
import { LOG_ACTION_CONSTS, LOG_MODULE_CONSTS } from "../logConsts";
const { Tarrifs } = LOG_MODULE_CONSTS
const {
    ADD_TARRIF_GROUP,
    CREATE_TARRIF,
    ATTACH_TARRIF,
    CHANGE_TARRIF
} = LOG_ACTION_CONSTS[Tarrifs]

const tarrifsRouter = express.Router();

tarrifsRouter.post(
  "/attachOrDetachTarrif",
  async (req: Request, res: Response) => {
    const data = req?.body ?? {};
    const schema = Joi.object({
      tarrifGroup: Joi.string().required().min(1),
      tarrif: Joi.string().allow(""),
      project: Joi.string(),
    });
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      if (tokenObj.accountTypeValue !== "superAdmin") {
        data.project = tokenObj.projectId;
      }
      await schema.validateAsync(data);
      console.log(data);
      const result = await DBservice.Tarrifs.attachOrDetachTarrif(data);
      let description = `${data.tarrifGroup}`;
      data.projectId = tokenObj.projectId;
      createLog(tokenObj, Tarrifs, ATTACH_TARRIF, data, description)
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  }
);

tarrifsRouter.post("/changeTariff", async (req: Request, res: Response) => {
  const data = req?.body ?? {};
  const schema = Joi.object({
    tarrifGroup: Joi.string().required().min(1),
    tarrif: Joi.string().allow(""),
    project: Joi.string(),
    applicableDate: Joi.string(),
  });
  try {
    const tokenObj = parseAuthTokenFromReq(req);
    if (tokenObj.accountTypeValue !== "superAdmin") {
      data.project = tokenObj.projectId;
    }
    await schema.validateAsync(data);
    console.log(data);
    const result = await DBservice.Tarrifs.changeTariff(data);
    let description = ``;
    data.projectId = tokenObj.projectId;
    createLog(tokenObj, Tarrifs, CHANGE_TARRIF, data, description)
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
});

tarrifsRouter.post("/createTarrif", async (req: Request, res: Response) => {
  const data = req?.body ?? {};
  try {
    const tokenObj = parseAuthTokenFromReq(req);
    if (tokenObj.accountTypeValue !== "superAdmin") {
      data.project = tokenObj.projectId;
    }
    data.slabs.forEach((slab: slab) => {
      // Use 'typeof slab' here if needed in a different context
      let slabType: typeof slab = { ...slab }; // If you need to refer to the type dynamically
      slab.id = "";

    });
    data.fixedCharges.forEach((fixedCharge: fixedCharge) => {
      // Use 'typeof slab' here if needed in a different context
      let slabType: typeof fixedCharge = { ...fixedCharge }; // If you need to refer to the type dynamically
      fixedCharge.id = "";
    });
    console.log(data);
    const result = await DBservice.Tarrifs.createTarrif(data);
    let description = `${data.tarrifName}`;
    data.projectId = tokenObj.projectId;
    createLog(tokenObj, Tarrifs, CREATE_TARRIF,data,description)
    res.status(200).json(result);
  } catch (e: any) {
    console.log(e);
    res.status(400).json({message: e.error})
  }
});

tarrifsRouter.post(
  "/createTarrifGroup",
  async (req: Request, res: Response) => {
    const data = req?.body ?? {};
    const schema = Joi.object({
      tarrifGroupName: Joi.string().required().min(1),
      tarrifGroupDescription: Joi.string(),
      project: Joi.string(),
    });
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      if (tokenObj.accountTypeValue !== "superAdmin") {
        data.project = tokenObj.projectId;
      }
      await schema.validateAsync(data);
      console.log(data);
      const result = await DBservice.Tarrifs.createTarrifGroup(data);
      let description = `${data.tarrifGroupName}`;
      data.projectId = tokenObj.projectId;
      createLog(tokenObj, Tarrifs, ADD_TARRIF_GROUP,data, description)
      res.status(200).json(result);
    } catch (e: any) {
      console.log(e);
      res.status(400).json({message: e.error})
    }
  }
);

tarrifsRouter.post("/viewTarrifActions", async (req: Request, res: Response) => {
  try {
    const tokenObj = parseAuthTokenFromReq(req);
    const configJSON = deepCopy(viewTarrifActions);
    let tarrifGroupOptions: any[] = [];
    let unlinkTarrifGroupOptions: any[] = [];
    let tarrifOptions: any[] = [];
    let unlinkTarrifOptions: any[] = [];

    if (tokenObj.accountTypeValue !== "superAdmin") {
      const order = configJSON.config.actions.createTarrif.fields.order;
      const excludedProjectOrder = order.filter((fieldId: string) => fieldId !== "project");
      configJSON.config.actions.createTarrif.fields.order = excludedProjectOrder;

      const tarrifGroupOrder = configJSON.config.actions.addTarrifGroup.fields.order;
      const excludedTarrifGroupProjectOrder = tarrifGroupOrder.filter((fieldId: string) => fieldId !== "project");
      configJSON.config.actions.addTarrifGroup.fields.order = excludedTarrifGroupProjectOrder;

      const aODTarrifOrder = configJSON.config.actions.attachOrDetachTarrif.fields.order;
      const excludedAODTarrifProjectOrder = aODTarrifOrder.filter((fieldId: string) => fieldId !== "project");
      configJSON.config.actions.attachOrDetachTarrif.fields.order = excludedAODTarrifProjectOrder;

      // configJSON.config.actions.changeTariff.fields.order = excludedAODTarrifProjectOrder;

	let changeTariffOrder = configJSON.config.actions.changeTariff.fields.order;
	if (!changeTariffOrder.includes("applicableDate")) {
	  changeTariffOrder.push("applicableDate");
	}
	changeTariffOrder = changeTariffOrder.filter((fieldId: string) => fieldId !== "project");
	configJSON.config.actions.changeTariff.fields.order = changeTariffOrder;

      const projectId = tokenObj.projectId;

      // Fetching tarrif groups, tarrifs, unlink tarrifs
      const tarrifGroups = (await DBservice.Tarrifs.getLinkTarrifGroupsByProjectId(projectId)).rows;
      tarrifGroupOptions = tarrifGroups.map((tG) => ({
        forProject: tG.projectId,
        tarrifId: tG.tarrifId,
        tarrifName: tG.tarrifName,
        value: tG.id,
        description: tG.tarrifGroupName,
      }));

      const unlinkTarrifGroups = (await DBservice.Tarrifs.getUnlinkTarrifGroupsByProjectId(projectId)).rows;
      unlinkTarrifGroupOptions = unlinkTarrifGroups.map((tG) => ({
        forProject: tG.projectId,
        tarrifId: tG.tarrifId,
        tarrifName: tG.tarrifName,
        value: tG.id,
        description: tG.tarrifGroupName,
      }));

      const tarrifs = (await DBservice.Tarrifs.getAvailableLinkTarrifsByProjectId(projectId)).rows;
      tarrifOptions = tarrifs.map((t) => ({
        forProject: t.projectId,
        value: t.id,
        description: t.tarrifName,
      }));

      const unlinkTarrifs = (await DBservice.Tarrifs.getAvailableUnLinkTarrifsByProjectId(projectId)).rows;
      unlinkTarrifOptions = unlinkTarrifs.map((t) => ({
        forProject: t.projectId,
        value: t.id,
        description: t.tarrifName,
      }));

    } else {
      // Super Admin case: Adding project options
      let selectOptions = configJSON.config.actions.createTarrif.fields.project.selectOptions;
      const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows;
      const projectSelectOptions = projects.map((project) => ({
        value: project.projectId,
        description: project.projectName,
      }));
      selectOptions = [...selectOptions, ...projectSelectOptions];

      // Update the select options for all actions
      configJSON.config.actions.createTarrif.fields.project.selectOptions = selectOptions;
      configJSON.config.actions.addTarrifGroup.fields.project.selectOptions = selectOptions;
      configJSON.config.actions.attachOrDetachTarrif.fields.project.selectOptions = selectOptions;
      configJSON.config.actions.changeTariff.fields.project.selectOptions = selectOptions;

      // Hiding unnecessary fields for Super Admin
      configJSON.config.actions.attachOrDetachTarrif.fields.tarrif.hide = true;
      configJSON.config.actions.attachOrDetachTarrif.fields.tarrifGroup.hide = true;
      configJSON.config.actions.changeTariff.fields.tarrif.hide = true;
      configJSON.config.actions.changeTariff.fields.tarrifGroup.hide = true;
      configJSON.config.actions.changeTariff.fields.applicableDate.hide = true;

      // Fetching and mapping tarrif groups and tarrifs for Super Admin
      const tarrifGroups = (await DBservice.Tarrifs.getLinkTarrifGroups()).rows;
      tarrifGroupOptions = tarrifGroups.map((tG) => ({
        forProject: tG.projectId,
        tarrifId: tG.tarrifId,
        tarrifName: tG.tarrifName,
        value: tG.id,
        description: tG.tarrifGroupName,
      }));

      const unlinkTarrifGroups = (await DBservice.Tarrifs.getUnlinkTarrifGroups()).rows;
      unlinkTarrifGroupOptions = unlinkTarrifGroups.map((tG) => ({
        forProject: tG.projectId,
        tarrifId: tG.tarrifId,
        tarrifName: tG.tarrifName,
        value: tG.id,
        description: tG.tarrifGroupName,
      }));

      const tarrifs = (await DBservice.Tarrifs.getAvailableLinkTarrifs()).rows;
      tarrifOptions = tarrifs.map((t) => ({
        forProject: t.projectId,
        value: t.id,
        description: t.tarrifName,
      }));

      const unlinkTarrifs = (await DBservice.Tarrifs.getAvailableUnLinkTarrifs()).rows;
      unlinkTarrifOptions = unlinkTarrifs.map((t) => ({
        forProject: t.projectId,
        value: t.id,
        description: t.tarrifName,
      }));
    }

    // Update select options for fields in the JSON config
    configJSON.config.actions.attachOrDetachTarrif.fields.tarrif.selectOptions = [
      { value: "", description: "" },
      ...tarrifOptions,
    ];

    configJSON.config.actions.attachOrDetachTarrif.fields.tarrifGroup.selectOptions = [
      { value: "", description: "" },
      ...unlinkTarrifGroupOptions,
    ];

    configJSON.config.actions.changeTariff.fields.tarrif.selectOptions = [
      { value: "", description: "" },
      ...tarrifOptions,
    ];

    configJSON.config.actions.changeTariff.fields.tarrifGroup.selectOptions = [
      { value: "", description: "" },
      ...tarrifGroupOptions,
    ];

    return res.status(200).json(configJSON);
  } catch (e: any) {
    console.log("tarrif actions error", e);
    return res.status(400).json({
      message: e?.message,
    });
  }
});


tarrifsRouter.post( "/viewAllTarrifGroupsTable",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const filters = extractFiltersFromRequest(req);
      const configJSON = deepCopy(viewAllTarrifGroupsTable);
      let tarrifResponse: DBResponse;
      if (tokenObj.accountTypeValue !== "superAdmin") {
        const projectId = tokenObj.projectId;
        const order = configJSON.config.columns.order;
        const excludedProjectOrder = order.filter(
          (fieldId: string) => fieldId !== "project"
        );
        configJSON.config.columns.order = excludedProjectOrder;
        tarrifResponse =
          await DBservice.Tarrifs.getTarrifGroupsByProjectIdWFilters(
            projectId,
            filters
          );
        const selectOptions = configJSON.config.filterConfig.filterType.selectOptions
        const excludedProjectOptions = selectOptions.filter(({ value }: any) => value !== "project")
        configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions
      } else {
        tarrifResponse = await DBservice.Tarrifs.getTarrifGroupsWFilters(
          filters
        );
        let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions
        const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
        const projectSelectOptions = projects.map(project => ({
            value: project.projectId,
            description: project.projectName
        }))
        selectOptions = [...selectOptions, ...projectSelectOptions]
        configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions
      }
      const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects())
        .rows;
      const projectSelectOptions = projects.map((project) => ({
        value: project.projectId,
        description: project.projectName,
      }));
      configJSON.data.rows = tarrifResponse.rows.map((row) => {
        row.tarrifGroup = row.tarrifGroupName;
        row.tarrif = {
          label: row.tarrifName,
          link: `/admin/tarrifs/${encodeURIComponent(row.tarrifId)}`,
        };
        row.project = {
          label:
            projectSelectOptions?.find((p: any) => p.value === row.projectId)
              ?.description ?? "",
          link: `/admin/projects/${encodeURIComponent(row.projectId)}`,
        };
        return row;
      });
      configJSON.data.totalRecords = tarrifResponse.totalRecords;
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

tarrifsRouter.post("/viewAllTarrifsTable",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const configJSON = deepCopy(viewAllTarrifsTable);
      let tarrifResponse: DBResponse;
      const filters = extractFiltersFromRequest(req);
      const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects())
        .rows;
      const projectSelectOptions = projects.map((project) => ({
        value: project.projectId,
        description: project.projectName,
      }));
      if (tokenObj.accountTypeValue !== "superAdmin") {
        const projectId = tokenObj.projectId;
        const order = configJSON.config.columns.order;
        const excludedProjectOrder = order.filter(
          (fieldId: string) => fieldId !== "project"
        );
        configJSON.config.columns.order = excludedProjectOrder;
        tarrifResponse = await DBservice.Tarrifs.getTarrifsByProjectId(
          projectId,
          filters
        );
        const selectOptions = configJSON.config.filterConfig.filterType.selectOptions
        const excludedProjectOptions = selectOptions.filter(({ value }: any) => value !== "project")
        configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions
      } else {

        tarrifResponse = await DBservice.Tarrifs.getTarrifs(filters);
        let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions
        const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
        const projectSelectOptions = projects.map(project => ({
            value: project.projectId,
            description: project.projectName
        }))
        selectOptions = [...selectOptions, ...projectSelectOptions]
        configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions
        
      }
      configJSON.data.rows = tarrifResponse.rows.map((row) => {
        row.tarrifGroup = row.tarrifGroupName;
        row.tarrifName = {
          label: row.tarrifName,
          link: `/admin/tarrifs/${encodeURIComponent(row.id)}`,
        };
        row.project = {
          label: projectSelectOptions.find(
            (p: any) => p.value === row.projectId
          )?.description,
          link: `/admin/projects/${encodeURIComponent(row.projectId)}`,
        };
        //let tarrifType = row.unitOrSlab === "unit" ? "Unit" : "Slab";
        // if (row.containsFixedCharges) {
        //   tarrifType += " + Fixed Charges";
        // }
        //row.tarrifType= row.unitOrSlab;
        row.tarrifType = row.unitOrSlab;
        return row;
      });
      configJSON.data.totalRecords = tarrifResponse.totalRecords;
      return res.status(200).json(configJSON);
    } catch (e: any) {
      console.log(e);
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

tarrifsRouter.post( "/viewAllAttachTableTable",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const configJSON = deepCopy(viewAllAtachTariffHistory);
      let filters = extractFiltersFromRequest(req);
      let AttachResponse: DBResponse;
      if (tokenObj.accountTypeValue !== "superAdmin") {
        const selectOptions = configJSON.config.filterConfig.filterType.selectOptions
        const excludedProjectOptions = selectOptions.filter(({ value }: any) => value !== "project")
        configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions
        filters = {
          ...(filters ?? {}),
          additionalFilters: [
            ...(filters.additionalFilters ?? []),
            {
              trackId: "",
              filterType: "project",
              filterValue: `${tokenObj.projectId}`
            }
          ]
        }
        AttachResponse = await DBservice.Tarrifs.getAllAttachTariff(filters);
      } else {
        let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions
        const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects()).rows
        const projectSelectOptions = projects.map(project => ({
            value: project.projectId,
            description: project.projectName
        }))
        selectOptions = [...selectOptions, ...projectSelectOptions]
        configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions
        AttachResponse = await DBservice.Tarrifs.getAllAttachTariff(filters);
      }
      const projects: ProjectDBDTO[] = (await DBservice.Project.getProjects())
        .rows;
      const projectSelectOptions = projects.map((project) => ({
        value: project.projectId,
        description: project.projectName,
      }));
      configJSON.data.rows = AttachResponse.rows.map((row) => {
        console.log(row,"rowData")
        row.tariff = row.tariff_name;
        // row.attachment = moment(new Date(row.attachment)).format("DD/MM/YYYY hh:mm:ss");
        row.attachment = row.attachment ? moment(new Date(row.attachment)).format("DD/MM/YYYY hh:mm:ss") : null;
        row.project = {
            label: projectSelectOptions.find(
              (p: any) => p.value === row.project_id
            )?.description ?? "",
            link: `/admin/projects/${encodeURIComponent(row.project_id)}`,
          };
        // row.project = {label: projectSelectOptions.find(
        //       (p: any) => p.value === row.project_id
        //     )?.description,
        //     link: `/admin/projects/${encodeURIComponent(row.project_id)}`};
        if (row.is_active == 0) {
          row.status = "In Active"
        } else if (row.is_active == 1) {
          row.status = "Active"
        } else {
          row.status = "Pending"
        }
        row.tariffGroup = row.tg_name;
        return row;

        // return {
        //   tariff: row.tariff_name,
        //   attachment: row.attachment,
        //   project: {
        //     label: projectSelectOptions.find(
        //       (p: any) => p.value === row.project_id
        //     )?.description,
        //     link: `/admin/projects/${encodeURIComponent(row.project_id)}`,
        //   },
        //   status: row.is_active,
        //   tariffGroup: row.tg_name,
        // };

      });
      
      configJSON.data.totalRecords = AttachResponse.totalRecords;
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

tarrifsRouter.post("/viewTarrifDetails",
  async (req: Request, res: Response) => {
    try {
      const tokenObj = parseAuthTokenFromReq(req);
      const configJSON = deepCopy(viewTarrifDetails);
      const tarrifData =
        (await DBservice.Tarrifs.getTarrifById(req.body.id))?.rows?.[0] ?? {};
      
      configJSON.config.actions.viewTarrif.data = deepCopy(tarrifData);
      configJSON.config.actions.duplicateTarrif.data = deepCopy(tarrifData);
      configJSON.config.actions.viewTarrif.data.dGUnitTax1=tarrifData.dgunitTax1;
      configJSON.config.actions.viewTarrif.data.dGUnitTax2=tarrifData.dgunitTax2;
      configJSON.config.actions.viewTarrif.data.dGUnitTax3=tarrifData.dgunitTax3;
      configJSON.config.actions.viewTarrif.data.dGUnitRate=tarrifData.dgunitRate;
      configJSON.config.actions.viewTarrif.data.fixedChargeCalculationType=tarrifData.fixedChargeCalculationType;
      configJSON.config.actions.viewTarrif.data.fixedChargeDeductionTime=tarrifData.fixedChargeDeductionTime;

      if (tarrifData.hasFixedCharges === '0' || tarrifData.hasFixedCharges === 0) {
        configJSON.config.actions.viewTarrif.data.containsFixedCharges = false;
      } else {
        configJSON.config.actions.viewTarrif.data.containsFixedCharges = true;
      }
      //configJSON.config.actions.viewTarrif.data.fixedCharges[0].fixedChargeType =tarrifData.fixedCharges[0].fixedChargeType ;
      if (tokenObj.accountTypeValue === "superAdmin") {
        //let selectOptions =
          //configJSON.config.actions.viewTarrif.fields.project.selectOptions;
        const projects: ProjectDBDTO[] = (await DBservice.Project.getProjectById(tarrifData.projectId))
          .rows;

          configJSON.config.actions.viewTarrif.data.project=projects[0].projectName;
        // const projectSelectOptions = projects.map((project) => ({
        //   value: project.projectId,
        //   description: project.projectName,
        // }));
        // selectOptions = [...selectOptions, ...projectSelectOptions];
        // console.log("dsahgvjhvjs", selectOptions);
        // console.log(
        //   "sbcjbdjbjbjbkbkk",
        //   configJSON.config.actions.viewTarrif.fields.project.selectOptions
        // );
        // configJSON.config.actions.viewTarrif.fields.project.selectOptions =
        //   selectOptions;
        // configJSON.config.actions.duplicateTarrif.fields.project.selectOptions =
        //   selectOptions;
      } else {
        const order = configJSON.config.actions.viewTarrif.fields.order;
        const excludedProjectOrder = order.filter(
          (fieldId: string) => fieldId !== "project"
        );
        configJSON.config.actions.viewTarrif.fields.order =
          excludedProjectOrder;
        configJSON.config.actions.duplicateTarrif.fields.order =
          excludedProjectOrder;

        const fieldsOrder = configJSON.config.fields.order;
        const excludedFieldsProjectOrder = fieldsOrder.filter(
          (fieldId: string) => fieldId !== "project"
        );
        console.log("wejasdubwjhvfuywhjasv", excludedFieldsProjectOrder);
        configJSON.config.fields.order = excludedFieldsProjectOrder;
      }
      let tarrifType = tarrifData?.unitOrSlab === "unit" ? "Unit" : "Slab";
      console.log("fixe Charge",tarrifType)
      if (tarrifData.containsFixedCharges) {
        tarrifType += " + Fixed Charges";
      }
      //configJSON.config.actions.viewTarrif.slabFields.data.dGUnitTax1=tarrifData?.dgunitTax1;
      const projects: ProjectDBDTO[] = (await DBservice.Project.getProjectById(tarrifData.projectId))
          .rows;

          console.log("hgdsvhjcs",projects[0].projectName);
          //configJSON.config.actions.viewTarrif.data.project=projects[0].projectName;
      configJSON.data = {
        name: tarrifData?.tarrifName ?? "NO-DATA",
        tarrifType,
        tarrifGroup: tarrifData?.tarrifGroupName ?? "NO-DATA",
        project: projects[0].projectName,
      };
      return res.status(200).json(configJSON);
    } catch (e: any) {
      console.log("----", e)
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
export default tarrifsRouter;
