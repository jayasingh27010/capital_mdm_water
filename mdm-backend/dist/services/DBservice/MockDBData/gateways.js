"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../../../utilities");
const projects_1 = __importDefault(require("../MockDBData/projects"));
const rows = [];
const MockGatewayNoTemplate = "1110000000000000";
const createGatewayNoFromCounter = (counter) => {
    const counterStr = String(counter);
    const templateStrLength = MockGatewayNoTemplate.length - counterStr.length;
    return `${MockGatewayNoTemplate.slice(0, templateStrLength)}${counterStr}`;
};
const connectivityTypeValues = {
    'gprs': 'GPRS',
    'ethernet': 'Ethernet'
};
const targetDate = 1722409799433;
const mockTimeDifference = 1000 * 60 * 60;
const getUniqueIP = (counter) => {
    const subNet1 = Math.floor((counter - 1) / 255).toString();
    const subNet2 = (counter - 1) % 255;
    return `192.168.${subNet1}.${subNet2}`;
};
const MockSimNoTemplate = "7042472125";
const getUniqueSimNo = (counter) => {
    const counterStr = String(counter);
    const templateStrLength = MockSimNoTemplate.length - counterStr.length;
    return `${MockSimNoTemplate.slice(0, templateStrLength)}${counterStr}`;
};
let counter = 1;
const projects = (0, utilities_1.deepCopy)(projects_1.default).rows;
for (const project of projects) {
    for (let i = 0; i < 5; i++) {
        const gatewayNumber = createGatewayNoFromCounter(counter);
        const connectivityTypeKeys = Object.keys(connectivityTypeValues);
        const connectivityTypeKey = connectivityTypeKeys[counter % connectivityTypeKeys.length];
        const ipAddress = connectivityTypeKey === "ethernet" ? getUniqueIP(counter) : "-";
        const simNo = connectivityTypeKey === "gprs" ? getUniqueSimNo(counter) : "-";
        const status = (counter % 2 === 0) ? "ON" : "OFF";
        const lastReportedTime = new Date(targetDate - (i * mockTimeDifference)).toLocaleString();
        rows.push({
            gatewayId: gatewayNumber,
            gatewayNumber,
            projectId: project.projectId,
            projectName: project.projectName,
            connectivityTypeValue: connectivityTypeKey,
            connectivityTypeDescription: connectivityTypeValues[connectivityTypeKey],
            ipAddress,
            simNo,
            status,
            lastReportedTime
        });
        counter++;
    }
}
exports.default = {
    rows
};
