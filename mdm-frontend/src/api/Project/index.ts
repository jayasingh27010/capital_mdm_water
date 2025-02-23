import { config } from "src/config";
import { axiosInstance } from "..";
import { viewProjectDetailsMock, viewProjectGatewaysMock, viewProjectMetersMock, viewProjectMetersTableMock } from "src/mock/Pages/Projects";
import { mockProjectGraph } from "src/mock/ProjectGraph";
const { runMode } = config


export type GetUserRequestDTO = {}


type consumptionGraphParamsMonthly = {
    year: string;
    userId:string;
    projectId: string;
    filter: string;
}

type consumptionGraphWeekly = {
    month: string;
    userId:string;
    projectId: string;
    filter: string
}

type consumptionGraphDaily = {
     userId:string;
    projectId: string;
    startDate: string;
    endDate: string;
    filter: string
}

export const getProject = (params: GetUserRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const response = {
                        id: "admin",
                        accountType: "Super Admin",
                        username: "admin",
                        firstName: "Diganta",
                        lastName: "Ray"
                    }
                    resolve(response)
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 0)
        })
    }
    return axiosInstance().post("/getProject", params)
}

export type CreateProjectRequestDTO = {
    projectName: string,
    projectAddress: string,
    projectCode: string,
    billingType: string
}

export const createProject = (params: CreateProjectRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const randomSignal =  Math.floor(Math.random() * 10)
                    if (randomSignal <= 5) {
                        resolve({})
                    } else {
                        reject(new Error("Project Already Exists"))
                    }
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 1500)
        })
    }
    return axiosInstance().post("/createProject", params)
}

export type EditProjectRequestDTO = {
    id: string
    projectName: string,
    projectAddress: string,
    projectCode: string,
    billingType: string
}

export const editProject = (params: EditProjectRequestDTO) => {
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
    return axiosInstance().post("/editProject", params)
}

export type DisableProjectRequestDTO = {
    id: string
}

export const disableProject = (params: DisableProjectRequestDTO) => {
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
    return axiosInstance().post("/disableProject", params)
}

export type EnableProjectRequestDTO = {
    id: string
}

export const enableProject = (params: EnableProjectRequestDTO) => {
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
    return axiosInstance().post("/enableProject", params)
}

export type DeleteProjectRequestDTO = {
    id: string
}

export const deleteProject = (params: DeleteProjectRequestDTO) => {
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
    return axiosInstance().post("/deleteProject", params)
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

export const viewProjectMeters = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewProjectMetersMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewProjectMeters", { id })
}

export const viewProjectGateways = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewProjectGatewaysMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewProjectGateways", { id })
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

export const projectMeterConsumptionDailyGraph = (params: consumptionGraphDaily) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = mockProjectGraph
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/projectMeterConsumptionDaily", {...params})
}

export const projectMeterConsumptionWeeklyGraph = (params:consumptionGraphWeekly) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = mockProjectGraph
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/projectMeterConsumptionWeekly", {...params})
}

export const projectMeterConsumptionMonthlyGraph = (params: consumptionGraphParamsMonthly) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = mockProjectGraph
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/projectMeterConsumptionMonthly", {...params})
}