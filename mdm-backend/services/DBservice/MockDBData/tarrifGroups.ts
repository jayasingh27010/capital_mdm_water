import { deepCopy } from "../../../utilities"
import ProjectsMockDBData from "../MockDBData/projects"
import { ProjectDBDTO } from "../ProjectDBService/types"
import { TarrifGroupDBDTO } from "../TarrifsDBService/types"

const projects: ProjectDBDTO[] = deepCopy(ProjectsMockDBData).rows
const NUM_TARRIF_GROUPS = 4

const rows: TarrifGroupDBDTO[] = []
const targetDate: number = 1722409799433
const mockTimeDifference = 1000 * 60 * 60 * 24

const counterToTarrifGroup = (counter: number, project: ProjectDBDTO): TarrifGroupDBDTO => {
    const finalTimeStr = new Date(targetDate - (counter * mockTimeDifference)).toLocaleString()
    const tarrifExists = (counter+1) % 2 === 0 
    return {
        id: `${project.projectId}_${counter+1}`,
        tarrifGroupName: `TG${counter+1} for ${project.projectName}`,
        tarrifGroupDescription: `TG${counter+1} for ${project.projectName}`,
        projectId: project.projectId,
        projectName: project.projectName,
        tarrifId: tarrifExists ? `tarrif_${project.projectId}_${counter+1}`: "",
        tarrifName: tarrifExists ? `Tarrif ${counter+1} for ${project.projectName}`: "",
        createdAt: finalTimeStr,
    }
}

for (const project of projects) {
    for (let i = 0; i < NUM_TARRIF_GROUPS; i++) {
        rows.push(counterToTarrifGroup(i, project))
    }
}

export default {
    rows
}