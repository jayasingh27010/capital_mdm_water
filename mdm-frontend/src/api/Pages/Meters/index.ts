import { config } from "src/config"
import { axiosInstance } from "src/api"
import { viewAllMetersTableMock, viewMeterActionsMock, viewMeterDetailsMock, viewMeterDynamicParamsMock, viewMeterFinancialPrevMonthMock, viewMeterFinancialThisMonthMock, viewMetersBulkUploadMock, viewMetersBulkUploadResultMock, viewMetersPushDataTableMock } from "src/mock/Pages/Meters"
const { runMode } = config

export const viewMeterActions = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterActionsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMeterActions")
}

export const viewMetersBulkUpload = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMetersBulkUploadMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMetersBulkUpload") 
}

export const viewMetersBulkUploadResult = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMetersBulkUploadResultMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMetersBulkUploadResult",filters) 
}

export const viewAllMetersTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewAllMetersTableMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewAllMetersTable", filters)
}

export const viewMeterDetails = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterDetailsMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMeterDetails", { id })
}

export const viewMeterDynamicParams = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterDynamicParamsMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMeterDynamicParams", { id })
}

export const viewMeterFinancialPrevMonth = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterFinancialPrevMonthMock(id)
                resolve(response)
            }, 1500)
        })
    }
    console.log("viewMeterFinancialPrevMonth")
    return axiosInstance().post("/viewMeterFinancialPrevMonth", { id })
}

export const viewMeterFinancialThisMonth = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMeterFinancialThisMonthMock(id)
                resolve(response)
            }, 1500)
        })
    }
    console.log("viewMeterFinancialThisMonth",id)
    return axiosInstance().post("/viewMeterFinancialThisMonth", { id })
}

export const viewMetersPushDataTable = ({id, filters}: any) => {
    const getAll = Boolean(filters?.getAll)
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewMetersPushDataTableMock(id, filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMetersPushDataTable", {id, filters, getAll})
}