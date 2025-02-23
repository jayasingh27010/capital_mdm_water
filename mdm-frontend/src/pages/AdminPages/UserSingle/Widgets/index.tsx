import SuperAdminGateways from "./SuperAdminGateways"
import SuperAdminProjects from "./SuperAdminProjects"
import UserAuditLogTable from "./UserAuditLogTable"
import UserDetails from "./UserDetails"
import UserUsersTable from "./UserUsersTable"

const widgetMap: Record<string, any> = {
    "userDetails": UserDetails,
    "superAdminProjects": SuperAdminProjects,
    "superAdminGateways": SuperAdminGateways,
    "userAuditLogTable": UserAuditLogTable,
    "userUsersTable": UserUsersTable
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}