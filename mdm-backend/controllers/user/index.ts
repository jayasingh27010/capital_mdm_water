import express, { Request, Response } from "express";
import Joi from "joi";
import { deepCopy, parseAuthTokenFromReq } from "../../utilities";
import getNavigation from "../../configs/getNavigation"
import NavigationService from "../../services/NavigationService";
import DBservice from "../../services/DBservice";
import { UserDBDTO } from "../../services/DBservice/UserDBService/types";

const userRouter = express.Router()

userRouter.post("/getUser", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req, true)
        // const navigation = deepCopy(getNavigation)
        
        switch (tokenObj.accountTypeValue) {
            case "consumer":
                tokenObj.profileLink = `/admin/consumers/${tokenObj.userId}`
                break;
            default:
                tokenObj.profileLink = `/admin/users/${tokenObj.userId}`
        }
        
        return res.status(200).json(tokenObj)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
        .status(400)
        .json({
            message: "INVALID_REQUEST"
        })
    }
})

userRouter.post("/usernameExists", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const users = (await DBservice.User.usernameExists(req?.body?.username)).rows
        if (users.length === 0) {
            return res.status(200).json({})
        } else {
            return res.status(400).json({
                message: "USERNAME_EXISTS"
            })
        }
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
        .status(400)
        .json({
            message: "INVALID_REQUEST"
        })
    }
})

userRouter.post("/adminExists", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req)
        const projectName: string = req?.body?.projectName ?? ""
        if (!projectName) {
            return res.status(400).json({
                message: "PROJECT_ID_NOT_FOUND"
            })
        }
        if (projectName) {
            const users: UserDBDTO[] = (await DBservice.User.adminExists(projectName)).rows
            const adminExists: boolean = users.length > 0
            return res.status(200).json({
                adminExists
            })
        }
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
        .status(400)
        .json({
            message: "INVALID_REQUEST"
        })
    }
})

export default userRouter