import dotenv from "dotenv"
import MockAuditLogs from "../MockDBData/auditLogs"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse, DBStatResponse } from "../types";
import { FilterInfo } from "../../../utilities/types";
import { DBRawResponse } from "../../../mockUtilities/types";
import { getPaginatedResponse } from "../../../mockUtilities";
import { AuditLogDBDTO, LogInfoObj } from "./types";

dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"



export default {
    log: (obj: LogInfoObj): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/auditLog/create_audit_log", obj)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Successfully logged"
            })
        })
    },
    getAuditLogs: (filters: any): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/auditLog/get_all_audit_log", filters)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockAuditLogs)
            resolve(getPaginatedResponse(rawResponse, filters))
        })
    },
    getAuditLogsByUserId: (userId: string, filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/auditLog/get_audit_log_by_user_id", {userId, ...filters})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockAuditLogs)
            const userAuditLogs: AuditLogDBDTO[] = rawResponse.rows.filter(row => row.userId === userId)
            resolve(getPaginatedResponse({
                rows: userAuditLogs
            }, filters))
        })
    }
}