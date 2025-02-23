import { config } from "src/config"
import { axiosInstance } from "src/api"
import { viewDashboardAuditLogTableMock, viewDashboardFinancialsDetailsMock, viewDashboardGatewayDetailsMock, viewDashboardMetersDetailsMock, viewDashboardProjectDetailsMock, viewDashboardUsersTableMock , viewServiceStatusTableMock } from "src/mock/Pages/Dashboard"
const { runMode } = config


type consumptionGraphParams = {
    year: string;
    userId: string;
    filter: string;
}

type consumptionGraphWeekly = {
    month: string;
    userId: string;
    filter: string
}

type consumptionGraphDaily = {
    userId: string;
    startDate: string;
    endDate: string;
    filter: string
}

export const viewDashboardProjectDetails = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewDashboardProjectDetailsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewDashboardProjectDetails", {})
}

export const viewDashboardGatewayDetails = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewDashboardGatewayDetailsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewDashboardGatewayDetails", {})
}

export const viewDashboardMetersDetails = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewDashboardMetersDetailsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewDashboardMetersDetails", {})

}
// DashboardFinancials

export const viewDashboardFinancialsDetails = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewDashboardFinancialsDetailsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewDashboardFinancialsDetails", {})
}

export const viewDashboardAuditLogTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewDashboardAuditLogTableMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewDashboardAuditLogTable", filters)
}

export const viewErrorLogTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewDashboardAuditLogTableMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewErrorLogTable", filters)
}

export const viewDashboardUsersTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewDashboardUsersTableMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewDashboardUsersTable", filters)
}

export const viewServiceStatusTable = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewServiceStatusTableMock();
                console.log("testing",response);
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewServiceStatusTable", {})
}


export const dashboardConsumptionMonthlyGraph= (params:consumptionGraphParams) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewServiceStatusTableMock();
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/dashboardConsumptionMonthly", {...params})
}

export const dashboardConsumptionWeeklyGraph= (params: consumptionGraphWeekly) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewServiceStatusTableMock();
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/dashboardConsumptionWeekly", {...params})
}

export const dashboardConsumptionDailyGraph= (param: consumptionGraphDaily) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewServiceStatusTableMock();
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/dashboardConsumptionDaily", {...param})
}


