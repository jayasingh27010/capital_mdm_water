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
const getNavigation_1 = __importDefault(require("../../configs/getNavigation"));
const NavigationService_1 = __importDefault(require("../../services/NavigationService"));
const navigationRouter = express_1.default.Router();
const tryLoginSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
navigationRouter.post("/getNavigation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        const navigation = (0, utilities_1.deepCopy)(getNavigation_1.default);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const order = navigation.config.menuItems.order;
            const excludedProjectOrder = order.filter((fieldId) => fieldId !== "projects");
            navigation.config.menuItems.order = excludedProjectOrder;
        }
        if (!["superAdmin", "admin"].includes(tokenObj.accountTypeValue)) {
            const order = navigation.config.menuItems.order;
            const excludedUserOrder = order.filter((fieldId) => fieldId !== "users");
            navigation.config.menuItems.order = excludedUserOrder;
        }
        if (tokenObj.accountTypeValue === "consumer") {
            const order = navigation.config.menuItems.order;
            const excludedUserOrder = order.filter((fieldId) => ["consumerSingle", "consumers"].includes(fieldId));
            navigation.config.menuItems.order = excludedUserOrder;
            navigation.config.menuItems.consumers.path = `/consumers/${tokenObj.userId}`;
            navigation.config.menuItems.consumers.pageComponent = `consumerSingle`;
        }
        return res.status(200).json(NavigationService_1.default.modifyConfig(navigation));
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
exports.default = navigationRouter;
