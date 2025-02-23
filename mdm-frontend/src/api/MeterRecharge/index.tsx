import { axiosInstance } from "src/api"


export type CreateManualRechargetDTO = {
    
    consumer: string,
    method: string,
    checqueNo: string,
    consumptionType: string,
    checqueDate: string,
    bankName: string,
    amount: number,
    availableBalance: number,
    comments: string,
    vendingCode: string,
}



export const createManualRecharge = (params: CreateManualRechargetDTO) => {

    // if (runMode === 'dev') {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             const response = viewManualRechargeData()
    //             resolve(response)
    //         }, 1500)
    //     })
    // }
    console.log("react controller level",params)
    return axiosInstance().post("/createManualRechargeActions",params)

}

export const createCreditNote = (params: CreateManualRechargetDTO) => {

    // if (runMode === 'dev') {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             const response = viewManualRechargeData()
    //             resolve(response)
    //         }, 1500)
    //     })
    // }
    console.log("react credit controller level",params)
    return axiosInstance().post("/createCreditNoteActions",params)

}

export const createDebitNote = (params: CreateManualRechargetDTO) => {

    // if (runMode === 'dev') {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             const response = viewManualRechargeData()
    //             resolve(response)
    //         }, 1500)
    //     })
    // }

    return axiosInstance().post("/createDebitNoteActions",params)

}