import { config } from "src/config";
import { axiosInstance } from "..";
const { runMode } = config

export type CreateMeterRequestDTO = {
    serialNo: string,
    meterType: string,
    phaseType: string,
    consumptionType: string,
    sourceType: string,
    encryptionKey:string
}

export const createMeter = (params: CreateMeterRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const randomSignal =  Math.floor(Math.random() * 10)
                    if (randomSignal <= 5) {
                        resolve({})
                    } else {
                        reject(new Error("Meter Already Exists"))
                    }
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 1500)
        })
    }
    return axiosInstance().post("/createMeter", params)
}
export type EditMeterRequestDTO = {
    id: string,
    serialNo: string,
    meterType: string,
    phaseType: string,
    consumptionType: string,
    sourceType: string,
    encryptionKey: string
}

export const editMeter = (params: EditMeterRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const randomSignal =  Math.floor(Math.random() * 10)
                    if (randomSignal <= 5) {
                        resolve({})
                    } else {
                        reject(new Error("Some Error Occured"))
                    }
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 1500)
        })
    }
    return axiosInstance().post("/editMeter", params)
}