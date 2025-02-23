import AllGatewaysTable from "./AllGatewaysTable"
import GatewayActions from "./GatewayActions"

const widgetMap: Record<string, any> = {

    "allGatewaysTable": AllGatewaysTable,
    "gatewayActions": GatewayActions,
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}