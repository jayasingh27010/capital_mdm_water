import dotenv from "dotenv"
import MockProjects from "../MockDBData/projects"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse, DBStatResponse } from "../types";
import { FilterInfo } from "../../../utilities/types";
import { DBRawResponse } from "../../../mockUtilities/types";
import { getPaginatedResponse } from "../../../mockUtilities";
import { ProjectDBDTO } from "./types";
import { DBConsResponse } from "../types";

dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"


export default {
    createProject: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/project/create_project", payload)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Project successfully added"
            })
        })
    },
    editProject: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/project/edit_project", {...payload, projectId: payload.id})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Project successfully edited"
            })
        })
    },
    deleteProject: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return new Promise((_, reject) => {
                reject(new Error("Not Implemented"))
            })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Project successfully deleted"
            })
        })
    },
    disableProject: (payload: any): Promise<DBStatResponse> => {
        console.log(payload)
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/project/disable_project", {projectId: payload.id})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Project successfully disabled"
            })
        })
    },
    enableProject: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/project/enable_project", {projectId: payload.id})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Project successfully enabled"
            })
        })
    },
    getProjects: async (): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/project/get_all_project", {})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                totalRecords: deepCopy(MockProjects).rows.length,
                rows: deepCopy(MockProjects).rows
            })
        })
    },
    getProjectById: async (projectId: string): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/project/get_project_by_id", {projectId})
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const projects: ProjectDBDTO[] = deepCopy(MockProjects).rows
            const foundProject = projects.find(project => project.projectId === projectId)
            if (foundProject) {
                resolve({
                    rows: [foundProject],
                    totalRecords: 1
                })
            } else {
                resolve({
                    rows: [],
                    totalRecords: 0
                })
            }
        })
        
    },
    getProjectsStats: (): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/project/get_project_stats", {})
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                totalProjects: "10",
                liveProjects: "5"
            })
        })
    },
    getProjectsWFilters: async(filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/project/get_project_with_filter", filters)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = { rows: deepCopy(MockProjects).rows }
            resolve(getPaginatedResponse(rawResponse, filters))
        })
    },
    getProjectMeterConsumptionGraph: (user_id:string, projectId: string, year: string, requestType: string): Promise<DBConsResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/project/get_project_consumption_graph_by_project_id", {user_id, projectId,year,requestType })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        return new Promise((resolve) => {
         

          });

        
    },
    getProjectMeterConsumptionGraphweekly: ( user_id: string, projectId: string, month: string, requestType: string): Promise<DBConsResponse> => {            
        if (RUN_MODE != "dev") {projectId
            return makeCall("POST", "/project/get_project_consumption_graph_by_project_id", { user_id, projectId,month,requestType })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        return new Promise((resolve) => {
         

          });

        
    },

    getProjectMeterConsumptionGraphDaily: (user_id: string,projectId: string, startDate: string, endDate: string, requestType: string): Promise<DBConsResponse> => {   
        console.log(user_id,"user_iduser_iduser_id")         
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/project/get_project_consumption_graph_by_project_id", {user_id, projectId,startDate,endDate,requestType })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        return new Promise((resolve) => {
         

          });

        
    },
}