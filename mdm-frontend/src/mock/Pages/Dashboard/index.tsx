export const viewDashboardGatewayDetailsMock = () => {
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
                    inputType: "filterAndLink",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                liveGateways: {
                    label: "Live Gateways",
                    columnSize: 3,
                    inputType: "filterAndLink",
                    isSingleLineInput: true,
                    maxLength: 10
                }
            }
        },
        data: {
            totalGateways: {
                // navigation to other page example
                link: '/admin/gateways',
                tableId: 'allGatewaysTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'gateways',
                            filterValue: 'total'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '320'
            },
            // totalProjects: '80',
            liveGateways: {
                link: '/admin/gateways',
                tableId: 'allGatewaysTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'gateways',
                            filterValue: 'live'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '300'
            },
        }
    }
}

export const viewDashboardProjectDetailsMock = () => {
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
                    inputType: "filterAndLink",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                liveProjects: {
                    label: "Live Projects",
                    columnSize: 3,
                    inputType: "filterAndLink",
                    isSingleLineInput: true,
                    maxLength: 10
                }
            }
        },
        data: {
            // totalProjects: {
            //     // navigation to same page
            //     link: '/admin/dashboard',
            //     tableId: 'dashboardAuditLogTable',
            //     tableFilters: {
            //         perPage: 10,
            //         currPage: 1
            //     },
            //     value: '80'
            // },
            totalProjects: {
                // navigation to other page example
                link: '/admin/projects',
                tableId: 'allProjectsTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'projects',
                            filterValue: 'total'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '80'
            },
            // totalProjects: '80',
            liveProjects: {
                link: '/admin/projects',
                tableId: 'allProjectsTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'projects',
                            filterValue: 'live'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '60'
            },
        }
    }
}

export const viewDashboardMetersDetailsMock = () => {
    return {
        config: {
            label: 'Meters',
            fields: {
                order: [
                    "total",
                    "down",
                    "unalloted",
                    "unstate",
                    "relayOff",
                    "lowBalance",
                    "overloaded"
                ],
                total: {
                    label: "Total",
                    columnSize: 3,
                    inputType: "filterAndLink",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                down: {
                    label: "Down",
                    columnSize: 3,
                    inputType: "filterAndLink",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                unalloted: {
                    label: "Un-Alloted",
                    columnSize: 3,
                    inputType: "filterAndLink",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                unstate: {
                    label: "Un-State",
                    columnSize: 3,
                    inputType: "filterAndLink",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                relayOff: {
                    label: "Relay Off",
                    columnSize: 3,
                    inputType: "filterAndLink",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                lowBalance: {
                    label: "Low Balance",
                    columnSize: 3,
                    inputType: "filterAndLink",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                overloaded: {
                    label: "Overloaded",
                    columnSize: 3,
                    inputType: "filterAndLink",
                    isSingleLineInput: true,
                    maxLength: 10
                }
            }
        },
        data: {
            total: {
                // navigation to other page example
                link: '/admin/meters',
                tableId: 'allMetersTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'meters',
                            filterValue: 'total'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '1000'
            },
            down: {
                // navigation to other page example
                link: '/admin/meters',
                tableId: 'allMetersTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'meters',
                            filterValue: 'down'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '60'
            },
            unalloted: {
                // navigation to other page example
                link: '/admin/meters',
                tableId: 'allMetersTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'meters',
                            filterValue: 'un-alloted'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '20'
            },
            unstate: {
                // navigation to other page example
                link: '/admin/meters',
                tableId: 'allMetersTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'meters',
                            filterValue: 'un-state'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '20'
            }, 
            relayOff: {
                // navigation to other page example
                link: '/admin/meters',
                tableId: 'allMetersTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'meters',
                            filterValue: 'relayOff'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '20'
            },
            lowBalance: {
                // navigation to other page example
                link: '/admin/meters',
                tableId: 'allMetersTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'meters',
                            filterValue: 'lowBalance'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '20'
            },
            overloaded: {
                // navigation to other page example
                link: '/admin/meters',
                tableId: 'allMetersTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'meters',
                            filterValue: 'overloaded'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '20'
            },
        }
    }
}

export const viewDashboardFinancialsDetailsMock = () => {
    return {
        config: {
            label: 'Financials',
            fields: {
                order: [
                    "openingBalance",
                    "currentBalance"
                ],
                openingBalance: {
                    label: "Opening Balance",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                currentBalance: {
                    label: "Current Balance",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                }
            }
        },
        data: {
            openingBalance: '₹2.5L',
            currentBalance: '₹2L'
        }
    }
}


const allAuditLogRows = [
    {
        id: 'user_1_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        activity: 'View Profile',
        time: '2mins ago'
    },
    {
        id: 'user_2_id',
        user: {
            label: 'Harsh',
            link: '/admin/users/harsh'
        },
        activity: 'View Profile',
        time: '2mins ago'
    },
    {
        id: 'user_3_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        activity: 'View Profile',
        time: '2mins ago'
    },
    {
        id: 'user_4_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        activity: 'View Profile',
        time: '2mins ago'
    },
    {
        id: 'user_5_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        activity: 'View Profile',
        time: '2mins ago'
    },
    {
        id: 'user_6_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        activity: 'View Profile',
        time: '2mins ago'
    },
    {
        id: 'user_7_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        activity: 'View Profile',
        time: '2mins ago'
    },
    {
        id: 'user_8_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        activity: 'View Profile',
        time: '2mins ago'
    },
    {
        id: 'user_9_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        activity: 'View Profile',
        time: '2mins ago'
    },
]

export const viewDashboardAuditLogTableMock = (filters: any) => {
    const perPage = filters?.perPage ?? 1
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    let rows = []
    if (startIndex > allAuditLogRows.length) {
        startIndex = 0
    }
    if (endIndex > allAuditLogRows.length) {
        endIndex = allAuditLogRows.length
    }
    rows = allAuditLogRows.slice(startIndex, endIndex)
    return {
        config: {
            label: 'Audit Log',
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
            totalRecords: allAuditLogRows.length,
            rows
        }
    }
}

const allUsersRows = [
    {
        id: 'user_1_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        assignedProject: {
            label: 'Vasundhara',
            link: '/admin/projects/Vasundhara'
        },
        actions: 'View / Manage'
    },
    {
        id: 'user_2_id',
        user: {
            label: 'Harsh',
            link: '/admin/users/harsh'
        },
        assignedProject: {
            label: 'Vasundhara',
            link: '/admin/projects/Vasundhara'
        },
        actions: 'View / Manage'
    },
    {
        id: 'user_3_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        assignedProject: {
            label: 'Vasundhara',
            link: '/admin/projects/Vasundhara'
        },
        actions: 'View / Manage'
    },
    {
        id: 'user_4_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        assignedProject: {
            label: 'Vasundhara',
            link: '/admin/projects/Vasundhara'
        },
        actions: 'View / Manage'
    },
    {
        id: 'user_5_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        assignedProject: {
            label: 'Vasundhara',
            link: '/admin/projects/Vasundhara'
        },
        actions: 'View / Manage'
    },
    {
        id: 'user_6_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        assignedProject: {
            label: 'Vasundhara',
            link: '/admin/projects/Vasundhara'
        },
        actions: 'View / Manage'
    },
    {
        id: 'user_7_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        assignedProject: {
            label: 'Vasundhara',
            link: '/admin/projects/Vasundhara'
        },
        actions: 'View / Manage'
    },
    {
        id: 'user_8_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        assignedProject: {
            label: 'Vasundhara',
            link: '/admin/projects/Vasundhara'
        },
        actions: 'View / Manage'
    },
    {
        id: 'user_9_id',
        user: {
            label: 'Diganta',
            link: '/admin/users/diganta'
        },
        assignedProject: {
            label: 'Vasundhara',
            link: '/admin/projects/Vasundhara'
        },
        actions: 'View / Manage'
    },
]

export const viewDashboardUsersTableMock = (filters: any) => {
    const perPage = filters?.perPage ?? 1
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    let rows = []
    if (startIndex > allUsersRows.length) {
        startIndex = 0
    }
    if (endIndex > allUsersRows.length) {
        endIndex = allUsersRows.length
    }
    rows = allUsersRows.slice(startIndex, endIndex)
    return {
        config: {
            label: 'Admin Users',
            defaultFilters: {
                currPage: 1,
                perPage: 5
            },
            columns: {
                order: [
                    "user",
                    "assignedProject",
                    "actions"
                ],
                user: {
                    label: "User",
                    renderType: "link",
                },
                assignedProject: {
                    label: "Assigned Project",
                    renderType: "link"
                },
                actions: {
                    label: "Actions",
                    renderType: "text"
                }
            }
        },
        data: {
            totalRecords: allUsersRows.length,
            rows
        }
    }
}


// const allServiceStatusRows = [
//     {
//         instanceId: "host.docker.internal:Database-Service:9097",
//         serviceName: "DATABASE-SERVICE",
//         status: "UP"
//     },
//     {
//         instanceId: "host.docker.internal:Database-Service:9097",
//         serviceName: "DATABASE-SERVICE",
//         status: "UP"
//     },
//     {
//         instanceId: "host.docker.internal:Database-Service:9097",
//         serviceName: "DATABASE-SERVICE",
//         status: "UP"
//     },
//     {
//         instanceId: "host.docker.internal:Database-Service:9097",
//         serviceName: "DATABASE-SERVICE",
//         status: "UP"
//     },
//     {
//         instanceId: "host.docker.internal:Database-Service:9097",
//         serviceName: "DATABASE-SERVICE",
//         status: "UP"
//     },
//     {
//         instanceId: "host.docker.internal:Database-Service:9097",
//         serviceName: "DATABASE-SERVICE",
//         status: "UP"
//     },
//     {
//         instanceId: "host.docker.internal:Database-Service:9097",
//         serviceName: "DATABASE-SERVICE",
//         status: "UP"
//     },
//     {
//         instanceId: "host.docker.internal:Database-Service:9097",
//         serviceName: "DATABASE-SERVICE",
//         status: "UP"
//     },
//     {
//         instanceId: "host.docker.internal:Database-Service:9097",
//         serviceName: "DATABASE-SERVICE",
//         status: "UP"
//     },
// ]

export const viewServiceStatusTableMock = () => {
    //const perPage = filters?.perPage ?? 1
    //const currPage = filters?.currPage ?? 1
    //let startIndex = perPage * (currPage-1)
    //let endIndex = startIndex + perPage
    // if (startIndex > allAuditLogRows.length) {
    //     startIndex = 0
    // }
    // if (endIndex > allAuditLogRows.length) {
    //     endIndex = allAuditLogRows.length
    // }
    // rows = allServiceStatusRows.slice(startIndex, endIndex)
    return {
        config: {
            label: 'Service Status',
            defaultFilters: {
                currPage: 1,
                perPage: 5
            },
            columns: {
                order: [
                    "instanceId",
                    "serviceName",
                    "status"
                ],
                instanceId: {
                    label: "User",
                    renderType: "text",
                },
                serviceName: {
                    label: "activity",
                    renderType: "text"
                },
                status: {
                    label: "Time",
                    renderType: "text"
                }
            }
        },
        // data: {
        //     totalRecords: allServiceStatusRows.length,
        //     rows
        // }
    }
}
