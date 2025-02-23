import { config } from "src/config";
import { axiosInstance } from "..";
const { runMode } = config


export type GetUserRequestDTO = {}

export const getUser = (params: GetUserRequestDTO) => {
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
                        profileLink: '/admin/users/diganta'
                    }
                    resolve(response)
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 0)
        })
    }
    return axiosInstance().post("/getUser", params)
}

export type CreateUserRequestDTO = {
    name: string,
    username: string,
    projectName: string,
    mobileNo: string,
    email: string,
    designation: string
}

export const createUser = (params: CreateUserRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const randomSignal =  Math.floor(Math.random() * 10)
                    if (randomSignal <= 5) {
                        resolve({})
                    } else {
                        reject(new Error("Username Already Exists"))
                    }
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 1500)
        })
    }
    return axiosInstance().post("/createUser", params)
}

export type EditUserRequestDTO = {
    id: string
    name: string,
    username: string,
    projectName: string,
    mobileNo: string,
    email: string,
    designation: string
}

export const editUser = (params: EditUserRequestDTO) => {
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
    return axiosInstance().post("/editUser", params)
}

export type DisableUserRequestDTO = {
    id: string
}

export const disableUser = (params: DisableUserRequestDTO) => {
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
    return axiosInstance().post("/disableUser", params)
}

export const changePassword = (params: any) => {
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
    return axiosInstance().post("/changePassword", params)
}

export const resetPassword = (params: any) => {
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
    return axiosInstance().post("/resetPassword", params)
}

export type DeleteUserRequestDTO = {
    id: string
}

export const deleteUser = (params: DeleteUserRequestDTO) => {
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
    return axiosInstance().post("/deleteUser", params)
}
export type EnableUserRequestDTO = {
    id: string
}

export const enableUser = (params: EnableUserRequestDTO) => {
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
    return axiosInstance().post("/enableUser", params)
}

type UsernameExistsRequestDTO = {
    username: string
}

export const usernameExists = (params: UsernameExistsRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const randomSignal =  Math.floor(Math.random() * 10)
                    if (randomSignal <= 5) {
                        resolve({})
                    } else {
                        reject(new Error("Username Already Exists"))
                    }
                } catch (e) {

                }
            }, 2000)
        })
    }
    return axiosInstance().post("/usernameExists", params)
}

type AdminExistsRequestDTO = {
    projectName: string
}

export const adminExists = (params: AdminExistsRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    resolve({
                        adminExists: params?.projectName === 'project1'
                    })
                } catch (e) {

                }
            }, 2000)
        })
    }
    return axiosInstance().post("/adminExists", params)
}