import ProjectDetails from "./ProjectDetails"
import ProjectGateways from "./ProjectGateways"
import ProjectMeters from "./ProjectMeters"
import ProjectMetersTable from "./ProjectMetersTable"
import ProjectGraph from "./ProjectGraph"


const widgetMap: Record<string, any> = {
    "projectDetails": ProjectDetails,
    "projectMeters": ProjectMeters,
    "projectGateways": ProjectGateways,
    "projectMetersTable": ProjectMetersTable,
    "projectConsumptionGraph": ProjectGraph
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}