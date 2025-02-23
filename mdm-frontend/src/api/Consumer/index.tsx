import { config } from "src/config";
import { axiosInstance } from "..";
const { runMode } = config

export type CreateConsumerRequestDTO = {
    consumerFirstName: string,
    consumerLastName: string,
    address?: string,
    connectionNo?: string,
    panNo?: string,
    gstNo?: string,
    towerNo?: string,
    flatNo?: string,
    shopNo?: string,
    mobileNo: string,
    emailId?: string,
    // totalLoadGrid?: string,
    // gridLoadR?: string,
    // gridLoadY?: string,
    // gridLoadB?: string,
    // totalLoadDG?: string,
    // DGLoadR?: string,
    // DGLoadY?: string,
    // DGLoadB?: string,
    installationDate?: string,
    openingBalance?: string,
    consumptionReadingGrid?: string,
    // consumptionReadingDG?: string,
    area?: string,
    flatType?: string,
    project?: string
}

export type EditConsumerRequestDTO = {
    consumerFirstName: string,
    consumerLastName: string,
    address?: string,
    connectionNo?: string,
    panNo?: string,
    gstNo?: string,
    towerNo?: string,
    flatNo?: string,
    shopNo?: string,
    mobileNo: string,
    emailId?: string,
    totalLoadGrid?: string,
    gridLoadR?: string,
    gridLoadY?: string,
    gridLoadB?: string,
    totalLoadDG?: string,
    DGLoadR?: string,
    DGLoadY?: string,
    DGLoadB?: string,
    installationDate?: string,
    openingBalance?: string,
    consumptionReadingGrid?: string,
    consumptionReadingDG?: string,
    area?: string,
    flatType?: string,
    project?: string
}

export type AddTarrifGroupRequestDTO = {
    tarrifGroupName: string;
    tarrifGroupDescription: string;
    project?: string;
}

type Slab = {
    slabLimit: string;
    slabRate: string;
}

export type CreateTarrifRequestDTO = {
    tarrifName: string;
    unitOrSlab: string;
    slabs: Slab[]
}

export const createConsumer = (params: CreateConsumerRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const randomSignal =  Math.floor(Math.random() * 10)
                    if (randomSignal <= 5) {
                        resolve({})
                    } else {
                        reject(new Error("Consumer Already Exists"))
                    }
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 1500)
        })
    }
    return axiosInstance().post("/createConsumer", params)
}

export const editConsumer = (params: EditConsumerRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const randomSignal =  Math.floor(Math.random() * 10)
                    if (randomSignal <= 5) {
                        resolve({})
                    } else {
                        reject(new Error("Consumer Already Exists"))
                    }
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 1500)
        })
    }
    return axiosInstance().post("/editConsumer", params)
}

export const createTarrif = (params: CreateTarrifRequestDTO) => {
    console.log(params)
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const randomSignal =  Math.floor(Math.random() * 10)
                    if (randomSignal <= 5) {
                        resolve({})
                    } else {
                        reject(new Error("Tarrif Group Already Exists"))
                    }
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 1500)
        })
    }
    return axiosInstance().post("/addTarrif", params)
}

export const editTarrif = (params: CreateTarrifRequestDTO) => {
    console.log(params)
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const randomSignal =  Math.floor(Math.random() * 10)
                    if (randomSignal <= 5) {
                        resolve({})
                    } else {
                        reject(new Error("Tarrif Group Already Exists"))
                    }
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 1500)
        })
    }
    return axiosInstance().post("/addTarrif", params)
}
