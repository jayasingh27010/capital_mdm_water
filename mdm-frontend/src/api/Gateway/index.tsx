import { config } from "src/config";
import { axiosInstance } from "..";
/*import { viewGatewayDetailsMock } from "src/mock/Pages/Gateways";*/
const { runMode } = config


/*export type GetUserRequestDTO = {}

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
*/
export type CreateGatewayRequestDTO = {
    gatewayNumber: number,
    location: string,
    connectivityType:string
   
}

export const createGateway = (params: CreateGatewayRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const randomSignal =  Math.floor(Math.random() * 10)
                    if (randomSignal <= 5) {
                        resolve({})
                    } else {
                        reject(new Error("Gateway Already Exists"))
                    }
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 1500)
        })
    }
    return axiosInstance().post("/createGateway", params)
}

export const editGateway = (params: CreateGatewayRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const randomSignal =  Math.floor(Math.random() * 10)
                    if (randomSignal <= 5) {
                        resolve({})
                    } else {
                        reject(new Error("Gateway Already Exists"))
                    }
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 1500)
        })
    }
    return axiosInstance().post("/editGateway", params)
}

/*export const viewGatewayDetails = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewGatewayDetailsMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewMeterDetails", { id })
}

export const viewGatewayMeters = (id: any) => {
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
}*/