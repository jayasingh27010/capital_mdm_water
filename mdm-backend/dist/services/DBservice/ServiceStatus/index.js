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
const ServiceStatus_1 = __importDefault(require("../../../configs/ServiceStatus/ServiceStatus"));
dotenv_1.default.config();
const RUN_MODE = process.env.RUN_MODE || "dev";
exports.default = {
    getServiceStatus: () => __awaiter(void 0, void 0, void 0, function* () {
        if (RUN_MODE != "dev") {
            return (0, utilities_1.makeCall)("POST", "/test/service-status", {});
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse = (0, utilities_1.deepCopy)(ServiceStatus_1.default);
            resolve({
                rows: rawResponse.rows,
                totalRecords: rawResponse.totalRecords
            });
        });
    })
};
