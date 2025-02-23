import { config } from "src/config"
import { axiosInstance } from "src/api"
import { viewAllGatewaysTableMock,viewGatewayActionsMock } from "src/mock/Pages/Gateways"
const { runMode } = config

export const viewGatewayActions = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewGatewayActionsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewGatewayActions")
}

export const viewAllGatewaysTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewAllGatewaysTableMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewAllGatewaysTable", filters)
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
    return axiosInstance().post("/viewGatewayDetails", { id })
}*/