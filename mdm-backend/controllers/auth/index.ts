import express, { Request, Response } from "express";
import Joi from "joi";
import DBservice from "../../services/DBservice";
import AuthService from "../../services/AuthService";

const authRouter = express.Router()

const tryLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

authRouter.post("/tryLogin", async (req: Request, res: Response) => {
    try {
        // $2a$10$bmR4rlWiZ2CspS11YzDj/uKtm0MFrboTDCjApQmGxVTg5lkMIATDi
        await tryLoginSchema.validateAsync(req.body)
        const { username, password } = req.body
        const data = await DBservice.User.isValidUser(username, password)
        const { rows } = data
        if (rows.length === 0) {
            return res.status(400).json({
                message: "INVALID_CREDENTIALS"
            })
        }
        const user: any = rows[0]
        if (!user?.enabled) {
            return res
            .status(400)
            .json({
                message: "ACCOUNT_DISABLED"
            })
        }
        if (user.hasOwnProperty("password")) {
            delete user.password;
        }
        user.tokenCreationTime = Date.now()
        return res.status(200).json({
            token: AuthService.encode(user)
        })
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
        // // if(e.name === "AggregateError"){
        // //     res
        // //     .status(400)
        // //     .json({message:"ECONNREFUSED"})
        // // }
        // res
        // .status(400)
        // .json({
        //     message: "INVALID_REQUEST"
        // })
    }
})

export default authRouter