import dotenv from "dotenv"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse, DBStatResponse } from "../types";
import ServiceStatus from "../../../configs/ServiceStatus/ServiceStatus";

dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"

export default {

    getServiceStatus : async (): Promise<DBResponse> => {

        if (RUN_MODE != "dev") {
            return makeCall("POST", "/test/service-status",{})
        }
    
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
    
            
            const rawResponse: DBResponse = deepCopy(ServiceStatus)
            resolve({
                rows: rawResponse.rows,
                totalRecords: rawResponse.totalRecords
            })
        })
    
    }
}
