"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    config: {
        actions: {
            order: [
                "createUser",
            ],
            createUser: {
                label: 'Create User',
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
                        inputType: "textInput",
                        required: true
                    },
                    username: {
                        label: "Username",
                        columnSize: 6,
                        inputType: "textInput",
                        required: true
                    },
                    designation: {
                        label: "Designation",
                        columnSize: 6,
                        inputType: "selectInput",
                        required: true,
                        defaultOption: "-",
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
                        ]
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
                        isAutocomplete: true,
                        selectOptions: [
                            {
                                value: '',
                                description: "-",
                            }
                            //getProjects
                        ]
                    },
                }
            },
        }
    }
};
