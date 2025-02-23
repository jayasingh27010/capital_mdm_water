import dotenv from "dotenv"
import MockGateways from "../MockDBData/gateways"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse, DBStatResponse } from "../types";
import { FilterInfo } from "../../../utilities/types";
import { DBRawResponse } from "../../../mockUtilities/types";
import { getPaginatedResponse } from "../../../mockUtilities";


dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"

export default {
    addRequests: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            console.log(payload)
            return makeCall("POST", "/devConfig/addRequests", payload)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Requests Added Succesfully"
            })
        })
    },
    getMeterActionRequests: (filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/devConfig/getAllRequests", filters)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockGateways)
            resolve(getPaginatedResponse(rawResponse, filters))
        })
    },
}