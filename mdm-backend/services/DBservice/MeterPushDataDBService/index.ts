import dotenv from "dotenv"
import MockMetersPushData from "../MockDBData/meterPushData"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse } from "../types";
import { FilterInfo } from "../../../utilities/types";
import { DBRawResponse } from "../../../mockUtilities/types";
import { getPaginatedResponse } from "../../../mockUtilities";
import { MeterPushDataDBDTO } from "./types";

dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"
export default {
    getMeterPushData: (meterId: string, filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            console.log("filters before sending", filters)
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const rawResponse: DBRawResponse = deepCopy(MockMetersPushData)
            //     console.log(rawResponse.rows)
            //     console.log("meterId in meterPushData", meterId,`000${meterId}`)
            //     const rows: MeterPushDataDBDTO[] = rawResponse.rows.filter(row => row.meterSerialNo === `CPS-000${meterId}`)
            //     resolve(getPaginatedResponse({
            //         rows
            //     }, filters))
            // })
            return makeCall("POST", "/meter_consumption_data/get_push_data", { meterId, ...filters })

            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockMetersPushData)
            const rows: MeterPushDataDBDTO[] = rawResponse.rows.filter(row => row.meterId === meterId)
            resolve(getPaginatedResponse({
                rows
            }, filters))
        })
    },
    getMeterPushDataByProjectId: (meterId: string, projectId: string, filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            console.log("filters before sending", filters)
            return makeCall("POST", "/meter_consumption_data/get_push_data", { meterId, ...filters })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockMetersPushData)
            const projectMeters: MeterPushDataDBDTO[] = rawResponse
                .rows
                .filter(row => row.projectId === projectId && row.meterId === meterId)
            resolve(getPaginatedResponse({
                rows: projectMeters
            }, filters))
        })
    }
}