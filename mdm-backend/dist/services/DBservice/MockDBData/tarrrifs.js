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
const counterToTarrif = (counter, project) => {
    const finalTimeStr = new Date(targetDate - (counter * mockTimeDifference)).toLocaleString();
    const containsFixedCharges = (counter + 1) % 2 === 0;
    const unitOrSlab = (counter + 1) % 2 === 0 ? "unit" : "slab";
    const tarrifGroupExists = (counter + 1) % 2 === 0;
    let returnObj = {
        id: `tarrif_${project.projectId}_${counter + 1}`,
        tarrifGroupId: tarrifGroupExists ? `${project.projectId}_${counter + 1}` : "",
        tarrifGroupName: tarrifGroupExists ? `TG${counter + 1} for ${project.projectName}` : "",
        projectId: project.projectId,
        projectName: project.projectName,
        tarrifName: `Tarrif ${counter + 1} for ${project.projectName}`,
        tarrifDescription: "",
        containsFixedCharges,
        unitOrSlab,
        slabs: [],
        fixedCharges: [],
        createdAt: finalTimeStr,
    };
    if (unitOrSlab === "unit") {
        returnObj = Object.assign(Object.assign({}, (0, utilities_1.deepCopy)(returnObj)), { dGUnitRate: "10", dGUnitTax1: "6", dGUnitTax2: "0", dGUnitTax3: "0", gridUnitRate: "10", gridUnitTax1: "5", gridUnitTax2: "0", gridUnitTax3: "0" });
    }
    else {
        returnObj = Object.assign(Object.assign({}, (0, utilities_1.deepCopy)(returnObj)), { slabs: [
                {
                    "id": "9e9317c0-fdc2-48b3-bca7-66b957c4d91b",
                    "slabType": "dG",
                    "slabLimit": "10",
                    "slabRate": "9",
                    "tax1": "1",
                    "tax2": "2",
                    "tax3": "4"
                },
                {
                    "id": "9e9317c0-fdc2-48b3-bca7-66b957c4d91b",
                    "slabType": "dG",
                    "slabLimit": "30",
                    "slabRate": "12",
                    "tax1": "1",
                    "tax2": "2",
                    "tax3": "4"
                },
                {
                    "id": "9e9317c0-fdc2-48b3-bca7-66b957c4d91b",
                    "slabType": "dG",
                    "slabLimit": "100",
                    "slabRate": "15",
                    "tax1": "1",
                    "tax2": "2",
                    "tax3": "4"
                },
                {
                    "id": "9e9317c0-fdc2-48b3-bca7-66b957c4d91b",
                    "slabType": "grid",
                    "slabLimit": "18",
                    "slabRate": "9",
                    "tax1": "1",
                    "tax2": "2",
                    "tax3": "4"
                },
                {
                    "id": "9e9317c0-fdc2-48b3-bca7-66b957c4d91b",
                    "slabType": "grid",
                    "slabLimit": "30",
                    "slabRate": "10",
                    "tax1": "1",
                    "tax2": "2",
                    "tax3": "4"
                },
                {
                    "id": "9e9317c0-fdc2-48b3-bca7-66b957c4d91b",
                    "slabType": "grid",
                    "slabLimit": "50",
                    "slabRate": "16",
                    "tax1": "1",
                    "tax2": "2",
                    "tax3": "4"
                },
            ] });
    }
    if (containsFixedCharges) {
        returnObj = Object.assign(Object.assign({}, (0, utilities_1.deepCopy)(returnObj)), { fixedCharges: [
                {
                    "id": "7081cdcf-f4f6-4f01-a8cd-7d3882472790",
                    "fixedChargeType": "areaSqft",
                    "chargeName": "Charg1 ",
                    "charge": "6",
                    "tax1": "1",
                    "tax2": "12",
                    "tax3": "3"
                }
            ] });
    }
    return returnObj;
};
for (const project of projects) {
    for (let i = 0; i < NUM_TARRIF_GROUPS; i++) {
        rows.push(counterToTarrif(i, project));
    }
}
exports.default = {
    rows
};
