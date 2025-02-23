import { axiosInstance } from "src/api"


export const viewDevConfigActions = () => {
    return axiosInstance().post("/viewDevConfigActions", {})
}
export const viewAllMetersTableForDeviceConfig = (filters: any) => {
    return axiosInstance().post("/viewAllMetersTableForDeviceConfig", filters)
}

export const setMeterActions = (params: any) => {
    return axiosInstance().post("/setMeterActions", params)
}

export const viewAllDeviceConfigRequestsTable = (params: any) => {
    return axiosInstance().post("/viewAllDeviceConfigRequestsTable", params)
}