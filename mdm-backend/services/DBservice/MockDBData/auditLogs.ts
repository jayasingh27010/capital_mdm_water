import { deepCopy } from "../../../utilities"
import { AuditLogDBDTO } from "../AuditLogDBService/types"
import { UserDBDTO } from "../UserDBService/types"
import MockUsersData from "./users"

const users: UserDBDTO[] = deepCopy(MockUsersData).rows
const targetDate: number = 1722409799433
const rows: AuditLogDBDTO[] = []
const categories: any = {
    'users': {
        description: 'Users',
        actions: {
            createUser: {
                description: "Create User"
            },
            enableUser: {
                description: "Enable User"
            },
            disableUser: {
                description: "Disable User"
            },
            editUser: {
                description: "Edit User"
            },
            deleteUser: {
                description: "Delete User"
            }
        }
    },
    'projects': {
        description: 'Projects',
        actions: {
            createProject: {
                description: "Create Project"
            },
            enableProject: {
                description: "Enable Project"
            },
            disableProject: {
                description: "Disable Project"
            },
            editProject: {
                description: "Edit Project"
            },
            deleteProject: {
                description: "Delete Project"
            }
        }
    },
    'meters': {
        description: 'Meters',
        actions: {
            createMeter: {
                description: "Create Meter"
            },
            editMeter: {
                description: "Edit Meter"
            },
        }
    },
    'consumers': {
        description: 'Consumers',
        actions: {
            createConsumer: {
                description: "Create Consumer"
            },
            editConsumer: {
                description: "Edit Consumer"
            },
        }
    },
    'gateways': {
        description: 'Gateways',
        actions: {
            createGateway: {
                description: "Create Gateway"
            },
        }
    }
}

const createAuditLogRow = (
    auditLogId: string,
    user: UserDBDTO,
    firstName: any,
    moduleNameValue: any,
    actionNameValue: any,
    time: number
): AuditLogDBDTO => {
    const { userId } = user
    return {
        auditLogId,
        userId,
        firstName,
        moduleNameValue,
        moduleNameDescription: categories[moduleNameValue].description,
        actionNameValue,
        actionNameDescription: categories[moduleNameValue].actions[actionNameValue].description,
        time: new Date(time).toLocaleString()
    }
}
let counter = 1
const mockTimeDifference: number = 24 * 60 * 60 * 1000
for (const user of users) {
    const modules: string[] = Object.keys(categories)
    for (const module of modules) {
        const actions: string[] = Object.keys(categories[module].actions)
        for (const action of actions) {
            const time = targetDate - (counter * mockTimeDifference)
            rows.push(createAuditLogRow(`ALOG_${counter}`, user,user.firstName, module, action, time,))
            counter++
        }
    }
}

export default {
    rows
}