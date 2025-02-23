import { meterRechargeActions } from "./MeterRechargeActions"
import { manualRechargeTable } from "./AllMeterRechargeTable"
import { creditNoteTable } from "./CreditNoteTable"
import { debitNoteTable } from "./DebitNoteTable"

const widgetMap: Record<string, any> = {
    "meterRechargeActions": meterRechargeActions,
    "manualRechargeTable": manualRechargeTable,
    "creditNoteTable":creditNoteTable,
    "debitNoteTable":debitNoteTable
}

export const getWidget = (componentName: string) => {
    const component = widgetMap[componentName];
    if (!component) {
        console.error(`Component "${componentName}" not found in widgetMap.`);
    }
    return component;
};