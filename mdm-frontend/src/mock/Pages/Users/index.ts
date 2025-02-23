const getProjects = () => {
    const options: any[] = []
    for (let i = 0; i < 100; i++) {
        options.push({
            value: `project${i+1}`,
            description: `Project ${i+1}`,
        })
    }
    return options
}

export const viewUserActionsMock = () => {
    return {
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
                                },
                                ...getProjects()
                            ]
                        },
                    }
                },
            }
        }
    }
}

const allRows = [
    {
        id: 'user_1_id',
        name: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        designation:'Admin',
        email: 'ray.diganta00@gmail.com',
        mobileNo:'+912244224422',
        projectName: 'Project 1'
    },
    {
        id: 'user_2_id',
        name: {
            label: 'Harsh',
            link: '/admin/users/harsh'
        },
        designation:'Admin',
        email: 'harsh@gmail.com',
        mobileNo:'+912244224422',
        projectName: 'Project 2'
    },
    {
        id: 'user_3_id',
        name: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        designation:'Admin',
        email: 'ray.diganta00@gmail.com',
         mobileNo:'+912244224422',
        projectName: 'Project 3'
    },
    {
        id: 'user_4_id',
        name: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        designation:'Admin',
        email: 'ray.diganta00@gmail.com',
        mobileNo:'+912244224422',
        projectName: 'Project 4'
    },
    {
        id: 'user_5_id',
        name: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        designation:'Admin',
        email: 'ray.diganta00@gmail.com',
        mobileNo:'+912244224422',
        projectName: 'Project 5'
    },
    {
        id: 'user_6_id',
        name: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        designation:'Admin',
        email: 'ray.diganta00@gmail.com',
         mobileNo:'+912244224422',
        projectName: 'Project 6'
    },
    {
        id: 'user_7_id',
        name: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        designation:'Admin',
        email: 'ray.diganta00@gmail.com',
        mobileNo:'+912244224422',
        projectName: 'Project 7'

    },
    {
        id: 'user_8_id',
        name: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        designation:'Admin',
        email: 'ray.diganta00@gmail.com',
        mobileNo:'+912244224422',
        projectName: 'Project 8'
    },
    {
        id: 'user_9_id',
        name: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        designation:'Admin',
        email: 'ray.diganta00@gmail.com',
        mobileNo:'+912244224422',
        projectName: 'Project 9'
    },
]

export const viewAllUsersTableMock = (filters: any) => {
    const perPage = filters?.perPage ?? 5
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    let rows = []
    if (startIndex > allRows.length) {
        startIndex = 0
    }
    if (endIndex > allRows.length) {
        endIndex = allRows.length
    }
    rows = allRows.slice(startIndex, endIndex)
    return {
        config: {
            label: 'All Users',
            defaultFilters: {
                currPage: 1,
                perPage: 5
            },
            filterConfig: {
                filterType: {
                    label: "Filter Type",
                    columnSize: 12,
                    inputType: "selectInput",
                    selectOptions: [
                        {
                            value: '',
                            description: ''
                        },
                        {
                            value: 'userNameSearch',
                            description: 'User Name Search'
                        },
                        {
                            value: 'userEmailSearch',
                            description: 'User Email Search'
                        },
                        {
                            value: 'q',
                            description: "Quick Search"
                        }
                    ]
                },
                filterValue: {
                    userNameSearch: {
                        label: "Filter Value",
                        columnSize: 12,
                        inputType: "textInput"
                    },
                    userEmailSearch: {
                        label: "Filter Value",
                        columnSize: 12,
                        inputType: "textInput"
                    },
                    q: {
                        label: "Quick Search",
                        columnSize: 12,
                        inputType: "textInput"
                    }
                }
            },
            columns: {
                order: [
                    "name",
                    "designation",
                    "email",
                    "mobileNo",
                    "projectName",
                    "actions"
                ],
                name: {
                    label: "Name",
                    renderType: "link",
                },
                designation: {
                    label: "Designation",
                    renderType: "text",
                },
                email: {
                    label: "Email",
                    renderType: "text"
                },
                mobileNo: {
                    label:"Mobile NO.",
                    renderType:"text",
                 },
                 projectName: {
                    label: "Project Name",
                    renderType: "text"
                },
                actions: {
                    label: "Actions",
                    renderType: "text"
                }
            }
        },
        data: {
            totalRecords: allRows.length,
            rows
        }
    }
}

const idToUserInfoMapper: any = {
    'diganta': {
        name: 'Diganta',
        designation:'Admin',
        email: 'ray.diganta00@gmail.com',
        mobileNo: '+912255225522',
        projectName: {
            link: '/admin/projects/Project1',
            value: 'Project 1'
        },
    },
    'harsh': {
        name: 'Harsh',
        designation:'Super Admin',
        email: 'harsh.joshi@gmail.com',
        mobileNo: '+912255225522',
        projectName: 'Project 2'
    }
}

const permissionRows = () => [
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

export const viewEditUserPermissionsTableMock = (id: any, filters: any) => {
    const perPage = filters?.perPage ?? 5
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    let rows = []
    const prows = permissionRows()
    if (startIndex > prows.length) {
        startIndex = 0
    }
    if (endIndex > prows.length) {
        endIndex = prows.length
    }
    rows = prows.slice(startIndex, endIndex)
    return {
        config: {
            id,
            label: `${capitalizeFirstLetter(String(id).toLowerCase())} Permissions`,
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
            totalRecords: prows.length,
            rows
        }
    }
}

export const viewUserDetailsMock = (id: any) => {
    return {
        config: {
            label: 'User Details',
            actions: {
                order: [
                    "editUser",
                    "disableUser",
                    "deleteUser",
                    "enableUser",
                    "editPermissions"
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
                            disabled: true,
                            inputType: "textInput"
                        },
                        email: {
                            label: "Email",
                            columnSize: 6,
                            inputType: "textInput",
                            disabled: true,
                            required: true
                        },
                        mobileNo: {
                            label: "Mobile No.",
                            columnSize: 6,
                            inputType: "textInput",
                            disabled: true,
                            required: true
                        },
                        projectName: {
                            label: "Project Name",
                            columnSize: 6,
                            inputType: "selectInput",
                            required: true,
                            defaultOption: 'project1',
                            isAutocomplete: true,
                            selectOptions: [
                                {
                                    value: '',
                                    description: "-",
                                },
                                {
                                    value: 'project1',
                                    description: "Project 1",
                                },
                                {
                                    value: 'project2',
                                    description: "Project 2",
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
            },
            fields: {
                order: [
                    "name",
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
                    inputType:'link',
                    maxLength: 10,
                    isSingleLineInput: true
                }
            }
        },
        data: {
            ...(idToUserInfoMapper?.[id] ?? {})
        }
    }
}
// viewSuperAdminProjects

export const viewSuperAdminProjectsMock = () => {
    return {
        config: {
            label: 'Projects',
            fields: {
                order: [
                    "totalProjects",
                    "liveProjects"
                ],
                totalProjects: {
                    label: "Total Projects",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                liveProjects: {
                    label: "Live Projects",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                }
            }
        },
        data: {
            totalProjects: '80',
            liveProjects: '75'
        }
    }
}

// viewSuperAdminGateways

export const viewSuperAdminGatewaysMock = () => {
    return {
        config: {
            label: 'Gateways',
            fields: {
                order: [
                    "totalGateways",
                    "liveGateways"
                ],
                totalGateways: {
                    label: "Total Gateways",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                liveGateways: {
                    label: "Live Gateways",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                }
            }
        },
        data: {
            totalGateways: '80',
            liveGateways: '75'
        }
    }
}

// viewUserAuditLogTableMock
let allUserAuditLogRows = []
// let allUserAuditLogRows = [
//     {
//         id: 'user_1_id',
//         user: {
//             label: 'Diganta',
//             link: '/admin/users/diganta'
//         },
//         activity: 'View Profile',
//         time: '2mins ago'
//     },
//     {
//         id: 'user_2_id',
//         user: {
//             label: 'Diganta',
//             link: '/admin/users/diganta'
//         },
//         activity: 'View Profile',
//         time: '2mins ago'
//     },
//     {
//         id: 'user_3_id',
//         user: {
//             label: 'Diganta',
//             link: '/admin/users/diganta'
//         },
//         activity: 'View Profile',
//         time: '2mins ago'
//     },
//     {
//         id: 'user_4_id',
//         user: {
//             label: 'Diganta',
//             link: '/admin/users/diganta'
//         },
//         activity: 'View Profile',
//         time: '2mins ago'
//     },
//     {
//         id: 'user_5_id',
//         user: {
//             label: 'Diganta',
//             link: '/admin/users/diganta'
//         },
//         activity: 'View Profile',
//         time: '2mins ago'
//     },
//     {
//         id: 'user_6_id',
//         user: {
//             label: 'Diganta',
//             link: '/admin/users/diganta'
//         },
//         activity: 'View Profile',
//         time: '2mins ago'
//     },
//     {
//         id: 'user_7_id',
//         user: {
//             label: 'Diganta',
//             link: '/admin/users/diganta'
//         },
//         activity: 'View Profile',
//         time: '2mins ago'
//     },
//     {
//         id: 'user_8_id',
//         user: {
//             label: 'Diganta',
//             link: '/admin/users/diganta'
//         },
//         activity: 'View Profile',
//         time: '2mins ago'
//     },
//     {
//         id: 'user_9_id',
//         user: {
//             label: 'Diganta',
//             link: '/admin/users/diganta'
//         },
//         activity: 'View Profile',
//         time: '2mins ago'
//     },
// ]

for (let i = 0; i <= 100; i++) {
    allUserAuditLogRows.push({
        id: `user_${i+1}_id`,
        user: {
            label: `Diganta ${i+1}`,
            link: '/admin/users/diganta'
        },
        activity: 'View Profile',
        time: '2mins ago'
    })
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const viewUserAuditLogTableMock = (id: any, filters: any) => {
    const perPage = filters?.perPage ?? 1
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    let rows = []
    if (startIndex > allUserAuditLogRows.length) {
        startIndex = 0
    }
    if (endIndex > allUserAuditLogRows.length) {
        endIndex = allUserAuditLogRows.length
    }
    rows = allUserAuditLogRows.slice(startIndex, endIndex)
    return {
        config: {
            id,
            label: `${capitalizeFirstLetter(String(id).toLowerCase())} Audit Log`,
            defaultFilters: {
                currPage: 1,
                perPage: 5
            },
            columns: {
                order: [
                    "user",
                    "activity",
                    "time"
                ],
                user: {
                    label: "User",
                    renderType: "link",
                },
                activity: {
                    label: "activity",
                    renderType: "text"
                },
                time: {
                    label: "Time",
                    renderType: "text"
                }
            }
        },
        data: {
            totalRecords: allUserAuditLogRows.length,
            rows
        }
    }
}

// viewUserUsersTable

export const viewUserUsersTableMock = (id: any, filters: any) => {
    const perPage = filters?.perPage ?? 1
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    let rows = []
    if (startIndex > allRows.length) {
        startIndex = 0
    }
    if (endIndex > allRows.length) {
        endIndex = allRows.length
    }
    rows = allRows.slice(startIndex, endIndex)
    return {
        config: {
            id,
            label: `${capitalizeFirstLetter(String(id).toLowerCase())} Users`,
            defaultFilters: {
                currPage: 1,
                perPage: 5
            },
            columns: {
                order: [
                    "user",
                    "email",
                    "accountType",
                    "assignedProject",
                    "actions"
                    
                ],
                user: {
                    label: "User",
                    renderType: "link",
                },
                email: {
                    label: "Email",
                    renderType: "text"
                },
                accountType: {
                    label: "Account Type",
                    renderType: "text"
                },
                assignedProject: {
                    label: "Assigned Project",
                    renderType: "text"
                },
                actions: {
                    label: "Actions",
                    renderType: "text"
                }
            }
        },
        data: {
            totalRecords: allRows.length,
            rows
        }
    }
}