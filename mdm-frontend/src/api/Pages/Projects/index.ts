import { config } from "src/config"
import { axiosInstance } from "src/api"
import { viewAllProjectsTableMock, viewProjectActionsMock, viewProjectDetailsMock, viewProjectMetersTableMock } from "src/mock/Pages/Projects"
const { runMode } = config

export const viewProjectActions = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewProjectActionsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewProjectActions")
}

export const viewAllProjectsTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewAllProjectsTableMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewAllProjectsTable", filters)
}

export const viewProjectDetails = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewProjectDetailsMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewProjectDetails", { id })
}

export const viewProjectMetersTable = ({id, filters}: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewProjectMetersTableMock(id, filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewProjectMetersTable", {id, filters})
}