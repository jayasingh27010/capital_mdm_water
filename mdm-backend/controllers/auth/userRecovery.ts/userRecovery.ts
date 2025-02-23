import express, { Request, Response } from "express";
import Joi from "joi";
import DBservice from "../../../services/DBservice";

const forgetPasswordRouter = express.Router();

const sendOtpSchema = Joi.object({
    username: Joi.string().required(),
});

forgetPasswordRouter.post("/user/forget_password", async (req: Request, res: Response) => {
    try {
        await sendOtpSchema.validateAsync(req.body);
        const { username } = req.body;
        const data = await DBservice.User.verifyUserForgotPassword(username)
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

export default forgetPasswordRouter;
