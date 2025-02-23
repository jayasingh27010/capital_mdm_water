import TarrifDetails from "./TarrifDetails"

const widgetMap: Record<string, any> = {
    "tarrifDetails": TarrifDetails
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}