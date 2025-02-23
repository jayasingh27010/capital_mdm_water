import dotenv from "dotenv"
import MockUsers from "../MockDBData/users"
import { deepCopy, makeCall } from "../../../utilities"
import { UserDBDTO } from "./types";
import { DBResponse, DBStatResponse,APIResponse } from "../types";
import { FilterInfo } from "../../../utilities/types";
import { DBRawResponse } from "../../../mockUtilities/types";
import { getPaginatedResponse } from "../../../mockUtilities";

dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"


export default {
    createUser: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            console.log(payload)
            return makeCall("POST", "/user/create_user", {...payload})
            // return new Promise(resolve => resolve({}))
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully added"
            })
        })
    },
    changePassword: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/user/change_password", {...payload})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully edited"
            })
        })

    },
    resetPassword: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/user/reset_password", {userId:payload})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully edited"
            })
        })

    },
    editUser: (payload: any): Promise<DBStatResponse> => {
        if (payload.designation === 'admin') {
            payload.accessLevel = 2;
        } else if (payload.designation === 'vendingManager') {
            payload.accessLevel = 3;
        } else if (payload.designation === 'accountManager') {
            payload.accessLevel = 4;
        } else if (payload.designation === "operationManager") {
            payload.accessLevel = 5;
        } else {
            payload.accessLevel = 2;
        }
        console.log(payload,"payloadddd")
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/user/edit_user", {...payload})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully edited"
            })
        })
    },
    deleteUser: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return new Promise((_, reject) => {
                reject(new Error("Not Implemented"))
            })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully deleted"
            })
        })
    },
    disableUser: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/user/disable_user", {...payload, userId: payload.id})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully disabled"
            })
        })
    },
    enableUser: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/user/enable_user", {...payload, userId: payload.id})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "User successfully enabled"
            })
        })
    },
    isValidUser: async (username: string, password: string): Promise<DBResponse> => {
        if (RUN_MODE !== "dev") {
            return makeCall("POST", "/user/is_valid_user", {userName: username, password})
        }
        
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers: UserDBDTO[] = deepCopy(MockUsers).rows
            const foundUser = mockUsers.find((user: UserDBDTO) => user.userName === username && user.password === password)
            if (foundUser) {
                resolve({rows: [foundUser], totalRecords: 1})
            } else {
                resolve({rows: [], totalRecords: 0})
            }
        })
    },
    usernameExists: async (username: string): Promise<DBResponse> => {
        if (RUN_MODE !== "dev") {
            
            return makeCall("POST", '/user/user_name_exist', {userName: username})
        }


        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers: UserDBDTO[] = deepCopy(MockUsers).rows
            const foundUser = mockUsers.find((user: UserDBDTO) => user.userName === username)
            if (foundUser) {
                resolve({rows: [foundUser], totalRecords: 1})
            } else {
                resolve({rows: [], totalRecords: 0})
            }
        })
    },

    verifyUserForgotPassword: async (username: string): Promise<APIResponse> => {
        if (RUN_MODE !== "dev") {
            
            return makeCall("POST", '/user/forget_password', {userName: username})
        }
      
        return new Promise((resolve) => {
            const mockUsers: UserDBDTO[] = deepCopy(MockUsers).rows
            const foundUser = mockUsers.find((user: UserDBDTO) => user.userName === username)
            if (foundUser) {
                resolve({data: [foundUser], status: "success"})
            } else {
                resolve({data: [], status: "error"})
            }
        })
    },
    
    verifyUserForOtp: async (username: string,otpGenerated:string, otpTimeout:string): Promise<APIResponse> => {
        if (RUN_MODE !== "dev") {
            return makeCall("POST", '/user/verify_otp', {userName: username,OtpGenerated:otpGenerated, otpTimeout:otpTimeout})
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers: UserDBDTO[] = deepCopy(MockUsers).rows
            const foundUser = mockUsers.find((user: UserDBDTO) => user.userName === username)
            if (foundUser) {
                resolve({data: [foundUser], status: "success"})
            } else {
                resolve({data: [], status: "error"})
            }
        })
    },

    forgotPassword: async (username: string,password:string): Promise<APIResponse> => {
        if (RUN_MODE !== "dev") {
            return makeCall("POST", '/user/new_password', {userName: username,password:password})
        }
        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers: UserDBDTO[] = deepCopy(MockUsers).rows
            const foundUser = mockUsers.find((user: UserDBDTO) => user.userName === username)
            if (foundUser) {
                resolve({data: [foundUser], status: "success"})
            } else {
                resolve({data: [], status: "error"})
            }
        })
    },
    adminExists: async (projectId: string): Promise<DBResponse> => {
        if (RUN_MODE !== "dev") {
            return makeCall("POST", "/user/admin_exists", { projectId })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers: UserDBDTO[] = deepCopy(MockUsers).rows
            const foundUser = mockUsers.find((user: UserDBDTO) => user.projectId === projectId && user.accessLevel === 2)
            if (foundUser) {
                resolve({rows: [foundUser], totalRecords: 1})
            } else {
                resolve({rows: [], totalRecords: 0})
            }
        })
    },
    getSubUsers: async (userId: string, filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE !== "dev") {
            return makeCall("POST", "/user/get_sub_users", {userId, ...filters})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers: UserDBDTO[] = deepCopy(MockUsers).rows
            const foundUser = mockUsers.find((user: UserDBDTO) => user.userId === userId)
            let finalUsers: UserDBDTO[]
            if (foundUser) {
                switch (foundUser.accountTypeValue) {
                    case "superAdmin":
                        finalUsers = mockUsers.filter(user => user.accessLevel > foundUser.accessLevel)
                        break
                    case "admin":
                        finalUsers = mockUsers
                            .filter(user => (
                                user.accessLevel > foundUser.accessLevel ||
                                user.accessLevel === 1 ||
                                user.accessLevel === 2 ||
                                (user.accessLevel === 3 && user.projectId === foundUser.projectId)
                            ))
                        break
                    default:
                        finalUsers = mockUsers
                            .filter(user => (
                                user.projectId === foundUser.projectId ||
                                user.accessLevel === 1 ||
                                user.accessLevel === 2 && user.projectId === foundUser.projectId)
                            )
                }
                const rawResponse: DBRawResponse = { rows: finalUsers }
                resolve(getPaginatedResponse(rawResponse, filters))
            } else {
                resolve({rows: [], totalRecords: 0})
            }
        })
    },
    getUserById: async (userId: string): Promise<DBResponse> => {
        if (RUN_MODE !== "dev") {
            return makeCall("POST", "/user/get_user_by_id", {userId})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const mockUsers: UserDBDTO[] = deepCopy(MockUsers).rows
            const foundUser = mockUsers.find((user: UserDBDTO) => user.userId === userId)
            if (foundUser) {
                resolve({rows: [foundUser], totalRecords: 1})
            } else {
                resolve({rows: [], totalRecords: 0})
            }
        })
    }
}