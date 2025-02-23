import AllProjectsTable from "./AllProjectsTable"
import ProjectActions from "./ProjectActions"

const widgetMap: Record<string, any> = {
    "projectActions": ProjectActions,
    "allProjectsTable": AllProjectsTable
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}