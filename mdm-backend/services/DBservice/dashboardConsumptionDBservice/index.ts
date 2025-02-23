import dotenv from "dotenv"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse, DBStatResponse, DBConsResponse } from "../types";



dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"

export default {

    getDashboardMeterConsumptionGraph: (user_id: string, year: string, requestType: string): Promise<DBConsResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/dashboard/get_consumer_consumption_graph_by_consumer_id_daily", { user_id,year,requestType })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        return new Promise((resolve) => {
         

          });

        
    },
    getDashboardMeterConsumptionGraphweekly: (user_id: string, month: string, requestType: string): Promise<DBConsResponse> => {            
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/dashboard/get_consumer_consumption_graph_by_consumer_id_daily", { user_id,month,requestType })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        return new Promise((resolve) => {
         

          });

        
    },

    getDashboardMeterConsumptionGraphDaily: (user_id: string, startDate: string, endDate: string, requestType: string): Promise<DBConsResponse> => {            
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/dashboard/get_consumer_consumption_graph_by_consumer_id_daily", { user_id,startDate,endDate,requestType })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        return new Promise((resolve) => {
         

          });

        
    },



    
}