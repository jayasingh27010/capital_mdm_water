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
export const viewGatewayActionsMock = () => {
    return {
        config: {
            actions: {
                order: [
                    "createGateway"
                ],
                createGateway: {
                    label: 'Add Gateway',
                    fields: {
                        order: [
                            "gatewayNumber",
                            "location",
                            "connectivityType",
                            "simNo",
                            "ipAddress"
                        ],
                        gatewayNumber: {
                            label: "Gateway Number",
                            columnSize: 6,
                            inputType: "textInput",
                            required: true
                        },
                        location: {
                            label: "Location",
                            columnSize: 6,
                            isAutocomplete: true,
                            inputType: "selectInput",
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                ...getProjects()
                            ]
                        },
                        connectivityType: {
                            label: "Connectivity Type",
                            columnSize: 6,
                            required: true,
                            inputType: "selectInput",
                            defaultOption: '-',
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'gprs',
                                    description: 'GPRS'
                                },
                                {
                                    value: 'ethernet',
                                    description: 'Ethernet'
                                }
                            ]
                        },
                        simNo: {
                            label: "SIM No",
                            columnSize: 6,
                            inputType: "textInput",
                            hide: true
                        },
                        ipAddress: {
                            label: "IP Address",
                            columnSize: 6,
                            inputType: "textInput",
                            hide: true
                        }
                    }
                }
            }
        }
    }
}


const allRows = [
    {
        id: 'gateway_1_id',
        gatewayNumber: '1110000000009817',
        location:'vasundhara',
        connectivityType:'GPRS',
        status:'ON',
        lastReportedTime:'12-06-2024',
        isLive: false
    },
    {
    id: 'gateway_2_id',
       gatewayNumber: '1110000000009818',
       location:'vasundhara',
        connectivityType:'GPRS',
        status:'OFF',
        lastReportedTime:'12-06-2024',
        isLive: false
    },
    {
        id: 'gateway_3_id',
        gatewayNumber: '1110000000009819',
        location:'vasundhara',
        connectivityType:'Internet',
        status:'ON',
        lastReportedTime:'12-06-2024',
        isLive: true
    },
    {
        id: 'gateway_4_id',
        gatewayNumber: '1110000000009820',
        location:'vasundhara',
        connectivityType:'Internet',
        status:'ON',
        lastReportedTime:'12-06-2024',
        isLive: false
    },
    {
        id: 'gateway_5_id',
        gatewayNumber: '1110000000009821',
        location:'vasundhara',
        connectivityType:'GPRS',
        status:'ON',
        lastReportedTime:'12-06-2024',
        isLive: false
    },
    {
        id: 'gateway_6_id',
        gatewayNumber: '1110000000009822',
        location:'vasundhara',
        connectivityType:'Internet',
        status:'OFF',
        lastReportedTime:'12-06-2024',
        isLive: true
    },
    {
        id: 'gateway_7_id',
        gatewayNumber: '1110000000009823',
        location:'vasundhara',
        connectivityType:'Internet',
        status:'ON',
        lastReportedTime:'12-06-2024',
        isLive: false
    },
    {
        id: 'gateway_8_id',
        gatewayNumber: '1110000000009824',
        location:'vasundhara',
        connectivityType:'GPRS',
        status:'ON',
        lastReportedTime:'12-06-2024',
        isLive: false
    },
    {
        id: 'gateway_9_id',
        gatewayNumber: '1110000000009825',
        location:'vasundhara',
        connectivityType:'GPRS',
        status:'ON',
        lastReportedTime:'12-06-2024',
        isLive: false
    },

]

export const viewAllGatewaysTableMock = (filters: any) => {
    const perPage = filters?.perPage ?? 1
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    let rows = [...allRows]
    if (filters.additionalFilters && filters.additionalFilters.length > 0) {
        const additionalFilters = filters.additionalFilters
        const gatewaysFilter = additionalFilters.find((filter: any) => (filter.filterType === 'gateways'))
        if (gatewaysFilter && gatewaysFilter.filterValue === 'live') {
            rows = rows.filter(row => row.isLive)
        }
    }
    if (filters.additionalFilters && filters.additionalFilters.length > 0) {
        const additionalFilters = filters.additionalFilters
        const gatewaysFilter = additionalFilters.find((filter: any) => (filter.filterType === 'gatewayNumberSearch'))
        if (gatewaysFilter && gatewaysFilter.filterValue) {
            rows = rows.filter(row => row.gatewayNumber)
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
            label: 'All Gateways',
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
                            value: 'gateways',
                            description: 'Gateways'
                        },
                        {
                            value: 'project',
                            description: 'Project'
                        },
                        // {
                        //     value: 'gatewayNumberSearch',
                        //     description: 'Gateway Number Search'
                        // },
                        {
                            value: 'q',
                            description: "Quick Search"
                        }
                    ]
                },
                filterValue: {
                    gateways: {
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
                            },
                            
                        ]
                    },
                    q: {
                        label: "Quick Search",
                        columnSize: 12,
                        inputType: "textInput"
                    },
                    project: {
                        label: "Filter Value",
                        columnSize: 12,
                        isAutocomplete: true,
                        inputType: "selectInput",
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            },
                            ...getProjects()
                        ]
                    },
                    gatewayNumberSearch: {
                        label: "Filter Value",
                        columnSize: 12,
                        inputType: "textInput"
                    }
                }
            },
            columns: {
                order: [
                    "gatewayNumber",
                    "location",
                    "connectivityType",
                    "status",
                    "lastReportedTime"
                    
                ],
                gatewayNumber : {
                    label: "Gateway Number",
                    renderType: "text",
                },
                location: {
                    label: "Location",
                    renderType: "text"
                },
                connectivityType: {
                    label: "Connectivity Type",
                    renderType: "text"
                },
                status: {
                    label: "Status",
                    renderType: "text"
                },
                lastReportedTime :{
                    label: "Last Reported Time",
                    renderType: "text"
                }

                
                
            }
        },
        data: {
            totalRecords: rows.length,
            rows: displayRows
        }
    }
}



