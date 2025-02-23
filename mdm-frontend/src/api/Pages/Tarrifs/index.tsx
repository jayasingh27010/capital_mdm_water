import { config } from "src/config"
import { axiosInstance } from "src/api"
import { viewAllTarrifGroupsTableMock, viewAllTarrifsTableMock, viewTarrifActionsMock, viewTarrifDetailsMock } from "src/mock/Pages/Tarrifs"
const { runMode } = config

export const viewAllTarrifsTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewAllTarrifsTableMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewAllTarrifsTable", filters)
}


export const viewAllTarrifGroupsTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewAllTarrifGroupsTableMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewAllTarrifGroupsTable", filters)
}

export const viewAllAttachTableTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewAllTarrifGroupsTableMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewAllAttachTableTable", filters)
}

export const viewTarrifActions = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewTarrifActionsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewTarrifActions")
}

export const viewTarrifDetails = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewTarrifDetailsMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewTarrifDetails", { id })
}

export const attachOrDetachTarrif = (params: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({})
            }, 1500)
        })
    }
    return axiosInstance().post("/changeTariff", { ...params })
}

export const createTarrif = (params: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({})
            }, 1500)
        })
    }
    return axiosInstance().post("/createTarrif", { ...params })
}

export const createTarrifGroup = (params: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({})
            }, 1500)
        })
    }
    return axiosInstance().post("/createTarrifGroup", { ...params })
}

export const changeTarriff = (params: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({})
            }, 1500)
        })
    }
    console.log("ssghagvxgsdh",params)
    return axiosInstance().post("/changeTariff", { ...params })
}