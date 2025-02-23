import { config } from "src/config"
import { noAuthAxiosInstance } from ".."
const { runMode } = config

export type GetRecoveredAccountDTO = {
    changePasswordToken: string
}

export const getRecoveredAccount = (params: GetRecoveredAccountDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const response = {
                        id: "admin",
                        accountType: "Super Admin",
                        username: "admin",
                        firstName: "Diganta",
                        lastName: "Ray",
                        email: "ray.diganta00@gmail.com"
                    }
                    resolve(response)
                } catch (e) {
                    reject(e)
                }
            }, 0)
        })
    }
    return noAuthAxiosInstance.post('/getRecoveredAccount', params)
}

type ResetPasswordDTO = {
    username: string,
    password: string
}

export const resetPassword = (params: ResetPasswordDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve({})
                } catch (e) {
                    reject(e)
                }
            }, 0)
        })
    }
    return noAuthAxiosInstance.post('/user/new_password', params)
}