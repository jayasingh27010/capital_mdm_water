import { axiosInstance } from "src/api"
import { config } from "src/config"
import { viewAllConsumersTableMock, viewConsumerActionsMock, viewConsumerDetailsMock, viewConsumersBulkUploadMock, viewConsumersBulkUploadResultMock, viewMeterCurrentConsumptionMock, viewMeterRechargesTableMock, viewMeterSanctionedLoadMock, viewMeterStatsMock } from "src/mock/Pages/Consumers"
const { runMode } = config


export const viewConsumerActions = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewConsumerActionsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewConsumerActions")
}

export const viewConsumersBulkUpload = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewConsumersBulkUploadMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewConsumersBulkUpload")
}

export const viewConsumersBulkUploadResult = (filters: any) => {
    if (runMode === 'dev') {
        new Promise((resolve) => {
            setTimeout(() => {
                const response = viewConsumersBulkUploadResultMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewConsumersBulkUploadResult",filters) 
}

export const viewAllConsumersTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewAllConsumersTableMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewAllConsumersTable", filters)
}

export const viewConsumerDetails = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewConsumerDetailsMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewConsumerDetails", { id })
}

export const enableConsumer = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewConsumerDetailsMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/enableConsumer", { id })
}

export const disableConsumer = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewConsumerDetailsMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/disableConsumer", { id })
}

export const resetPasswordConsumer = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve({})
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 1500)
        })
    }
    return axiosInstance().post("/reset_Password_consumer", id)
}

type AttachTarrifGroupParams = {
    tarrifGroup: string
}

export const attachTarrifGroup = (params: AttachTarrifGroupParams) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({})
            }, 1500)
        })
    }
    return axiosInstance().post("/attachTarrifGroup", { ...params })
}

type AttachTarrifParams = {
    tarrif: string
}
type consumptionGraphParams = {
    year: string;
    consumerId: string;
    filter: string
}

type consumptionGraphMonthly = {
    month: string;
    consumerId: string;
    filter: string
}

type consumptionGraphDaily = {
    consumerId: string;
    startDate: string;
    endDate: string;
    filter: string
}
export const attachTarrif = (params: AttachTarrifParams) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({})
            }, 1500)
        })
    }
    return axiosInstance().post("/attachTarrif", { ...params })
}

export const viewMeterStats = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterStatsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMeterStats", { id })
}

export const viewMeterSanctionedLoad = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterSanctionedLoadMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMeterSanctionedLoad", { id })
}

// viewMeterCurrentConsumptionMock

export const viewMeterCurrentConsumption = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterCurrentConsumptionMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMeterCurrentConsumption", { id })
}

export const viewMeterCurrentMonthConsumption = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterCurrentConsumptionMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMeterCurrentMonthConsumption", { id })
}

export const viewMeterRechargesTable = ({id, filters}: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterRechargesTableMock(id, filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMeterRechargesTable", {id, filters})
}

export const getMeterConsumptionGraph = (params: consumptionGraphParams) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterCurrentConsumptionMock(params)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/meterConsumptionWeekly", { ...params })
}

export const getMeterConsumptionGraphMonthly = (params: consumptionGraphMonthly) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterCurrentConsumptionMock(params)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/meterConsumptionMonthly", { ...params })
}

export const getMeterConsumptionGraphDaily = (params: consumptionGraphDaily) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterCurrentConsumptionMock(params)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/meterConsumptionDaily", { ...params })
}



