"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../../../utilities");
const consumers_1 = __importDefault(require("../MockDBData/consumers"));
const rows = [];
let counter = 1;
const NUM_RECHARGES = 20;
const targetDate = 1722409799433;
const dateDiff = 1000 * 60 * 60 * 24 * 31;
const consumers = (0, utilities_1.deepCopy)(consumers_1.default).rows;
for (const consumer of consumers) {
    for (let i = 0; i < NUM_RECHARGES; i++) {
        const rechargeId = `RECHARGE_${counter}`;
        if (consumer.meterId.length === 0) {
            continue;
        }
        rows.push({
            rechargeId,
            meterId: consumer.meterId,
            meterSerialNo: consumer.meterSerialNo,
            consumerId: consumer.consumerId,
            rechargeDate: new Date(targetDate - (i * dateDiff)).toLocaleString(),
            rechargeAmount: "₹3000"
        });
        counter++;
    }
}
exports.default = {
    rows
};
