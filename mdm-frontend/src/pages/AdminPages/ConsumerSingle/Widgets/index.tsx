import ConsumerDetails from "./ConsumerDetails"
import MeterCurrentConsumption from "./MeterCurrentConsumption"
import MeterRechargesTable from "./MeterRechargesTable"
import MeterSanctionedLoad from "./MeterSanctionedLoad"
import MeterStats from "./MeterStats"
import MeterCurrentMonthConsumption from "./MeterCurrentMonthConsumption"
import ConsumptionChart from "./Graph"

const widgetMap: Record<string, any> = {
    "consumerDetails": ConsumerDetails,
    "meterStats": MeterStats,
    "meterSanctionedLoad": MeterSanctionedLoad,
    "meterCurrentConsumption": MeterCurrentConsumption,
    "meterRechargesTable": MeterRechargesTable,
    "meterCurrentMonthConsumption": MeterCurrentMonthConsumption,
    "ConsumptionChart": ConsumptionChart
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}