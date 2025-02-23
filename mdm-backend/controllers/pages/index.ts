import express, { Request, Response } from "express";
import Joi from "joi";
import { deepCopy, parseAuthTokenFromReq } from "../../utilities";
import PageService from "../../services/PageService";

const pageRouter = express.Router()

const pageSchema = Joi.object({
    pagePath: Joi.string().required()
})

pageRouter.post("/getPage", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req, true)
        await pageSchema.validateAsync(req?.body ?? {})
        const { pagePath } = req.body
        const pageResponse: any = PageService.getPage(pagePath)
        switch (pagePath) {
            case "/admin/dashboard":
                if (tokenObj.accountTypeValue !== "superAdmin") {
                    const order = pageResponse.config.sections.order
                    const dashboardProjectsnGatewaysExcludedOrder = order
                        .filter((fieldId: string) => !["dashboardProjects"].includes(fieldId))
                    pageResponse.config.sections.order = dashboardProjectsnGatewaysExcludedOrder
                    pageResponse.config.sections.dashboardGateways.columnSize = 12
                }
                break
            case "/admin/users":
                const accountTypes = ["admin", "superAdmin"]
                if (!accountTypes.includes(tokenObj.accountTypeValue)) {
                    const order = pageResponse.config.sections.order
                    const userActionsExcludedOrder = order
                        .filter((fieldId: string) => fieldId !== "userActions")
                    pageResponse.config.sections.order = userActionsExcludedOrder
                }
                break
        }
        if (pagePath.includes("/consumers")) {
            if (tokenObj.accountTypeValue === "consumer") {
                pageResponse.config.label[0].clickPath = `/admin/consumers/${tokenObj.userId}`
            }
        }
        if (!pagePath.includes("/consumers") && tokenObj.accountTypeValue === "consumer") {
            throw new Error("Access Denied")
        }
        // const navigation = deepCopy(gation)
        return res.status(200).json(pageResponse)
    } catch (e: any) {
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})

export default pageRouter