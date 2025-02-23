import dotenv from "dotenv"
import MockGateways from "../MockDBData/gateways"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse, DBStatResponse } from "../types";
import { FilterInfo } from "../../../utilities/types";
import { DBRawResponse } from "../../../mockUtilities/types";
import { getPaginatedResponse } from "../../../mockUtilities";
import { GatewaysDBDTO } from "./types";

dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"

export default {
    createGateway: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            console.log(payload)
            return makeCall("POST", "/gateway/create_gateway", payload)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Gateway successfully added"
            })
        })
    },
    editGateway: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            console.log(payload)
            return makeCall("POST", "/gateway/edit_gateway", payload)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Gateway edited sucessfully"
            })
        })
    },
    getGateways: (filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/gateway/get_all_gateways", filters)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockGateways)
            resolve(getPaginatedResponse(rawResponse, filters))
        })
    },
    getGatewayStats: (): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/gateway/get_gateway_stats", {})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                totalGateways: "50",
                liveGateways: "25"
            })
        })
    },
    getGatewayStatsByProjectId: (projectId: string): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/gateway/get_gateway_stats_by_project_id", {projectId})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                totalGateways: "5",
                liveGateways: "3"
            })
        })
    },
    getGatewaysByProjectId: (projectId: string, filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            filters = {
                ...(filters ?? {}),
                additionalFilters: [
                    ...(filters?.additionalFilters ?? []),
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: `${projectId}`
                    }
                ]
            }
            return makeCall("POST", "/gateway/get_all_gateways", {projectId, ...filters})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockGateways)
            const projectMeters: GatewaysDBDTO[] = rawResponse.rows.filter(row => row.projectId === projectId)
            resolve(getPaginatedResponse({
                rows: projectMeters
            }, filters))
        })
    }
}