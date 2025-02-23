import express, { Request, Response } from "express";
import Joi from "joi";
import DBservice from "../../../services/DBservice";

const verifyOtpRouter = express.Router();

const verifyOtpSchema = Joi.object({
    otpTimeout:Joi.string().required(),
    username: Joi.string().required(),
    OtpGenerated: Joi.string().required(),
});
const newPasswordSchema = Joi.object({
    username: Joi.string().required(),
    password:Joi.string().required(),
});


verifyOtpRouter.post("/user/verify_otp", async (req: Request, res: Response) => {
    try {
        await verifyOtpSchema.validateAsync(req.body);
        const { username,OtpGenerated,otpTimeout } = req.body;
        const data = await DBservice.User.verifyUserForOtp(username,OtpGenerated,otpTimeout)
        if (data.status as any === "success") {
            return res.status(200).json({
                status: data.status,
                message: data.data
            });
        } else {
            return res.status(400).json({
                status: data.status,
                message: data.data || "Unable to send OTP. Please try again."
            });
        }

    } catch (e: any) {
        if (e.isJoi) {
            return res.status(400).json({
                message: "INVALID_REQUEST",
                details: e.details
            });
        }
      
        return res.status(500).json({
            message: "INTERNAL_SERVER_ERROR"
        });
    }
});

verifyOtpRouter.post("/user/new_password", async (req: Request, res: Response) => {
    try {
        await newPasswordSchema.validateAsync(req.body);
        const { username, password } = req.body;
        const data = await DBservice.User.forgotPassword(username,password)
        if (data.status as any === "success") {
            return res.status(200).json({
                status: data.status,
                message: data.data
            });
        } else {
            return res.status(400).json({
                status: data.status,
                message: data.data || "Unable to reset password. Please try again"
            });
        }

    } catch (e: any) {
        if (e.isJoi) {
            return res.status(400).json({
                message: "INVALID_REQUEST",
                details: e.details
            });
        }
      
        return res.status(500).json({
            message: "INTERNAL_SERVER_ERROR"
        });
    }
});

export default verifyOtpRouter;
