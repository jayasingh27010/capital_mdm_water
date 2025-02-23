import { config } from "src/config";
import { noAuthAxiosInstance } from "..";
import { tryLoginMock } from "src/mock/Login";
const { runMode } = config


export type TryLoginRequestDTO = {
    username: string;
    password: string
}

export const tryLogin = (params: TryLoginRequestDTO) => {
    
    if (runMode === 'dev') {
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    
                    const response = tryLoginMock(params)
                    console.log("reshwdcsbn",response)
                    resolve(response)
                } catch (e) {
                    reject(new Error("Invalid Credentials"))
                }
            }, 0)
        })
    }
    return noAuthAxiosInstance.post("/tryLogin", params)
}