import dotenv from "dotenv"
import MockMeters from "../MockDBData/meters"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse } from "../types";
import { FilterInfo } from "../../../utilities/types";
import { DBRawResponse } from "../../../mockUtilities/types";
import { getPaginatedResponse } from "../../../mockUtilities";


dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"

export default {
    getConsumptionGraphData: (filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/get_consumer_consumption_graph_by_consumer_id", filters)
        }
        return new Promise((resolve) => {
            const rawResponse: DBRawResponse = deepCopy(MockMeters)
            resolve(getPaginatedResponse(rawResponse, filters))
        })
    },
}