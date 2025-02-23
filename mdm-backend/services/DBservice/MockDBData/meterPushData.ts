import { createConsumerIdFromCounter, createConsumerNameFromCounter, createMeterSerialNoFromCounter } from "../../../mockUtilities"
import { deepCopy } from "../../../utilities"
import MetersMockData from "../MockDBData/meters"
import { MeterDBDTO } from "../MetersDBService/types"

const rows: any[] = []
let counter = 1
const targetDate: number = 1722409799433
const NUM_PROJECTS = 20
const NUM_PUSHES = 100
const PUSH_TIME_DIFFERENCE = 5 * 60 * 1000
const ID_TEMPLATE = "PUSH-0000"
const ID_TEMPLATE_LENGTH: number = ID_TEMPLATE.length

const getIdFromCounter = (counter: number): string => {
    const counterStr = String(counter)
    const counterStringLen: number = counterStr.length
    return `${ID_TEMPLATE.slice(0, ID_TEMPLATE_LENGTH-counterStringLen)}${counterStr}`
}

const meters: MeterDBDTO[] = deepCopy(MetersMockData).rows
for (const meter of meters) {
    for (let i = 0; i < NUM_PUSHES; i++) {
        const recieveTime = targetDate - (i * PUSH_TIME_DIFFERENCE)
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
        })
        counter++
    }
}
export default {
    rows
}