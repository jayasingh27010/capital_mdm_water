import MeterDetails from "./MeterDetails"
import MeterDynamicParams from "./MeterDynamicParams"
import MeterFinancialsPrevMonth from "./MeterFinancialsPrevMonth"
import MeterFinancialsThisMonth from "./MeterFinancialsThisMonth"
import MeterPushDataTable from "./MeterPushDataTable"

const widgetMap: Record<string, any> = {
    "meterDetails": MeterDetails,
    "meterDynamicParams": MeterDynamicParams,
    "meterFinancialsPrevMonth": MeterFinancialsPrevMonth,
    "meterFinancialsThisMonth": MeterFinancialsThisMonth,
    "meterPushDataTable": MeterPushDataTable
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}