import { config } from "src/config"
import { noAuthAxiosInstance } from ".."
import { sendOTPMock, verifyOTPMock } from "src/mock/OTP";
const { runMode } = config

export type SendOTPRequestDTO = {
    // verifyBy: string;
    // email?: string;
    username?: string;
}

export const sendOTP = (params: SendOTPRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            try {
                const response = sendOTPMock(params)
 //               console.log(response,"naveen.yadav@gmail.com")
                resolve({data: response })
            } catch (e) {
                reject(new Error("This Email is not registered with us"))
            }
        })
    }
    return noAuthAxiosInstance.post('/user/forget_password', params)
}

export type VerifyOTPRequestDTO = {
    // verifyBy: string;
    // email?: string;
    username?: string;
    OtpGenerated: string
    otpTimeout:string
}

export const verifyOTP = (params: VerifyOTPRequestDTO) => {
    if (runMode === 'dev') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const response = verifyOTPMock(params)
                    resolve(response)
                } catch (e) {
                    reject(new Error("This Email/Username is not registered with us"))
                }
            }, 2000)
        })
    }
    return noAuthAxiosInstance.post("/user/verify_otp", params)
}