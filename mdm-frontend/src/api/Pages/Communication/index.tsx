import { axiosInstance } from "src/api"


export const viewCommunicationActions = () => {
    return axiosInstance().post("/viewCommunicationActions", {})
}
export const viewSendSms = () => {
    return axiosInstance().post("/viewSendSms", {})
}
export const viewAllUsersTableForCommunication = (filters: any) => {
    return axiosInstance().post("/viewAllUsersTableForCommunication", filters)
}

// export const viewAllDeviceConfigRequestsTable = (params: any) => {
//     return axiosInstance().post("/viewAllCommunicationTable", params)
// }