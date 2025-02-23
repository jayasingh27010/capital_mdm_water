import DashboardAuditLogTable from "./DashboardAuditLogTable"
import DashboardFinancials from "./DashboardFinancials"
import DashboardGateways from "./DashboardGateways"
import DashboardMeters from "./DashboardMeters"
import DashboardProjects from "./DashboardProjects"
import DashboardUsersTable from "./DashboardUsersTable"
import ServiceStatusTable from "./ServiceStatusTable"
import DashboardGraph from "./DashboardGraph"


const widgetMap: Record<string, any> = {

    "dashboardProjects": DashboardProjects,
    "dashboardGateways": DashboardGateways,
    "dashboardMeters": DashboardMeters,
    "dashboardFinancials": DashboardFinancials,
    "dashboardAuditLogTable": DashboardAuditLogTable,
    "dashboardUsersTable": DashboardUsersTable,
    "serviceStatusTable": ServiceStatusTable,
    "dashboardGraph":DashboardGraph
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}