"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../../../utilities");
const projects_1 = __importDefault(require("../MockDBData/projects"));
const projects = (0, utilities_1.deepCopy)(projects_1.default).rows;
const NUM_TARRIF_GROUPS = 4;
const rows = [];
const targetDate = 1722409799433;
const mockTimeDifference = 1000 * 60 * 60 * 24;
const counterToTarrifGroup = (counter, project) => {
    const finalTimeStr = new Date(targetDate - (counter * mockTimeDifference)).toLocaleString();
    const tarrifExists = (counter + 1) % 2 === 0;
    return {
        id: `${project.projectId}_${counter + 1}`,
        tarrifGroupName: `TG${counter + 1} for ${project.projectName}`,
        tarrifGroupDescription: `TG${counter + 1} for ${project.projectName}`,
        projectId: project.projectId,
        projectName: project.projectName,
        tarrifId: tarrifExists ? `tarrif_${project.projectId}_${counter + 1}` : "",
        tarrifName: tarrifExists ? `Tarrif ${counter + 1} for ${project.projectName}` : "",
        createdAt: finalTimeStr,
    };
};
for (const project of projects) {
    for (let i = 0; i < NUM_TARRIF_GROUPS; i++) {
        rows.push(counterToTarrifGroup(i, project));
    }
}
exports.default = {
    rows
};
