"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mockUtilities_1 = require("../../../mockUtilities");
const utilities_1 = require("../../../utilities");
const projects_1 = __importDefault(require("../MockDBData/projects"));
const rows = [];
let counter = 1;
const phaseTypeValues = {
    "single": "Single",
    "threePhase": "Three Phase",
    "ht": "HT",
    "ct": "CT",
    "ltct": "LTCT"
};
const sourceTypeValues = {
    "single": "Single",
    "dual": "Dual"
};
const consumptionTypeValues = {
    "gas": "Gas",
    "energy": "Energy",
    "water": "Water",
    "other": "Other"
};
const projects = (0, utilities_1.deepCopy)(projects_1.default).rows;
for (const project of projects) {
    for (let i = 0; i < 20; i++) {
        const meterId = (0, mockUtilities_1.createMeterSerialNoFromCounter)(counter);
        const phaseTypeKeys = Object.keys(phaseTypeValues);
        const phaseTypeKey = phaseTypeKeys[counter % phaseTypeKeys.length];
        const sourceTypeKeys = Object.keys(sourceTypeValues);
        const sourceTypeKey = sourceTypeKeys[counter % sourceTypeKeys.length];
        const consumptionTypeKeys = Object.keys(consumptionTypeValues);
        const consumptionTypeKey = consumptionTypeKeys[counter % consumptionTypeKeys.length];
        const consumerId = [0, 1].includes(counter % 3) ? (0, mockUtilities_1.createConsumerIdFromCounter)(counter) : "";
        const consumerName = [0, 1].includes(counter % 3) ? (0, mockUtilities_1.createConsumerNameFromCounter)(counter) : "";
        rows.push({
            meterId,
            meterSerialNo: meterId,
            moduleNo: 'MOD-XXX',
            phaseTypeValue: phaseTypeKey,
            phaseTypeDescription: phaseTypeValues[phaseTypeKey],
            sourceTypeValue: sourceTypeKey,
            sourceTypeDescription: sourceTypeValues[sourceTypeKey],
            consumptionTypeValue: consumptionTypeKey,
            consumptionTypeDescription: consumptionTypeValues[consumptionTypeKey],
            projectId: project.projectId,
            projectName: project.projectName,
            consumerId,
            consumerName
        });
        counter++;
    }
}
exports.default = {
    rows
};
