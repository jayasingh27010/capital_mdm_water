import dotenv from "dotenv"
import { FilterInfo } from "../../../utilities/types";
import { DBResponse, DBStatResponse } from "../types";
import { deepCopy, makeCall } from "../../../utilities"
import { getPaginatedResponse } from "../../../mockUtilities";

dotenv.config();

const RUN_MODE = process.env.RUN_MODE || "dev"

export default {

    createManualRecharge: async (payload:any): Promise<DBStatResponse> => {
        return makeCall("POST", "/payment_recharge/create_manual_recharge", payload)
    },

    createCreditNote: async (payload:any): Promise<DBStatResponse> => {
        return makeCall("POST", "/payment_recharge/create_credit_note", payload)
    },

    createDebitNote: async (payload:any): Promise<DBStatResponse> => {
        return makeCall("POST", "/payment_recharge/create_debit_note", payload)
    },

    getAllManualRechargeList: async (filters: FilterInfo): Promise<DBResponse> => {
        return makeCall("POST", "/payment_recharge/get_all_manual_recharge", filters)
    },

    getAllCreditNoteList: async (filters: FilterInfo): Promise<DBResponse> => {
        return makeCall("POST", "/payment_recharge/get_all_credit_note", filters)
    },

    getAllDebitNoteList: async (filters: FilterInfo): Promise<DBResponse> => {
        return makeCall("POST", "/payment_recharge/get_all_debit_note", filters)
    },

    getAllPaymentRechargeList: async (consumerId: any, filters: any): Promise<DBResponse> => {
        return makeCall("POST", "/payment_recharge/get_all_meter_recharge", {consumerId, ...filters})
    },

    getMeterSerialNoByConsumerId: async (consumerId:any): Promise<DBResponse> => {
        return makeCall("POST", "/meter/getMeter_available_balance_by_consumer_id",{consumerId})
    },

    // getManuaRechargeWithFilters: async (filters: FilterInfo): Promise<DBResponse> => {
    //     if (RUN_MODE == "dev") {
    //         filters.perPage = 1000
    //         filters.currPage = 0
    //         console.log(filters)
    //         return makeCall("POST","/tariff_group/get_tariff_group_with_filters", filters);
    //     }
    //     return new Promise((resolve) => {
    //         //logic inside can be implemented within a stored procedure
    //         const manualRecharge = deepCopy()
    //         resolve(getPaginatedResponse({
    //             rows: manualRecharge.rows
    //         }, filters))
    //     })
    // }
}