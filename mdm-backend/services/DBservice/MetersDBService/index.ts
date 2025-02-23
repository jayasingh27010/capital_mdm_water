import dotenv from "dotenv"
import MockMeters from "../MockDBData/meters"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse, DBStatResponse } from "../types";
import { FilterInfo } from "../../../utilities/types";
import { DBRawResponse } from "../../../mockUtilities/types";
import { getPaginatedResponse } from "../../../mockUtilities";
import { MeterDBDTO } from "./types";

dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"

export default {
    receivedMeters: (payload:any): Promise<DBStatResponse> =>{
        if (RUN_MODE !="dev") {
            console.log("payload before sending ", payload)
            return makeCall("POST", "/meter/bulk_create_meter", { meters: payload })
            // return new Promise((resolve) => {
            //     resolve({
            //         message: "Meters Received",
            //         totalErrRecs: 0
                    
            //     })
            // })
        }
        
        return new Promise((resolve) => {
          resolve({
            message: "Meters Received",
            totalErrRecs: "2"
          })
        })
      },
    createMeter: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/meter/create_meter", payload)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Meter successfully added"
            })
        })
    },
    editMeter: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            console.log(payload)
            return makeCall("POST", "/meter/edit_meter", payload)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Meter successfully edited"
            })
        })
    },
    getMeters: (filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/meter/get_all_meters", filters)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockMeters)
            resolve(getPaginatedResponse(rawResponse, filters))
        })
    },
    getMetersForDropDown: (filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/meter/get_all_meters_dropdown", filters)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockMeters)
            resolve(getPaginatedResponse(rawResponse, filters))
        })
    },
    getMeterById: (meterId: string): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/meter/get_meters_by_id", { meterId, perPage: 1, currPage: 1 })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockMeters)
            const meter = rawResponse.rows.find(meter => meter.meterId === meterId)
            if (meter) {
                resolve({ rows: [meter], totalRecords: 1 })
            } else {
                resolve({ rows: [], totalRecords: 0 })
            }
        })
    },
    getMetersStats: (): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/meter/get_meter_stats", {})
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            // const rawResponse: DBRawResponse = deepCopy(MockMeters)
            // const projectMeters: MeterDBDTO[] = rawResponse.rows.filter(row => row.projectId === projectId)
            resolve({
                down: "2",
                lowBalance: "3",
                overloaded: "2",
                relayOff: "2",
                total: "200",
                unalloted: "100",
                unstate: "2"
            })
        })
    },
    getMetersStatsByProjectId: (projectId: string): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/meter/get_meter_stats_by_project_id", {
                projectId
            })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            // const rawResponse: DBRawResponse = deepCopy(MockMeters)
            // const projectMeters: MeterDBDTO[] = rawResponse.rows.filter(row => row.projectId === projectId)
            resolve({
                down: "2",
                lowBalance: "3",
                overloaded: "2",
                relayOff: "2",
                total: "20",
                unalloted: "10",
                unstate: "2"
            })
        })
    },
    getMetersByProjectId: (projectId: string, filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            // /meter/get_meters_by_project_by_id
            return makeCall("POST", "/meter/get_meters_by_project_by_id", { projectId, ...filters })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockMeters)
            const projectMeters: MeterDBDTO[] = rawResponse.rows.filter(row => row.projectId === projectId)
            resolve(getPaginatedResponse({
                rows: projectMeters
            }, filters))
        })
    },
    getMeterDynamicParamsStats: (meterId: string): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            // return makeCall("POST", "/meter/get_dynamic_params", {meterId})
            return makeCall("POST", "/meter/get_meters_by_id", { meterId, perPage: 1, currPage: 1 })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                rows: [],
                totalRecords: 0
            })
            // resolve({
            //     "relay": "ONN",
            //     "meterHealth": "EXCELLENT"
            // })
        })
    },
}