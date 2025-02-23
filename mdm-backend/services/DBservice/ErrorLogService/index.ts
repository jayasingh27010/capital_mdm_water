import dotenv from "dotenv"
import MockAuditLogs from "../MockDBData/auditLogs"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse } from "../types";
import { FilterInfo } from "../../../utilities/types";
import { DBRawResponse } from "../../../mockUtilities/types";
import { getPaginatedResponse } from "../../../mockUtilities";

dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"



export default {
    getErrorLogs: (filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/error_log/get_all_error_log", filters)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockAuditLogs)
            resolve(getPaginatedResponse(rawResponse, filters))
        })
    },
}