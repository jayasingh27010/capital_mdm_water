export type ConsumerDBDTO = {
    consumerId: string
    crnNo: string,
    consumerName: string
    firstName: string
    lastName: string
    address: string
    connectionNo: string,
    panNo: string,
    gstNo: string,
    towerNo: string,
    flatNo: string,
    flatType: string,
    shopNo: string,
    mobileNo: string,
    email: string,
    totalLoadGrid: string,
    gridLoadR: string,
    gridLoadY: string,
    gridLoadB: string,
    totalLoadDG: string,
    DGLoadR: string,
    DGLoadY: string,
    DGLoadB: string,
    installationDate: string,
    openingBalance: string,
    area: string,
    consumptionReadingGridkwh: string,
    consumptionReadingDGkwh: string,
    consumptionReadingGridkvah: string,
    consumptionReadingDGkvah: string,
    project: string,
    tarrifGroupId: string,
    tarrifGroup: string,
    meterId: string
    projectId: string
    projectName: string
    meterSerialNo: string
    isVVIP: string
    meterSNo:string
    enabled: boolean
}

export type ConsumerRechargeDBDTO = {
    rechargeId: string
    consumerId: string
    meterId: string
    meterSerialNo: string
    rechargeDate: string
    rechargeAmount: string
}