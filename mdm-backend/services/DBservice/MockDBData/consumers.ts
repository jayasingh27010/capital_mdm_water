import { createConsumerIdFromCounter, createConsumerNameFromCounter, createMeterSerialNoFromCounter } from "../../../mockUtilities"
import { deepCopy } from "../../../utilities"
import ProjectsMockData from "../MockDBData/projects"
import { ProjectDBDTO } from "../ProjectDBService/types"

const rows: any[] = []
let counter = 1

const projects: ProjectDBDTO[] = deepCopy(ProjectsMockData).rows
for (const project of projects) {
    for (let i = 0; i < 20; i++) {
        const meterId: string = [0, 1].includes(counter % 3) ? createMeterSerialNoFromCounter(counter) : ""
        const consumerId = createConsumerIdFromCounter(counter)
        const consumerName = createConsumerNameFromCounter(counter)
        const firstName = consumerName.split(" ")[0]
        const lastName = consumerName.split(" ")[1]
        rows.push({
            meterId,
            meterSerialNo: meterId,
            moduleNo: 'MOD-XXX',
            firstName,
            lastName,
            "address": "Vasundhara enclave",
            "connectionNo": "CN123456",
            "panNo": "A1B2C3D4E5",
            "gstNo": "12ABCDE3456F7Z8",
            "towerNo": "Tower A",
            "flatNo": "145",
            "shopNo": "S101",
            "mobileNo": "+912255225522",
            "emailId": "jaya.gusain27@gmail.com",
            "totalLoadGrid": "10 kW",
            "gridLoadR": "3.5 kW",
            "gridLoadY": "3 kW",
            "gridLoadB": "3.4 kW",
            "totalLoadDG": "8 kW",
            "DGLoadR": "2.7 kW",
            "DGLoadY": "2.6 kW",
            "DGLoadB": "2.6 kW",
            "installationDate": "22-06-2024",
            "openingBalance": "100 units",
            "consumptionReadingGrid": "250 units",
            "consumptionReadingDG": "200 units",
            "area": "1500",
            "flatType": "3BHK",
            tarrifGroupId: `${project.projectId}_${counter%4}`,
            tarrifGroup: `TG${(counter % 4)} for ${project.projectName}`,
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