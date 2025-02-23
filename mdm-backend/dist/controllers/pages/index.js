"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const utilities_1 = require("../../utilities");
const PageService_1 = __importDefault(require("../../services/PageService"));
const pageRouter = express_1.default.Router();
const pageSchema = joi_1.default.object({
    pagePath: joi_1.default.string().required()
});
pageRouter.post("/getPage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        yield pageSchema.validateAsync((_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {});
        const { pagePath } = req.body;
        const pageResponse = PageService_1.default.getPage(pagePath);
        switch (pagePath) {
            case "/admin/dashboard":
                if (tokenObj.accountTypeValue !== "superAdmin") {
                    const order = pageResponse.config.sections.order;
                    const dashboardProjectsnGatewaysExcludedOrder = order
                        .filter((fieldId) => !["dashboardProjects"].includes(fieldId));
                    pageResponse.config.sections.order = dashboardProjectsnGatewaysExcludedOrder;
                    pageResponse.config.sections.dashboardGateways.columnSize = 12;
                }
                break;
            case "/admin/users":
                const accountTypes = ["admin", "superAdmin"];
                if (!accountTypes.includes(tokenObj.accountTypeValue)) {
                    const order = pageResponse.config.sections.order;
                    const userActionsExcludedOrder = order
                        .filter((fieldId) => fieldId !== "userActions");
                    pageResponse.config.sections.order = userActionsExcludedOrder;
                }
                break;
        }
        if (pagePath.includes("/consumers")) {
            if (tokenObj.accountTypeValue === "consumer") {
                pageResponse.config.label[0].clickPath = `/admin/consumers/${tokenObj.userId}`;
            }
        }
        if (!pagePath.includes("/consumers") && tokenObj.accountTypeValue === "consumer") {
            throw new Error("Access Denied");
        }
        // const navigation = deepCopy(gation)
        return res.status(200).json(pageResponse);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
exports.default = pageRouter;
