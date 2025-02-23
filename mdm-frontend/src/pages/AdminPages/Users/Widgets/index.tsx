import AllUsersTable from "./AllUsersTable"
import UserActions from "./UserActions"

const widgetMap: Record<string, any> = {
    "userActions": UserActions,
    "allUsersTable": AllUsersTable
}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}