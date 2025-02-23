export enum ModuleNameValues {
    users = "users",
    projects = "projects",
    consumers = "consumers",
    gateways = "gateways",
    tarrifs = "tarrifs"
}

export enum ModuleNameDescriptions {
    Users = "Users",
    Projects = "Projects",
    Consumers = "Consumers",
    Gateways = "Gateways",
    Tarrifs = "Tarrifs"
}

//User Actions
export enum UserActionValues {
    createUser = "createUser",
    enableUser = "enableUser",
    disableUser = "disableUser",
    editUser = "editUser",
    deleteUser = "deleteUser"
}

export enum UserActionDescriptions {
    CreateUser = "Create User",
    EnableUser = "Enable User",
    DisableUser = "Disable User",
    EditUser = "Edit User",
    DeleteUser = "Delete User"
}

//Project Actions
export enum ProjectActionValues {
    createProject = "createProject",
    enableProject = "enableProject",
    disableProject = "disableProject",
    editProject = "editProject",
    deleteProject = "deleteProject"
}

export enum ProjectActionDesctiptions {
    CreateProject = "Create Project",
    EnableProject = "Enable Project",
    DisableProject = "Disable Project",
    EditProject = "Edit Project",
    DeleteProject = "Delete Project"
}

export type AuditLogDBDTO = {
    auditLogId: string
    userId: string
    firstName: string
    moduleNameValue: ModuleNameValues
    moduleNameDescription: ModuleNameDescriptions
    actionNameValue: UserActionValues | ProjectActionValues
    actionNameDescription: UserActionDescriptions | ProjectActionDesctiptions,
    time: string,
}

export type AuditLogDBDTOD = {
    auditLogId: string
    userId: string
    firstName: string
    moduleNameValue: ModuleNameValues
    moduleNameDescription: ModuleNameDescriptions
    actionNameValue: UserActionValues | ProjectActionValues
    actionNameDescription: UserActionDescriptions | ProjectActionDesctiptions,
    time: string,
    description: string
}

export type LogInfoObj = {
    userId: string,
    userName: string,
    moduleNameValue: string,
    actionNameValue: string,
}