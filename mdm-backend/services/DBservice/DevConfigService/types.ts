export type MeterActionRequestDTO = {
    id: string
    meterId: string
    meterSerialNo: string
    projectId: string
    projectName: string
    actionName: string,
    value: string,
    status: string,
    lastReportedTime: string,
}