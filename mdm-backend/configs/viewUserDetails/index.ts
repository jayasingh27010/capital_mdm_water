export default {
    config: {
        label: 'User Details',
        actions: {
            order: [
                "editUser",
                "disableUser",
                // "deleteUser",
                "enableUser",
                // "editPermissions",
                "changePassword",
                "resetPassword"
            ],
            editUser: {
                label: 'Edit User',
                fields: {
                    order: [
                        "name",
                        "username",
                        "designation",
                        "email",
                        "mobileNo",
                        "projectName"
                    ],
                    name: {
                        label: "Name",
                        columnSize: 6,
                        disabled: true,
                        inputType: "textInput",
                        required: true
                    },
                    username: {
                        label: "Username",
                        columnSize: 6,
                        disabled: true,
                        inputType: "textInput",
                        required: true
                    },
                    designation: {
                        label: "Designation",
                        columnSize: 6,
                        defaultOption: 'admin',
                        selectOptions: [
                            {
                                value: '',
                                description: "-",
                            },
                            {
                                value: 'admin',
                                description: "Admin",
                            },
                            {
                                value: "vendingManager",
                                description: "Vending Manager"
                            },
                            {
                                value: "accountManager",
                                description: "Account Manager"
                            },
                            {
                                value: "operationManager",
                                description: "Operation Manager"
                            }
                        ],
                        inputType: "selectInput"
                    },
                    email: {
                        label: "Email",
                        columnSize: 6,
                        inputType: "textInput",
                        required: true
                    },
                    mobileNo: {
                        label: "Mobile No.",
                        columnSize: 6,
                        inputType: "textInput",
                        required: true
                    },
                    projectName: {
                        label: "Project Name",
                        columnSize: 6,
                        inputType: "selectInput",
                        required: true,
                        defaultOption: 'project1',
                        isAutocomplete: true,
                        disabled: true,
                        selectOptions: [
                            {
                                value: '',
                                description: "-",
                            }
                        ],
                    },
                },
                data: {
                    name: "Diganta Ray",
                    username: "diganta123",
                    designation: "admin",
                    email: "ray.diganta00@gmail.com",
                    mobileNo: "7042472125",
                    projectName: "project1"
                }
            },
            editPermissions: {
                label: "Edit Permissions"
            },
            disableUser: {
                label: "Disable User"
            },
            deleteUser: {
                label: "Delete User"
            },
            enableUser: {
                label: "Enable User"
            },
            changePassword: {
                label: "Change Password",
                fields: {
                    order: [
                        "oldPassword",
                        "newPassword",
                        "newPasswordAgain"
                    ],
                    oldPassword: {
                        label: "Old Password",
                        columnSize: 12,
                        inputType: "passwordInput",
                        required: true
                    },
                    newPassword: {
                        label: "New Password",
                        columnSize: 12,
                        inputType: "passwordInput",
                        required: true
                    },
                    newPasswordAgain: {
                        label: "Re-Enter New Password",
                        columnSize: 12,
                        inputType: "passwordInput",
                        required: true
                    }
                },
            },
            resetPassword: {
                label: "Reset Password"
            }
        },
        fields: {
            order: [
                "name",
                "userName",
                "designation",
                "email",
                "mobileNo",
                "projectName"
            ],
            name: {
                label: "Name",
                columnSize: 3,
                inputType: "text",
                isSingleLineInput: true,
                maxLength: 10
            },
            userName: {
                label: "Username",
                columnSize: 3,
                inputType: "text",
                isSingleLineInput: true,
                maxLength: 10
            },
            designation: {
                label: "Designation",
                columnSize: 3,
                inputType: "text",
                isSingleLineInput: true,
                maxLength: 10
            },
            email: {
                label: "Email",
                columnSize: 3,
                inputType: "text",
                isSingleLineInput: true,
                maxLength: 10
            },
            mobileNo: {
                label: "Mobile No.",
                columnSize: 3,
                inputType: "text",
                isSingleLineInput: true,
                maxLength: 10
            },
            projectName: {
                label: "Project Name",
                columnSize: 3,
                inputType:'text',
                maxLength: 10,
                isSingleLineInput: true
            }
        }
    },
    data: {
        
    }
}