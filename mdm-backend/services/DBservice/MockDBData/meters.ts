import { createConsumerIdFromCounter, createConsumerNameFromCounter, createMeterSerialNoFromCounter } from "../../../mockUtilities"
import { deepCopy } from "../../../utilities"
import ProjectsMockData from "../MockDBData/projects"
import { ProjectDBDTO } from "../ProjectDBService/types"

const rows: any[] = []
let counter = 1


const phaseTypeValues: any = {
    "single": "Single",
    "threePhase": "Three Phase",
    "ht": "HT",
    "ct": "CT",
    "ltct": "LTCT"
}
const sourceTypeValues: any = {
    "single": "Single",
    "dual": "Dual"
}
const consumptionTypeValues: any = {
    "gas": "Gas",
    "energy": "Energy",
    "water": "Water",
    "other": "Other"
}
const projects: ProjectDBDTO[] = deepCopy(ProjectsMockData).rows
for (const project of projects) {
    for (let i = 0; i < 20; i++) {
        const meterId: string = createMeterSerialNoFromCounter(counter)
        const phaseTypeKeys = Object.keys(phaseTypeValues)
        const phaseTypeKey = phaseTypeKeys[counter % phaseTypeKeys.length]
        const sourceTypeKeys = Object.keys(sourceTypeValues)
        const sourceTypeKey = sourceTypeKeys[counter % sourceTypeKeys.length]
        const consumptionTypeKeys = Object.keys(consumptionTypeValues)
        const consumptionTypeKey = consumptionTypeKeys[counter % consumptionTypeKeys.length]
        const consumerId = [0, 1].includes(counter % 3) ? createConsumerIdFromCounter(counter): ""
        const consumerName = [0, 1].includes(counter % 3) ? createConsumerNameFromCounter(counter): ""
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
        })
        counter++
    }
}
export default {
    rows
}