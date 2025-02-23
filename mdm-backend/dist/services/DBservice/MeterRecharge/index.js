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
const dotenv_1 = __importDefault(require("dotenv"));
const utilities_1 = require("../../../utilities");
dotenv_1.default.config();
const RUN_MODE = process.env.RUN_MODE || "dev";
exports.default = {
    createManualRecharge: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, utilities_1.makeCall)("POST", "/payment_recharge/create_manual_recharge", payload);
    }),
    createCreditNote: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, utilities_1.makeCall)("POST", "/payment_recharge/create_credit_note", payload);
    }),
    createDebitNote: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, utilities_1.makeCall)("POST", "/payment_recharge/create_debit_note", payload);
    }),
    getAllManualRechargeList: (filters) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, utilities_1.makeCall)("POST", "/payment_recharge/get_all_manual_recharge", filters);
    }),
    getAllCreditNoteList: (filters) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, utilities_1.makeCall)("POST", "/payment_recharge/get_all_credit_note", filters);
    }),
    getAllDebitNoteList: (filters) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, utilities_1.makeCall)("POST", "/payment_recharge/get_all_debit_note", filters);
    }),
    getAllPaymentRechargeList: (consumerId, filters) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, utilities_1.makeCall)("POST", "/payment_recharge/get_all_meter_recharge", Object.assign({ consumerId }, filters));
    }),
    getMeterSerialNoByConsumerId: (consumerId) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, utilities_1.makeCall)("POST", "/meter/getMeter_available_balance_by_consumer_id", { consumerId });
    }),
    // getManuaRechargeWithFilters: async (filters: FilterInfo): Promise<DBResponse> => {
    //     if (RUN_MODE == "dev") {
    //         filters.perPage = 1000
    //         filters.currPage = 0
    //         console.log(filters)
    //         return makeCall("POST","/tariff_group/get_tariff_group_with_filters", filters);
    //     }
    //     return new Promise((resolve) => {
    //         //logic inside can be implemented within a stored procedure
    //         const manualRecharge = deepCopy()
    //         resolve(getPaginatedResponse({
    //             rows: manualRecharge.rows
    //         }, filters))
    //     })
    // }
};
