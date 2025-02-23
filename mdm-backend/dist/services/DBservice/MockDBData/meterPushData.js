"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../../../utilities");
const meters_1 = __importDefault(require("../MockDBData/meters"));
const rows = [];
let counter = 1;
const targetDate = 1722409799433;
const NUM_PROJECTS = 20;
const NUM_PUSHES = 100;
const PUSH_TIME_DIFFERENCE = 5 * 60 * 1000;
const ID_TEMPLATE = "PUSH-0000";
const ID_TEMPLATE_LENGTH = ID_TEMPLATE.length;
const getIdFromCounter = (counter) => {
    const counterStr = String(counter);
    const counterStringLen = counterStr.length;
    return `${ID_TEMPLATE.slice(0, ID_TEMPLATE_LENGTH - counterStringLen)}${counterStr}`;
};
const meters = (0, utilities_1.deepCopy)(meters_1.default).rows;
for (const meter of meters) {
    for (let i = 0; i < NUM_PUSHES; i++) {
        const recieveTime = targetDate - (i * PUSH_TIME_DIFFERENCE);
        rows.push({
            id: getIdFromCounter(counter),
            meterId: meter.meterId,
            meterSerialNo: meter.meterId,
            projectId: meter.projectId,
            projectName: meter.projectName,
            "powerFactor": "100",
            "cumulativeWh": "9999999",
            "cumulativeVah": "9999999",
            "overloadStatus": "2",
            recieveTime
        });
        counter++;
    }
}
exports.default = {
    rows
};
