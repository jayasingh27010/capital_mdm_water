import AllDeviceConfigRequestsTable from "./AllDeviceConfigRequestsTable"
import DevConfigActions from "./DevConfigActions"

const widgetMap: Record<string, any> = {
    "devConfigActions": DevConfigActions,
    "viewAllDeviceConfigRequestsTable": AllDeviceConfigRequestsTable
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}