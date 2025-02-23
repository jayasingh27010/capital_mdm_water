import { GetPageRequestDTO } from "src/api/Pages";

const responses: any = {
    "/admin/users": {
        config: {
            label: [
                {
                    displayName: "Users",
                    isClickable: true,
                    clickPath: "/admin/users"
                }
            ],
            iconName: 'person',
            sections: {
                order: [
                    "userActions",
                    "allUsersTable"
                ],
                userActions: {
                    columnSize: 12
                },
                allUsersTable: {
                    columnSize: 12
                }
            }
        }
    },
    "/admin/dashboard": {
        config: {
            label: [
                {
                    displayName: "Dashboard",
                    isClickable: true,
                    clickPath: "/admin/dashboard"
                }
            ],
            iconName: 'home',
            sections: {
                order: [
                    "dashboardProjects",
                    "dashboardGateways",
                    "dashboardMeters",
                    "dashboardFinancials",
                    "dashboardAuditLogTable",
                    "dashboardUsersTable"
                ],
                dashboardProjects: {
                    columnSize: 6
                },
                dashboardGateways: {
                    columnSize: 6
                },
                dashboardMeters: {
                    columnSize: 12
                },
                dashboardFinancials: {
                    columnSize: 12
                },
                dashboardAuditLogTable: {
                    columnSize: 6
                },
                dashboardUsersTable: {
                    columnSize: 6
                }
            }
        }
    },
    "/admin/gateways":{
        config: {
            label:[
                {
                    displayName: "Gateways",
                    isClickable: true,
                    clickPath:  "/admin/gateways"
                }
            ],
            iconName: 'Link',
            sections: {
                order: [
                    "gatewayActions",
                    "allGatewaysTable",
                ],
                gatewayActions:{
                    columnSize: 12
                },
                allGatewaysTable: {
                    columnSize: 12
                }
            }
        }
    },
    "/admin/meters":{
        config: {
            label:[
                {
                    displayName: "Meters",
                    isClickable: true,
                    clickPath:  "/admin/meters"
                }
            ],
            iconName: 'speedometer',
            sections: {
                order: [
                    "meterActions",
                    "allMetersTable"
                ],
                meterActions: {
                    columnSize: 12
                },
                allMetersTable: {
                    columnSize: 12
                }
            }
        }
    },
    "/admin/projects":{
        config: {
            label:[
                {
                    displayName: "Projects",
                    isClickable: true,
                    clickPath:  "/admin/projects"
                }
            ],
            iconName: 'Document',
            sections: {
                order: [
                    "projectActions",
                    "allProjectsTable"
                ],
                projectActions: {
                    columnSize: 12
                },
                allProjectsTable: {
                    columnSize: 12
                }
            }
        }
    },
    "/admin/consumers":{
        config: {
            label:[
                {
                    displayName: "Consumers",
                    isClickable: true,
                    clickPath:  "/admin/consumers"
                }
            ],
            iconName: 'People',
            sections: {
                order: [
                    "consumerActions",
                    "allConsumersTable"
                ],
                consumerActions: {
                    columnSize: 12
                },
                allConsumersTable: {
                    columnSize: 12
                }
            }
        }
    },
    "/admin/tarrifs": {
        config: {
            label:[
                {
                    displayName: "Tarrifs",
                    isClickable: true,
                    clickPath:  "/admin/tarrifs"
                }
            ],
            iconName: 'BuildSharp',
            sections: {
                order: [
                    "tarrifActions",
                    "allTarrifGroupsTable",
                    "allTarrifsTable",
                ],
                allTarrifsTable: {
                    columnSize: 12
                },
                allTarrifGroupsTable: {
                    columnSize: 12
                },
                tarrifActions: {
                    columnSize: 12
                }
            }
        }
    },
    "/admin/deviceConfig":{
        config: {
            label:[
                {
                    displayName: "Device Configuration",
                    isClickable: true,
                    clickPath:  "/admin/deviceConfig"
                }
            ]
        }
    },
    "/admin/settings":{
        config: {
            label:[
                {
                    displayName: "Settings",
                    isClickable: true,
                    clickPath:  "/admin/settings"
                }
            ]
        }
    }
}

const singlePageResponses: any = {
    "/admin/users": (id: any) => {
        return {
            config: {
                id,
                label:[
                    {
                        displayName: "User",
                        isClickable: true,
                        clickPath:  "/admin/users"
                    },
                    {
                        displayName: id,
                        isClickable: true,
                        clickPath:  `/admin/users/${id}`
                    }
                ],
                iconName: 'person',
                sections: {
                    order: [
                        "userDetails",
                        "userAuditLogTable",
                        "userUsersTable"
                    ],
                    userDetails: {
                        columnSize: 12
                    },
                    superAdminProjects: {
                        columnSize: 6
                    },
                    superAdminGateways: {
                        columnSize: 6
                    },
                    userAuditLogTable: {
                        columnSize: 6
                    },
                    userUsersTable: {
                        columnSize: 6
                    }
                }
            }
        }
    },
    "/admin/meters": (id: any) => {
        return {
            config: {
                id,
                label:[
                    {
                        displayName: "Meters",
                        isClickable: true,
                        clickPath:  "/admin/meters"
                    },
                    {
                        displayName: id,
                        isClickable: true,
                        clickPath:  `/admin/meters/${id}`
                    }
                ],
                iconName: 'speedometer',
                sections: {
                    order: [
                        "meterDetails",
                        "meterDynamicParams",
                        "meterFinancialsPrevMonth",
                        "meterFinancialsThisMonth",
                        "meterPushDataTable"
                    ],
                    meterDetails: {
                        columnSize: 12
                    },
                    meterDynamicParams: {
                        columnSize: 12
                    },
                    meterFinancialsPrevMonth: {
                        columnSize: 12
                    },
                    meterFinancialsThisMonth: {
                        columnSize: 12
                    },
                    meterPushDataTable: {
                        columnSize: 12
                    }
                }
            }
        }
    },
    "/admin/projects": (id: any) => {
        return {
            config: {
                id,
                label:[
                    {
                        displayName: "Projects",
                        isClickable: true,
                        clickPath:  "/admin/projects"
                    },
                    {
                        displayName: id,
                        isClickable: true,
                        clickPath:  `/admin/projects/${id}`
                    }
                ],
                iconName: 'Document',
                sections: {
                    order: [
                        "projectDetails",
                        "projectMeters",
                        "projectGateways",
                        "projectMetersTable",
                        "projectConsumptionGraph"
                    ],
                    projectDetails: {
                        columnSize: 12
                    },
                    projectMeters: {
                        columnSize: 12
                    },
                    projectGateways: {
                        columnSize: 12
                    },
                    projectMetersTable: {
                        columnSize: 12
                    },
                    projectConsumptionGraph:{
                        columnSize: 12
                    }
                }
            }
        }
    },
    "/admin/consumers": (id: any) => {
        return {
            config: {
                id,
                label:[
                    {
                        displayName: "Consumers",
                        isClickable: true,
                        clickPath:  "/admin/consumers"
                    },
                    {
                        displayName: id,
                        isClickable: true,
                        clickPath:  `/admin/consumers/${id}`
                    }
                ],
                iconName: 'People',
                sections: {
                    order: [
                        "consumerDetails",
                        "meterStats",
                        "meterSanctionedLoad",
                        "meterCurrentConsumption",
                        "meterRechargesTable",
                        "ConsumptionChart"
                    ],
                    consumerDetails: {
                        columnSize: 12
                    },
                    meterStats: {
                        columnSize: 12
                    },
                    meterSanctionedLoad: {
                        columnSize: 12
                    },
                    meterCurrentConsumption: {
                        columnSize: 12
                    },
                    meterRechargesTable: {
                        columnSize: 12
                    },
                    ConsumptionChart: {
                        columnSize: 12
                    }
                }
            }
        }
    },
    "/admin/tarrifs": (id: any) => {
        return {
            config: {
                id,
                label:[
                    {
                        displayName: "Tarrifs",
                        isClickable: true,
                        clickPath:  "/admin/tarrifs"
                    },
                    {
                        displayName: id,
                        isClickable: true,
                        clickPath:  `/admin/tarrifs/${id}`
                    }
                ],
                iconName: 'BuildSharp',
                sections: {
                    order: [
                        "tarrifDetails",
                    ],
                    tarrifDetails: {
                        columnSize: 12
                    }
                }
            }
        }
    }
}

export const getPageMock = (params: GetPageRequestDTO) => {
    const path = params.pagePath
    const pathSplit = path.split("/")
    const isSinglePageResponse = pathSplit.length === 4
    if (isSinglePageResponse) {
        const lastIndex =  pathSplit.length - 1
        const route = pathSplit.slice(0, lastIndex).join("/")
        const idParam = pathSplit.slice(lastIndex).pop() ?? ""
        return singlePageResponses[route](idParam)
    }
    return responses[params.pagePath]
}

