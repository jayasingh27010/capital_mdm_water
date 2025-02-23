import { axiosInstance } from "src/api"
import { config } from "src/config"
const { runMode } = config
import {MeterValueResponse} from "src/pages/AdminPages/MeterRecharge/Widgets/MeterRechargeActions/MeterValueResponse"

export const viewManualRechargeData = () => {

    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewManualRechargeData()
                resolve(response)
            }, 1500)
        })
    }
    console.log("manual recharge data hjdvsjh")
    return axiosInstance().post("/viewManualChargeActions")
    //return axiosInstance().post("/viewManualChargeActions",{})

}

export const viewAllManualRechargeTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewManualRechargeData()
                resolve(response)
            }, 1500)
        })
    }
    console.log("manual recharge")
    return axiosInstance().post("/viewAllManualRechargeTable",filters)
}

export const viewAllDebitNoteTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewManualRechargeData()
                resolve(response)
            }, 1500)
        })
    }
    console.log("credit note")
    return axiosInstance().post("/viewAllDebitNoteTable", filters)
}

export const viewAllCreditNoteTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewManualRechargeData()
                resolve(response)
            }, 1500)
        })
    }
    console.log("debit note")
    return axiosInstance().post("/viewAllCreditNoteTable", filters)
}

export const getMeterSerialNo =async (consumerId:string):Promise<MeterValueResponse> => {

    // if (runMode === 'dev') {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             const response = viewManualRechargeData()
    //             resolve(response)
    //         }, 1500)
    //     })
    // }
    const response = await axiosInstance().post<MeterValueResponse>("/getMeterSerialNoByConsumerId", { consumerId });
    return response.data;
}