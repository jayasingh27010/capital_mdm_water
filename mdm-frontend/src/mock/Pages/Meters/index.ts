export const viewMeterActionsMock = () => {
    return {
        config: {
            actions: {
                order: [
                    "createMeter",
                    "metersCSVUpload"
                ],
                createMeter: {
                    label: 'Add Meter',
                    fields: {
                        order: [
                            "meterSerialNo",
                            "moduleNo",
                            "phaseType",
                            "sourceType",
                            "consumptionType"
                        ],
                        meterSerialNo: {
                            label: "Enter Meter Serial No",
                            columnSize: 6,
                            inputType: "textInput",
                            required: true
                        },
                        moduleNo: {
                            label: "Enter Module No.",
                            columnSize: 6,
                            inputType: "textInput",
                            required: true
                        },
                        phaseType: {
                            label: "Select Phase Type",
                            columnSize: 6,
                            required: true,
                            inputType: "selectInput",
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'single',
                                    description: 'Single'
                                },
                                {
                                    value: 'threePhase',
                                    description: 'Three Phase'
                                },
                                {
                                    value: 'ht',
                                    description: 'HT'
                                },
                                {
                                    value: 'ct',
                                    description: 'CT'
                                },
                                {
                                    value: 'ltct',
                                    description: 'LTCT'
                                },
                            ]
                        },
                        sourceType: {
                            label: "Select Source Type",
                            columnSize: 6,
                            inputType: "selectInput",
                            required: true,
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'single',
                                    description: 'Single'
                                },
                                {
                                    value: 'dual',
                                    description: 'Dual'
                                }
                            ]
                        },  
                        consumptionType: {
                            label: "Select Consumption Type",
                            columnSize: 6,
                            inputType: "selectInput",
                            required: true,
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'gas',
                                    description: 'Gas'
                                },
                                {
                                    value: 'energy',
                                    description: 'Energy'
                                },
                                {
                                    value: 'water',
                                    description: 'Water'
                                },
                                {
                                    value: 'other',
                                    description: 'Other'
                                }

                            ]
                        },  


                    }
                    
                },
                metersCSVUpload: {
                    label: "Meter CSV Upload"
                }
            }
        }
    }
}

// viewMetersBulkUpload
export const viewMetersBulkUploadMock = () => {
    return {
        config: {
            tableId: "CSVMetersBulkUploadTable",
            errorTableId: "errorCSVMetersBulkUploadTable",
            // uploadNonce: uuid(),
            uploadNonce: "static nonce",
            uploadPath: "<static upload path>",
            sampleCSV: {
                rows: [
                    {
                        id: 1,
                        name: "Geeks",
                        profession: "developer"
                    },
                    {
                        id: 2,
                        name: "Geeks2",
                        profession: "developer2"
                    }
                ]
            },
            columns: {
                order: [
                    "id",
                    "name",
                    "profession"
                ],
                id: {
                    label: "ID",
                    renderType: "text"
                },
                name: {
                    label: "Name",
                    renderType: "text"
                },
                profession: {
                    label: "Profession",
                    renderType: "text"
                }
            }
        }
    }
}

export const viewMetersBulkUploadResultMock = (filters: any) => {
    //nonce should be available within filters
    // const nonce = filters.nonce
    const rows: any[] = [
        {
            id: 1,
            name: "Geeks",
            profession: "developer",
            error: "Duplicate Record"
        }
    ]

    const perPage = filters?.perPage ?? 5
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage - 1)
    let endIndex = startIndex + perPage
    if (startIndex > rows.length) {
        startIndex = 0
    }
    if (endIndex > rows.length) {
        endIndex = rows.length
    }
    const displayRows = rows.slice(startIndex, endIndex)

    return {
        config: {
            columns: {
                order: [
                    "id",
                    "name",
                    "profession",
                    "error"
                ],
                id: {
                    label: "ID",
                    renderType: "text"
                },
                name: {
                    label: "Name",
                    renderType: "text"
                },
                profession: {
                    label: "Profession",
                    renderType: "text"
                },
                error: {
                    label: "Error",
                    renderType: "text"
                }
            }
        },
        data: {
            rows: displayRows,
            totalRecords: rows.length
        }
    }
}


const allRows = [
    {
        id: 'meter_1_id',
        meterSerialNo: {
            label: 'CPS-00001',
            link: `/admin/meters/${encodeURIComponent("CPS-00001")}`
        },
        moduleNo :'342',
       phaseType:'Single',
       sourceType:'Dual',
       consumptionType:'Gas'
    },
    {
        id: 'meter_2_id',
        meterSerialNo: {
            label: 'CPS-00002',
            link: `/admin/meters/${encodeURIComponent("CPS-00002")}`
        },
        moduleNo :'342',
        phaseType:'Single',
        sourceType:'Dual',
        consumptionType:'Gas'
    },
    {
        id: 'meter_3_id',
        meterSerialNo: {
            label: 'CPS-00003',
            link: `/admin/meters/${encodeURIComponent("CPS-00003")}`
        },
        moduleNo :'342',
        phaseType:'Single',
        sourceType:'Dual',
        consumptionType:'Gas'
    },
    {
        id: 'meter_4_id',
        meterSerialNo: {
            label: 'CPS-00004',
            link: `/admin/meters/${encodeURIComponent("CPS-00004")}`
        },
        moduleNo :'342',
        phaseType:'Single',
        sourceType:'Dual',
        consumptionType:'Gas'
    },
    {
        id: 'meter_5_id',
        meterSerialNo: {
            label: 'CPS-00005',
            link: `/admin/meters/${encodeURIComponent("CPS-00005")}`
        },
        moduleNo :'342',
        phaseType:'Single',
        sourceType:'Dual',
        consumptionType:'Gas'
    },
    {
        id: 'meter_6_id',
        meterSerialNo: {
            label: 'CPS-00006',
            link: `/admin/meters/${encodeURIComponent("CPS-00006")}`
        },
        moduleNo :'342',
        phaseType:'Single',
        sourceType:'Dual',
        consumptionType:'Gas'
    },
    {
        id: 'meter_7_id',
        meterSerialNo: {
            label: 'CPS-00007',
            link: `/admin/meters/${encodeURIComponent("CPS-00007")}`
        },
        moduleNo :'342',
        phaseType:'Single',
        sourceType:'Dual',
        consumptionType:'Gas'
    },
    {
        id: 'meter_8_id',
        meterSerialNo: {
            label: 'CPS-00008',
            link: `/admin/meters/${encodeURIComponent("CPS-00008")}`
        },
        moduleNo :'342',
        phaseType:'Single',
        sourceType:'Dual',
        consumptionType:'Gas'
    },
    {
        id: 'meter_9_id',
        meterSerialNo: {
            label: 'CPS-00009',
            link: `/admin/meters/${encodeURIComponent("CPS-00009")}`
        },
        moduleNo :'342',
        phaseType:'Single',
        sourceType:'Dual',
        consumptionType:'Gas'
    },
   
]

export const viewAllMetersTableMock = (filters: any) => {
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
            label: 'All Meters',
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
                            description: 'Meters'
                        },
                        {
                            value: 'q',
                            description: "Quick Search"
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
                                value: 'un-alloted',
                                description: 'Un-alloted'
                            },
                            {
                                value: 'un-state',
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
                        ]
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
                    "meterSerialNo",
                    "moduleNo",
                    "phaseType",
                    "sourceType",
                    "consumptionType"
                ],
                meterSerialNo : {
                    label: "Meter Serial No",
                    renderType: "link",
                },
                moduleNo: {
                    label: "Module No.",
                    renderType: "text"
                },
                phaseType: {
                    label: "Phase Type",
                    renderType: "text"
                },
                sourceType: {
                    label: "Source Type",
                    renderType: "text"
                },
                consumptionType: {
                    label: "Consumption Type",
                    renderType: "text"
                },
            }
        },
        data: {
            totalRecords: allRows.length,
            rows
        }
    }
}

export const viewMeterDetailsMock = (id: any) => {
    return {
        config: {
            label: 'Meter Details',
            fields: {
                order: [
                    "meterSerialNo",
                    "moduleNo",
                    "phaseType",
                    "sourceType",
                    "consumptionType"
                ],
                meterSerialNo: {
                    label: "Meter Serial No",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                moduleNo: {
                    label: "Module No.",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                phaseType: {
                    label: "Phase Type",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                sourceType: {
                    label: "Source Type",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                consumptionType: {
                    label: "Consumption Type",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                }
            },
            actions: {
                order: [
                    "editMeter"
                ],
                editMeter: {
                    label: "Edit Meter",
                    fields: {
                        order: [
                            "meterSerialNo",
                            "moduleNo",
                            "phaseType",
                            "sourceType",
                            "consumptionType"
                        ],
                        meterSerialNo: {
                            label: "Meter Serial No",
                            columnSize: 6,
                            disabled: true,
                            inputType: "textInput",
                        },
                        moduleNo: {
                            label: "Module No",
                            columnSize: 6,
                            inputType: "textInput",
                        },
                        phaseType: {
                            label: "Select Phase Type",
                            columnSize: 6,
                            required: true,
                            inputType: "selectInput",
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'single',
                                    description: 'Single'
                                },
                                {
                                    value: 'threePhase',
                                    description: 'Three Phase'
                                },
                                {
                                    value: 'ht',
                                    description: 'HT'
                                },
                                {
                                    value: 'ct',
                                    description: 'CT'
                                },
                                {
                                    value: 'ltct',
                                    description: 'LTCT'
                                },
                            ]
                        },
                        sourceType: {
                            label: "Select Source Type",
                            columnSize: 6,
                            inputType: "selectInput",
                            required: true,
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'single',
                                    description: 'Single'
                                },
                                {
                                    value: 'dual',
                                    description: 'Dual'
                                }
                            ]
                        },  
                        consumptionType: {
                            label: "Select Consumption Type",
                            columnSize: 6,
                            inputType: "selectInput",
                            required: true,
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'gas',
                                    description: 'Gas'
                                },
                                {
                                    value: 'energy',
                                    description: 'Energy'
                                },
                                {
                                    value: 'water',
                                    description: 'Water'
                                },
                                {
                                    value: 'other',
                                    description: 'Other'
                                }

                            ]
                        },  
                    },
                    data: {
                        id,
                        meterSerialNo: "CPS-0001",
                        moduleNo: "hgdhjfgjh",
                        phaseType: "single",
                        sourceType: "single",
                        consumptionType: "gas"
                    }
                }
            }
        },
        data: {
            meterSerialNo: id,
            moduleNo: '234',
            phaseType:'Single',
            sourceType:'dual',
            consumptionType: 'Gas'
        }
    }
}

// viewMeterDynamicParams

export const viewMeterDynamicParamsMock = (id: any) => {
    console.log(id)
    return {
        config: {
            label: 'Meter Dynamic Params',
            fields: {
                order: [
                    "relay",
                    "meterHealth"
                ],
                relay: {
                    label: "Relay",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                meterHealth: {
                    label: "Meter Health",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                }
            }
        },
        data: {
            relay: 'ON',
            meterHealth: 'EXCELLENT'
        }
    }
}

// viewMeterFinancialPrevMonthMock

export const viewMeterFinancialPrevMonthMock = (id: any) => {
    console.log(id)
    return {
        config: {
            label: 'Financials (Prev Month)',
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

export const viewMeterFinancialThisMonthMock = (id: any) => {
    console.log(id)
    return {
        config: {
            label: 'Financials (This Month)',
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

// viewMetersPushDataTableMock

const meterPushDataRows = [
    {
        id: 'meter_1_id',
        meterSerialNo: {
            label: 'CPS-00001',
            link: `/admin/meters/${encodeURIComponent("CPS-00001")}`
        },
        powerFactor: '100',
        cumulativeWh: '9999999',
        cumulativeVah: '9999999',
        overloadStatus: '2'
    },
    {
        id: 'meter_2_id',
        meterSerialNo: {
            label: 'CPS-00001',
            link: `/admin/meters/${encodeURIComponent("CPS-00001")}`
        },
        powerFactor: '100',
        cumulativeWh: '9999999',
        cumulativeVah: '9999999',
        overloadStatus: '2'
    },
    {
        id: 'meter_3_id',
        meterSerialNo: {
            label: 'CPS-00001',
            link: `/admin/meters/${encodeURIComponent("CPS-00001")}`
        },
        powerFactor: '100',
        cumulativeWh: '9999999',
        cumulativeVah: '9999999',
        overloadStatus: '2'
    },
    {
        id: 'meter_4_id',
        meterSerialNo: {
            label: 'CPS-00001',
            link: `/admin/meters/${encodeURIComponent("CPS-00001")}`
        },
        powerFactor: '100',
        cumulativeWh: '9999999',
        cumulativeVah: '9999999',
        overloadStatus: '2'
    },
    {
        id: 'meter_5_id',
        meterSerialNo: {
            label: 'CPS-00001',
            link: `/admin/meters/${encodeURIComponent("CPS-00001")}`
        },
        powerFactor: '100',
        cumulativeWh: '9999999',
        cumulativeVah: '9999999',
        overloadStatus: '2'
    },
    {
        id: 'meter_6_id',
        meterSerialNo: {
            label: 'CPS-00001',
            link: `/admin/meters/${encodeURIComponent("CPS-00001")}`
        },
        powerFactor: '100',
        cumulativeWh: '9999999',
        cumulativeVah: '9999999',
        overloadStatus: '2'
    },
    {
        id: 'meter_7_id',
        meterSerialNo: {
            label: 'CPS-00001',
            link: `/admin/meters/${encodeURIComponent("CPS-00001")}`
        },
        powerFactor: '100',
        cumulativeWh: '9999999',
        cumulativeVah: '9999999',
        overloadStatus: '2'
    },
    {
        id: 'meter_8_id',
        meterSerialNo: {
            label: 'CPS-00001',
            link: `/admin/meters/${encodeURIComponent("CPS-00001")}`
        },
        powerFactor: '100',
        cumulativeWh: '9999999',
        cumulativeVah: '9999999',
        overloadStatus: '2'
    },
    {
        id: 'meter_9_id',
        meterSerialNo: {
            label: 'CPS-00001',
            link: `/admin/meters/${encodeURIComponent("CPS-00001")}`
        },
        powerFactor: '100',
        cumulativeWh: '9999999',
        cumulativeVah: '9999999',
        overloadStatus: '2'
    }
]

export const viewMetersPushDataTableMock = (id: any, filters: any) => {
    const perPage = filters?.perPage ?? 1
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    let rows = []
    if (startIndex > meterPushDataRows.length) {
        startIndex = 0
    }
    if (endIndex > meterPushDataRows.length) {
        endIndex = meterPushDataRows.length
    }
    rows = meterPushDataRows.slice(startIndex, endIndex)
    return {
        config: {
            id,
            label: `${id} Meter Push Data`,
            defaultFilters: {
                currPage: 1,
                perPage: 5
            },
            columns: {
                order: [
                    "meterSerialNo",
                    "powerFactor",
                    "cumulativeWh",
                    "cumulativeVah",
                    "overloadStatus"
                ],
                meterSerialNo: {
                    label: "Meter Serial No",
                    renderType: "link",
                },
                powerFactor: {
                    label: "Power Factor",
                    renderType: "text"
                },
                // cumulativeWh: {
                //     label: "Cumulative Wh",
                //     renderType: "text"
                // },
                // cumulativeVah: {
                //     label: "Cumulative Vah",
                //     renderType: "text"
                // },
                overloadStatus: {
                    label: "Overload Status",
                    renderType: "text"
                }
            }
        },
        data: {
            totalRecords: meterPushDataRows.length,
            rows: rows.map((row: any) => ({
                ...row,
                meterSerialNo: {
                    label: id,
                    link: `/admin/meters/${encodeURIComponent(id)}`
                }
            }))
        }
    }
}