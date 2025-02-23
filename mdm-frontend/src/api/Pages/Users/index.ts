import { config } from "src/config"
import { axiosInstance } from "src/api"
import { viewAllUsersTableMock, viewEditUserPermissionsTableMock, viewSuperAdminGatewaysMock, viewSuperAdminProjectsMock, viewUserActionsMock, viewUserAuditLogTableMock, viewUserDetailsMock, viewUserUsersTableMock } from "src/mock/Pages/Users"
const { runMode } = config

export const viewUserActions = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewUserActionsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewUserActions")
}

export const viewAllUsersTable = (filters: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewAllUsersTableMock(filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewAllUsersTable", filters)
}

export const viewUserDetails = (id: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewUserDetailsMock(id)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewUserDetails", { id })
}

export const viewEditUserPermissionsTable = ({id, filters}: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewEditUserPermissionsTableMock(id, filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewEditUserPermissionsTable", { id })
}
export const viewSuperAdminProjects = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewSuperAdminProjectsMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewSuperAdminProjects", {})
}


export const viewSuperAdminGateways = () => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewSuperAdminGatewaysMock()
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewSuperAdminGateways", {})
}

export const viewUserAuditLogTable = ({id, filters}: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewUserAuditLogTableMock(id, filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewUserAuditLogTable", {id, filters})
}


export const viewUserUsersTable = ({id, filters}: any) => {
    if (runMode === 'dev') {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = viewUserUsersTableMock(id, filters)
                resolve(response)
            }, 1500)
        })
    }
    return axiosInstance().post("/viewUserUsersTableTable", {id, filters})
}