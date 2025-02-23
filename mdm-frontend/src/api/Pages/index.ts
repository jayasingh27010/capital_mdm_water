import { config } from "src/config"
import { axiosInstance } from "src/api"
import { getPageMock } from "src/mock/Pages"
const { runMode } = config

export type GetPageRequestDTO = {
    pagePath: string
}
export const getPage = (params: GetPageRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getPageMock(params))
            }, 0)
        })
    }
    return axiosInstance().post("getPage", params)
}