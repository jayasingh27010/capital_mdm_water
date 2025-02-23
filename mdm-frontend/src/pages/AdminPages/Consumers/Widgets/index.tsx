import AllConsumersTable from "./AllConsumersTable"
import ConsumerActions from "./ConsumerActions"

const widgetMap: Record<string, any> = {
    "consumerActions": ConsumerActions,
    "allConsumersTable": AllConsumersTable
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}