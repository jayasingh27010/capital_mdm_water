import dotenv from "dotenv"
import { DBStatResponse } from "../types"
import { makeCall } from "../../../utilities";

dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"

export default {
    getFinancials: (): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/financial/get_financials", {})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                "openingBalance": "₹2.5L",
                "currentBalance": "₹2L"
            })
        })
    },
    getProjectFinancials: (projectId: string): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/financial/get_financials_by_project_id", {projectId})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                "openingBalance": "₹30,000",
                "currentBalance": "₹20,000"
            })
        })
    },
    getPrevMonthFinancials: (meterId: string): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/financial/get_prev_month_financials_by_meter_id", {meterId})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                "openingBalance": "₹5,000",
                "currentBalance": "₹2,000"
            })
        })
    },
    getThisMonthFinancials: (meterId: string): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/financial/get_this_month_financials_by_meter_id", {meterId})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                "openingBalance": "₹5,000",
                "currentBalance": "₹2,000"
            })
        })
    },
}