export default {
    config: {
        id: "",
        label: `Edit Permissions`,
        defaultFilters: {
            currPage: 1,
            perPage: 5
        },
        columns: {
            order: [
                "view",
                "viewPermissions"
            ],
            view: {
                label: "View",
                renderType: "text",
            },
            viewPermissions: {
                label: "View Permissions",
                renderType: "editableSwitchFields"
            },
        }
    },
    data: {
        totalRecords: 7,
        rows: [
            {
                id: 'dashboard',
                view: 'Dashboard',
            },
            {
                id: 'users',
                view: 'Users',
                viewPermissions: {
                    config: {
                        fields: {
                            order: [
                                "createUser",
                                "viewUsers",
                            ],
                            createUser: {
                                label: "Create",
                                columnSize: 6,
                                inputType: "switchInput",
                                isSingleLineInput: true,
                            },
                            viewUsers: {
                                label: "View",
                                columnSize: 6,
                                inputType: "switchInput",
                                isSingleLineInput: true,
                            }
                        }
                    },
                    data: {
                        createUser: false,
                        viewUsers: false
                    }
                }
            },
            {
                id: 'meters',
                view: 'Meters',
                viewPermissions: {
                    config: {
                        fields: {
                            order: [
                                "addMeter",
                                "viewMeters",
                            ],
                            addMeter: {
                                label: "Add",
                                columnSize: 6,
                                inputType: "switchInput",
                                isSingleLineInput: true,
                            },
                            viewMeters: {
                                label: "View",
                                columnSize: 6,
                                inputType: "switchInput",
                                isSingleLineInput: true,
                            }
                        }
                    },
                    data: {
                        createUser: false,
                        viewUsers: false
                    }
                }
            },
            {
                id: 'gateways',
                view: 'Gateways'
            },
            {
                id: 'projects',
                view: 'Projects'
            },
            {
                id: 'devConfig',
                view: 'Device Configuration'
            },
            {
                id: 'settings',
                view: 'Settings'
            }
        ]
    }
}