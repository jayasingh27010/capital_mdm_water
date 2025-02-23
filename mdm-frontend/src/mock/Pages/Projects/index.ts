export const viewProjectActionsMock = () => {
    return {
        config: {
            actions: {
                order: [
                    "createProject"
                ],
                createProject: {
                    label: 'Add Project',
                    fields: {
                        order: [
                            "projectName",
                            "projectAddress",
                            "projectCode",
                            "billingType",
                        ],
                        projectName: {
                            label: "Project Name",
                            columnSize: 6,
                            inputType: "textInput",
                            required: true
                        },
                        projectAddress: {
                            label: "Project Address",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        projectCode: {
                            label: "Project Code",
                            columnSize: 6,
                            inputType: "textInput",
                            required: true
                        },
                        billingType: {
                            label: "Billing Type",
                            columnSize: 6,
                            inputType: "selectInput",
                            required: true,
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'kWh',
                                    description: 'kWh'
                                },
                                {
                                    value: 'kVah',
                                    description: 'kVah'
                                }
                            ]
                        
                        }
                    }
                }
            }
        }
    }
}

const allRows = [
    {
        id: 'project_1_id',
        projectName: {
             link: '/admin/projects/Project1',
            label: 'Project 1'
        },
        projectAddress:'',
        projectCode:'0001',
        billingType:'kWh',
        isLive: false
        
    },
    {
        id: 'project_2_id',
        projectName: {
            link: '/admin/projects/Vardhaman',
            label: 'Vardhaman'
        },
        projectAddress:'',
        projectCode:'0001',
        billingType:'kWh',
        isLive: false
    },
    {
        id: 'project_3_id',
        projectName: {
            link: '/admin/projects/Vardhaman',
            label: 'Vardhaman'
        },
        projectAddress:'',
        projectCode:'0001',
        billingType:'kWh',
        isLive: false
    },
    {
        id: 'project_4_id',
        projectName: {
            link: '/admin/projects/Vardhaman',
            label: 'Vardhaman'
        },
        projectAddress:'',
        projectCode:'0001',
        billingType:'kWh',
        isLive: true
    },
    {
        id: 'project_5_id',
        projectName: {
            link: '/admin/projects/Vardhaman',
            label: 'Vardhaman'
        },
        projectAddress:'',
        projectCode:'0001',
        billingType:'kWh',
        isLive: true
    },
    {
        id: 'project_6_id',
        projectName: {
            link: '/admin/projects/Vardhaman',
            label: 'Vardhaman'
        },
        projectAddress:'',
        projectCode:'0001',
        billingType:'kWh',
        isLive: false
    },
    {
        id: 'project_7_id',
        projectName: {
            link: '/admin/projects/Vardhaman',
            label: 'Vardhaman'
        },
        projectAddress:'',
        projectCode:'0001',
        billingType:'kWh',
        isLive: false
    },
    {
        id: 'project_8_id',
        projectName: {
            link: '/admin/projects/Vardhaman',
            label: 'Vardhaman'
        },
        projectAddress:'',
        projectCode:'0001',
        billingType:'kWh',
        isLive: false
    },
    {
        id: 'project_9_id',
        projectName: {
            link: '/admin/projects/Vardhaman',
            label: 'Vardhaman'
        },
        projectAddress:'',
        projectCode:'0001',
        billingType:'kWh',
        isLive: false
    },
]



export const viewAllProjectsTableMock = (filters: any) => {
    const perPage = filters?.perPage ?? 1
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    let rows = [...allRows]
    if (filters.additionalFilters && filters.additionalFilters.length > 0) {
        const additionalFilters = filters.additionalFilters
        const projectsFilter = additionalFilters.find((filter: any) => (filter.filterType === 'projects'))
        if (projectsFilter && projectsFilter.filterValue === 'live') {
            rows = rows.filter(row => row.isLive)
        }
    }
    if (startIndex > rows.length) {
        startIndex = 0
    }
    if (endIndex > rows.length) {
        endIndex = rows.length
    }
    const displayRows = rows.slice(startIndex, endIndex)
    return {
        config: {
            label: 'All Projects',
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
                            value: 'projects',
                            description: 'Projects'
                        },
                        {
                            value: 'projectNameSearch',
                            description: 'Project Name Search'
                        },
                        {
                            value: 'q',
                            description: "Quick Search"
                        }
                    ]
                },
                filterValue: {
                    projects: {
                        label: "Filter Value",
                        columnSize: 12,
                        inputType: "selectInput",
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            },
                            {
                                value: 'total',
                                description: 'Total'
                            },
                            {
                                value: 'live',
                                description: 'Live'
                            }
                        ]
                    },
                    projectNameSearch: {
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
                    "projectName",
                    "projectAddress",
                    "projectCode",
                    "billingType",
                ],
                projectName : {
                    label: "Project Name",
                    renderType: "link",
                },
                projectAddress: {
                    label: "Project Address",
                    renderType: "editableText"
                },
                projectCode: {
                    label: "Project Code",
                    renderType: "text"
                },
                billingType: {
                    label: "Billing Type",
                    renderType: "text"
                },
                
               

            }
        },
        data: {
            totalRecords: rows.length,
            rows: displayRows
        }
    }
}


export const viewProjectDetailsMock = (id: any) => {
    return {
        config: {
            label: 'Project Details',
            actions: {
                order: [
                    "editProject",
                    "enableProject",
                    "disableProject",
                    "deleteProject",
                ],
                editProject: {
                    label: 'Edit Project',
                    fields: {
                        order: [
                            "projectName",
                            "projectAddress",
                            "projectCode",
                            "billingType"
                        ],
                        projectName: {
                            label: "Project Name",
                            columnSize: 6,
                            inputType: "textInput",
                            disabled: true,
                        },
                        projectAddress: {
                            label: "Project Address",
                            columnSize: 6,
                            inputType: "textInput",
                            
                        },
                        projectCode: {
                            label: "Project Code",
                            columnSize: 6,
                            inputType: "textInput",
                            disabled: true,
                        },
                        billingType: {
                            label: "Billing Type",
                            columnSize: 6,
                            disabled: true,
                            inputType: "selectInput",
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'kWh',
                                    description: 'kWh'
                                },
                                {
                                    value: 'kVah',
                                    description: 'kVah'
                                }
                            ]
                            
                        }
                    },
                    data: {
                        id,
                        projectName: 'Project 1',
                        projectAddress: 'project Address',
                        projectCode: '0001',
                        billingType: 'kWh',
                    }
                },
                disableProject: {
                    label: "Disable Project"
                },
                deleteProject: {
                    label: "Delete Project"
                },
                enableProject: {
                    label: "Enable Project"
                },
            },
            fields: {
                order: [
                    "projectName",
                    "projectAddress",
                    "projectCode",
                    "billingType"
                ],
                projectName: {
                    label: "Project Name",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                projectAddress: {
                    label: "Project Address",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                projectCode: {
                    label: "Project Code",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                billingType: {
                    label: "Billing Type",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                }
            }
        },
        data: {
            projectName: id,
            projectAddress: 'project Address',
            projectCode:'0001',
            billingType:'kWh',

        }
    }
}

// viewProjectMeters

export const viewProjectMetersMock = (_: any) => {
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
                
                link: '/admin/projects/project1',
                tableId: 'projectMetersTable',
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
                link: '/admin/projects/project1',
                tableId: 'projectMetersTable',
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
                link: '/admin/projects/project1',
                tableId: 'projectMetersTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'meters',
                            filterValue: 'unalloted'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '20'
            },
            unstate: {
                link: '/admin/projects/project1',
                tableId: 'projectMetersTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'meters',
                            filterValue: 'unstate'
                        }
                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '20'
            },
            relayOff: {
                link: '/admin/projects/project1',
                tableId: 'projectMetersTable',
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
                link: '/admin/projects/project1',
                tableId: 'projectMetersTable',
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
                link: '/admin/projects/project1',
                tableId: 'projectMetersTable',
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
            }
        }
    }
}

export const viewProjectGatewaysMock = (_: any) => {
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
                link: '/admin/gateways',
                tableId: 'allGatewaysTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'gateways',
                            filterValue: 'total'
                        },
                        {
                            filterType: 'project',
                            filterValue: 'project1'
                        }

                    ],
                    perPage: 5,
                    currPage: 1
                },
                value: '1000'
            },
            liveGateways: {
                link: '/admin/gateways',
                tableId: 'allGatewaysTable',
                tableFilters: {
                    additionalFilters: [
                        {
                            filterType: 'gateways',
                            filterValue: 'live'
                        },
                        {
                            filterType: 'project',
                            filterValue: 'project1'
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

const projectMeterRows = [
    {
        id: 'meter_1_id',
        meterSerialNo: {
            label: 'CPS-00001',
            link: `/admin/meters/${encodeURIComponent("CPS-00001")}`
        },
        project: {

        },
        consumerName : {
              label: 'Diganta Ray ',
              link: `/admin/consumers/${encodeURIComponent("Diganta Ray")}`
        },
        relayStatus : 'OFF'
    },
    {
        id: 'meter_2_id',
        meterSerialNo: {
            label: 'CPS-00002',
            link: `/admin/meters/${encodeURIComponent("CPS-00002")}`
        },
        project: {
            
        },
        consumerName : {
            label: 'Diganta Ray ',
            link: `/admin/consumers/${encodeURIComponent("Diganta Ray")}`
      },
      relayStatus : 'ON'
    },
    {
        id: 'meter_3_id',
        meterSerialNo: {
            label: 'CPS-00003',
            link: `/admin/meters/${encodeURIComponent("CPS-00003")}`
        },
        project: {
            
        },
        consumerName : {
            label: 'Diganta Ray ',
            link: `/admin/consumers/${encodeURIComponent("Diganta Ray")}`
      },
        relayStatus : 'OFF'
    },
    {
        id: 'meter_4_id',
        meterSerialNo: {
            label: 'CPS-00004',
            link: `/admin/meters/${encodeURIComponent("CPS-00004")}`
        },
        project: {
            
        },
        consumerName : {
            label: 'Diganta Ray ',
            link: `/admin/consumers/${encodeURIComponent("Diganta Ray")}`
       },
       relayStatus : 'ON'
    },
    {
        id: 'meter_5_id',
        meterSerialNo: {
            label: 'CPS-00005',
            link: `/admin/meters/${encodeURIComponent("CPS-00005")}`
        },
        project: {
            
        },
        consumerName : {
            label: 'Diganta Ray ',
            link: `/admin/consumers/${encodeURIComponent("Diganta Ray")}`
      },
      relayStatus : 'OFF'
    },
    {
        id: 'meter_6_id',
        meterSerialNo: {
            label: 'CPS-00006',
            link: `/admin/meters/${encodeURIComponent("CPS-00006")}`
        },
        project: {
            
        },
        consumerName : {
            label: 'Diganta Ray ',
            link: `/admin/consumers/${encodeURIComponent("Diganta Ray")}`
      },
      relayStatus : 'OFF'
    },
    {
        id: 'meter_7_id',
        meterSerialNo: {
            label: 'CPS-00007',
            link: `/admin/meters/${encodeURIComponent("CPS-00007")}`
        },
        project: {
            
        },
        consumerName : {
            label: 'Diganta Ray ',
            link: `/admin/consumers/${encodeURIComponent("Diganta Ray")}`
      },
      relayStatus : 'OFF'
    },
    {
        id: 'meter_8_id',
        meterSerialNo: {
            label: 'CPS-00008',
            link: `/admin/meters/${encodeURIComponent("CPS-00008")}`
        },
        project: {
            
        },
        consumerName : {
            label: 'Diganta Ray ',
            link: `/admin/consumers/${encodeURIComponent("Diganta Ray")}`
      },
      relayStatus : 'OFF'
    },
    {
        id: 'meter_9_id',
        meterSerialNo: {
            label: 'CPS-00009',
            link: `/admin/meters/${encodeURIComponent("CPS-00009")}`
        },
        project: {
            
        },
        consumerName : {
            label: 'Diganta Ray ',
            link: `/admin/consumers/${encodeURIComponent("Diganta Ray")}`
      },
      relayStatus : 'OFF'
    }
]

export const viewProjectMetersTableMock = (id: any, filters: any) => {
    const perPage = filters?.perPage ?? 1
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    let rows = []
    if (startIndex > projectMeterRows.length) {
        startIndex = 0
    }
    if (endIndex > projectMeterRows.length) {
        endIndex = projectMeterRows.length
    }
    rows = projectMeterRows.slice(startIndex, endIndex)
    return {
        config: {
            id,
            label: `Meters For ${id} `,
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
                            value: 'meters',
                            description: 'Meters '
                        }
                    ]
                },
                filterValue: {
                    meters: {
                        label: "Filter Value",
                        columnSize: 12,
                        inputType: "selectInput",
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            },
                            {
                                value: 'total',
                                description: 'Total'
                            },
                            {
                                value: 'down',
                                description: 'Down'
                            },
                            {
                                value: 'unalloted',
                                description: 'Un-alloted'
                            },
                            {
                                value: 'unstate',
                                description: 'Un-state'
                            },
                            {
                                value: 'relayOff',
                                description: 'Relay Off'
                            },
                            {
                                value: 'lowBalance',
                                description: 'Low Balance'
                            },
                            {
                                value: 'overloaded',
                                description: 'Overloaded'
                            },
                         ],
                
                        }
                    }
                },
            columns: {
                order: [
                    "meterSerialNo",
                    "project",
                    "consumerName",
                    "relayStatus"
                ],
                meterSerialNo: {
                    label: "Meter Serial No",
                    renderType: "link",
                },
                project: {
                    label: "Project",
                    renderType: "link"
                },
                consumerName: {
                    label: "Consumer Name",
                    renderType: "link"
                },
                relayStatus: {
                    label: "Relay Status ",
                    renderType: "text"
                },
            }
        },
        data: {
            totalRecords: projectMeterRows.length,
            rows: rows.map((row: any) => ({
                ...row,
                project: {
                    label: id,
                    link: `/admin/projects/${encodeURIComponent(id)}`
                }
            }))
        }
    }
}