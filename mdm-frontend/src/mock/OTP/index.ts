import { SendOTPRequestDTO, VerifyOTPRequestDTO } from "src/api/OTP";

export const sendOTPMock = (params: SendOTPRequestDTO) => {
    if (params.username === 'naveen.yadav@gmail.com' || params.username === 'admin') {
        return {
            otpSendLocation: 'YADAV.NAVEEN@GMAIL.COM'
        }
    }
    throw new Error("This email is not registered with us")
}

export const verifyOTPMock = (params: VerifyOTPRequestDTO) => {
    if (params.OtpGenerated === "123456") {
        return {
            changePasswordToken: 'ejdsfjkhsdk'
        }
    }
    throw new Error("Invalid OTP")
}