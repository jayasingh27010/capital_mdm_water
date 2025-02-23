export type GatewaysDBDTO = {
    gatewayId: string
    gatewayNumber: string
    projectId: string,
    projectName: string,
    connectivityTypeValue: "gprs" | "ethernet",
    connectivityTypeDescription: "GPRS" | "Ethernet",
    ipAddress: string,
    simNo: string,
    status: string,
    lastReportedTime: string,
}