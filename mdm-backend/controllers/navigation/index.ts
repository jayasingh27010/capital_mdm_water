import express, { Request, Response } from "express";
import Joi from "joi";
import { deepCopy, parseAuthTokenFromReq } from "../../utilities";
import getNavigation from "../../configs/getNavigation"
import NavigationService from "../../services/NavigationService";

const navigationRouter = express.Router()

const tryLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

navigationRouter.post("/getNavigation", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req, true)
        const navigation = deepCopy(getNavigation)
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = navigation.config.menuItems.order
            const excludedProjectOrder = order.filter((fieldId: string) => fieldId !== "projects")
            navigation.config.menuItems.order = excludedProjectOrder
        }
        if (!["superAdmin", "admin"].includes(tokenObj.accountTypeValue)) {
            const order = navigation.config.menuItems.order
            const excludedUserOrder = order.filter((fieldId: string) => fieldId !== "users")
            navigation.config.menuItems.order = excludedUserOrder
        }
        if (tokenObj.accountTypeValue === "consumer") {
            const order = navigation.config.menuItems.order
            const excludedUserOrder = order.filter((fieldId: string) => ["consumerSingle", "consumers"].includes(fieldId))
            navigation.config.menuItems.order = excludedUserOrder
            navigation.config.menuItems.consumers.path = `/consumers/${tokenObj.userId}`
            navigation.config.menuItems.consumers.pageComponent = `consumerSingle`
        }
        return res.status(200).json(NavigationService.modifyConfig(navigation))
    } catch (e: any) {
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})

export default navigationRouter