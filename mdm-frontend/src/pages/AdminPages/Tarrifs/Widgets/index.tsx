import AllTarrifGroupsTable from "./AllTarrifGroupsTable"
import AllTarrifsTable from "./AllTarrifsTable"
import TarrifActions from "./TarrifActions"
import AllAttachTariffTable from "./AllAttachTariffTables"

const widgetMap: Record<string, any> = {
    "allTarrifsTable": AllTarrifsTable,
    "allTarrifGroupsTable": AllTarrifGroupsTable,
    "tarrifActions": TarrifActions,
    "allAttachTariffTables": AllAttachTariffTable
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}