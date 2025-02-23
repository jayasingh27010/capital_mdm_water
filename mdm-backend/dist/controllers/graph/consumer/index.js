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
const utilities_1 = require("../../../utilities");
const DBservice_1 = __importDefault(require("../../../services/DBservice"));
const viewMeterGraphConsumption_1 = __importDefault(require("../../../configs/viewMeterGraphConsumption"));
const consumptiomRouter = express_1.default.Router();
consumptiomRouter.post("/meterConsumptionWeekly", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        let consumerId = req.body.consumerId;
        const year = req.body.year;
        const requestType = req.body.filter;
        const configJSON = (0, utilities_1.deepCopy)(viewMeterGraphConsumption_1.default);
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId;
        }
        const data = yield DBservice_1.default.Consumers.getConsumerMeterConsumptionGraph(consumerId, year, requestType);
        configJSON.data = data;
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId;
        }
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
consumptiomRouter.post("/meterConsumptionMonthly", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        let consumerId = req.body.consumerId;
        const month = req.body.month;
        const requestType = req.body.filter;
        const configJSON = (0, utilities_1.deepCopy)(viewMeterGraphConsumption_1.default);
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId;
        }
        const data = yield DBservice_1.default.Consumers.getConsumerMeterConsumptionGraphweekly(consumerId, month, requestType);
        configJSON.data = data;
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId;
        }
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
consumptiomRouter.post("/meterConsumptionDaily", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req, true);
        let consumerId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.consumerId;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const requestType = req.body.filter;
        const configJSON = (0, utilities_1.deepCopy)(viewMeterGraphConsumption_1.default);
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId;
        }
        const data = yield DBservice_1.default.Consumers.getConsumerMeterConsumptionGraphDaily(consumerId, startDate, endDate, requestType);
        configJSON.data = data;
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId;
        }
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
exports.default = consumptiomRouter;
