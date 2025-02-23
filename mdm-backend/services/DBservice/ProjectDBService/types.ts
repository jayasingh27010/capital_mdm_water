export type ProjectDBDTO = {
    projectId: string,
    projectName: string,
    projectAddress: string,
    projectCode: string,
    projectBillingTypeValue: "liter" | "kvah",
    projectBillingTypeDescription: "liter" | "kVAh"
    enabled: boolean
    happyHoursList?: any[]
    holidaysList?: any[]
}