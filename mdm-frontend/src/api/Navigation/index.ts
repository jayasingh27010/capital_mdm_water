import { config } from "src/config"
import { getNavigationMock } from "src/mock/Navigation"
import { axiosInstance } from "src/api"
const { runMode } = config

export const getNavigation = (): Promise<any> => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getNavigationMock)
            }, 2000)
        })
    }
    return axiosInstance().post("/getNavigation")
}