import AllMetersTable from "./AllMetersTable"
import MeterActions from "./MeterActions"

const widgetMap: Record<string, any> = {
    "meterActions": MeterActions,
    "allMetersTable": AllMetersTable
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}