import express, { Request, Response } from "express";
import Joi from "joi";
import DBservice from "../../../services/DBservice";
import { createLog } from "../../../utilities";
import { parseAuthTokenFromReq } from "../../../utilities";
import { LOG_MODULE_CONSTS,LOG_ACTION_CONSTS } from "../../logConsts";
const { Users } = LOG_MODULE_CONSTS
const {
    RESET_PASSWORD,
} = LOG_ACTION_CONSTS[Users]

const resetPasswordRouter = express.Router();

const resetPasswordSchema = Joi.object({
    userId: Joi.string().required(),
    // password: Joi.string().required(),
});

resetPasswordRouter.post("/resetPassword", async (req: Request, res: Response) => {
    try {
        await resetPasswordSchema.validateAsync(req.body);
        const tokenObj = parseAuthTokenFromReq(req)
        const { userId } = req.body;
        const data = await DBservice.User.resetPassword(userId)
        let description = ``;
        createLog(tokenObj, Users, RESET_PASSWORD, data,description)
        
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

export default resetPasswordRouter;
