export type UserDBDTO = {
    userId: string;
    accountTypeValue: "superAdmin" | "admin" | "vendingManager" | "accountManager" | "operationManager",
    accountTypeDescription: "Super Admin" | "Admin" | "Vending Manager" | "Account Manager" | "Operation Manager",
    accessLevel: number;
    changePasswordToken?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    mobileNo?: string;
    userName: string;
    password: string;
    projectId?: string;
    projectName?: string;
    enabled: boolean
}