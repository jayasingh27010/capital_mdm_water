const getProjects = () => {
    const options: any[] = []
    for (let i = 0; i < 100; i++) {
        options.push({
            value: `project${i + 1}`,
            description: `Project ${i + 1}`,
        })
    }
    return options
}
const getTarrifGroups = () => {
    const options: any[] = []
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 4; j++) {
            options.push({
                forProject: `project${i + 1}`,
                value: `tg${j + 1}p${i + 1}`,
                description: `TG ${j + 1} for P${i + 1}`,
            })
        }
    }
    return options
}
export const viewConsumerActionsMock = () => {
    return {
        config: {
            actions: {
                order: [
                    "addConsumer",
                    "addTarrifGroup",
                    "createTarrif",
                    "consumersCSVUpload"
                ],
                addConsumer: {
                    label: 'Add Consumer',
                    fields: {
                        order: [
                            "firstName",
                            "lastName",
                            "address",
                            "connectionNo",
                            "panNo",
                            "gstNo",
                            "towerNo",
                            "flatNo",
                            "flatType",
                            "shopNo",
                            "mobileNo",
                            "email",
                            "totalLoadGrid",
                            "gridLoadR",
                            "gridLoadY",
                            "gridLoadB",
                            "totalLoadDG",
                            "DGLoadR",
                            "DGLoadY",
                            "DGLoadB",
                            "installationDate",
                            "openingBalance",
                            "area",
                            "consumptionReadingGrid",
                            "consumptionReadingDG",
                            // "project",
                            "tarrifGroup"
                        ],
                        firstName: {
                            label: "First Name",
                            columnSize: 6,
                            inputType: "textInput",
                            required: true
                        },
                        lastName: {
                            label: "Last Name",
                            columnSize: 6,
                            inputType: "textInput",
                            required: true
                        },
                        address: {
                            label: "Address",
                            columnSize: 12,
                            inputType: "textInput"
                        },
                        connectionNo: {
                            label: "Connection No.",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        panNo: {
                            label: "PAN No.",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        gstNo: {
                            label: "GST No.",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        towerNo: {
                            label: "Tower No.",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        flatNo: {
                            label: "Flat No.",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        flatType: {
                            label: "Flat Type",
                            columnSize: 6,
                            inputType: "selectInput",
                            selectOptions: [
                                {
                                    value: "-",
                                    description: "-"
                                },
                                {
                                    value: "1bhk",
                                    description: "1 BHK"
                                },
                                {
                                    value: "2bhk",
                                    description: "2 BHK"
                                },
                                {
                                    value: "3bhk",
                                    description: "3 BHK"
                                },
                                {
                                    value: "4bhk",
                                    description: "4 BHK"
                                },
                                {
                                    value: "other",
                                    description: "Other"
                                },
                            ]
                        },
                        shopNo: {
                            label: "Shop No",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        mobileNo: {
                            label: "Mobile No.",
                            columnSize: 6,
                            inputType: "textInput",
                            required: true
                        },
                        email: {
                            label: "Email",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        totalLoadGrid: {
                            label: "Total Load Grid",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        gridLoadR: {
                            label: "GRID Load R",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        gridLoadY: {
                            label: "GRID Load Y",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        gridLoadB: {
                            label: "GRID Load B",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        totalLoadDG: {
                            label: "Total Load DG",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        DGLoadR: {
                            label: "DG Load R",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        DGLoadY: {
                            label: "DG Load Y",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        DGLoadB: {
                            label: "DG Load B",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        installationDate: {
                            label: "Installation Date",
                            columnSize: 6,
                            inputType: "dateInput"
                        },
                        openingBalance: {
                            label: "Opening Balance",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        consumptionReadingGrid: {
                            label: "Consumption Reading (For GRID)",
                            columnSize: 12,
                            inputType: "textInput"
                        },
                        consumptionReadingDG: {
                            label: "Consumption Reading (For DG)",
                            columnSize: 12,
                            inputType: "textInput"
                        },
                        area: {
                            label: "Area (Sq. ft)",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        project: {
                            label: "Project",
                            columnSize: 6,
                            isAutocomplete: true,
                            inputType: "selectInput",
                            selectOptions: [
                                {
                                    value: "-",
                                    description: "-"
                                },
                                ...getProjects()
                            ]
                        },
                        tarrifGroup: {
                            label: "Tarrif Group",
                            columnSize: 6,
                            isAutocomplete: true,
                            //  hide:true,
                            inputType: "selectInput",
                            selectOptions: [
                                {
                                    value: "-",
                                    description: "-"
                                },
                                ...getTarrifGroups()

                            ]
                        },
                    },
                },
                createTarrif: {
                    label: 'Create Tarrif',
                    fields: {
                        order: [
                            "tarrifName",
                            "tarrifDescription",
                            "containsFixedCharges",
                        ],
                        tarrifName: {
                            label: "Tarrif Name",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        tarrifDescription: {
                            label: "Tarrif Description",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        containsFixedCharges: {
                            label: "Has Fixed Charges?",
                            columnSize: 6,
                            inputType: "switchInput"
                        }
                    },
                    fixedChargeFields: {
                        order: [
                            "fixedChargeField1",
                            "fixedChargeField2",
                            "fixedChargeField3",
                            "fixedChargeField4",
                            "fixedChargeField5",
                            "fixedChargeField6",
                        ],
                        fixedChargeField1: {
                            label: "Fixed Chrg 1",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        fixedChargeField2: {
                            label: "Fixed Chrg 2",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        fixedChargeField3: {
                            label: "Fixed Chrg 3",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        fixedChargeField4: {
                            label: "Fixed Chrg 4",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        fixedChargeField5: {
                            label: "Fixed Chrg 5",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        fixedChargeField6: {
                            label: "Fixed Chrg 6",
                            columnSize: 6,
                            inputType: "textInput"
                        }
                    },
                    slabFields: {
                        order: [
                            "unitOrSlab",
                            "unitRate",
                        ],
                        unitOrSlab: {
                            label: "Tarrif Type",
                            columnSize: 6,
                            inputType: "selectInput",
                            selectOptions: [
                                {
                                    value: "-",
                                    description: "-"
                                },
                                {
                                    value: "unit",
                                    description: "Unit Rate"
                                },
                                {
                                    value: "slab",
                                    description: "Slab Rates"
                                }
                            ]
                        },
                        unitRate: {
                            label: "Unit Rate",
                            columnSize: 6,
                            inputType: "textInput",
                            hide: true,
                        }
                    }
                },
                addTarrifGroup: {
                    label: "Add Tarrif Group",
                    fields: {
                        order: [
                            "tarrifGroupName",
                            "tarrifGroupDescription",
                            "project"
                        ],
                        tarrifGroupName: {
                            label: "Tarrif Group Name",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        tarrifGroupDescription: {
                            label: "Tarrif Group Description",
                            columnSize: 6,
                            inputType: "textInput"
                        },
                        project: {
                            label: "Project",
                            columnSize: 6,
                            isAutocomplete: true,
                            inputType: "selectInput",
                            selectOptions: [
                                {
                                    value: "project1",
                                    description: "Project 1"
                                },
                                {
                                    value: "project2",
                                    description: "Project 2"
                                }
                            ]
                        }
                    }
                },
                consumersCSVUpload: {
                    label: "Consumer CSV Upload"
                }
            }
        }
    }
}

export const viewConsumersBulkUploadMock = () => {
    return {
        config: {
            tableId: "CSVConsumersBulkUploadTable",
            errorTableId: "errorCSVConsumersBulkUploadTable",
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

export const viewConsumersBulkUploadResultMock = (filters: any) => {
    //nonce should be available within filters
    // const nonce = filters.nonce
    return new Promise((resolve) => {
        setTimeout(() => {
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
            resolve({
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
            })
        }, 1000)
    })
}


const allRows = [
    {
        id: 'consumer_1_id',
        consumerName: {
            link: `/admin/consumers/${encodeURIComponent('Diganta Ray')}`,
            label: 'Diganta Ray'
        },
        address: 'Vasundhara enclave',
        connectionNo: 'CN123456',
        project: 'Project 1',
        panNo: 'A1B2C3D4E5',
        gstNo: '12ABCDE3456F7Z8',
        towerNo: 'Tower A',
        flatNo: '145',
        shopNo: 'S101',
        mobileNo: '+912255225522',
        emailId: 'jaya.gusain27@gmail.com',
        totalLoadGrid: '10 kW',
        gridLoadR: '3.5 kW',
        gridLoadY: '3 kW',
        gridLoadB: '3.4 kW',
        totalLoadDG: '8 kW',
        DGLoadR: '2.7 kW',
        DGLoadY: '2.6 kW',
        DGLoadB: '2.6 kW',
        installationDate: '22-06-2024',
        openingBalance: '100 units',
        consumptionReadingGrid: '250 units',
        consumptionReadingDG: '200 units',
        area: '1500',
        flatType: '3BHK'
    },
    {
        id: 'consumer_2_id',
        consumerName: {
            link: `/admin/consumers/${encodeURIComponent('Harshit Shrivastava')}`,
            label: 'Harshit Shrivastava'
        },
        address: 'Vasundhara enclave',
        connectionNo: 'CN123456',
        project: 'Project 2',
        panNo: 'A1B2C3D4E5',
        gstNo: '12ABCDE3456F7Z8',
        towerNo: 'Tower A',
        flatNo: '145',
        shopNo: 'S101',
        mobileNo: '+912255225522',
        emailId: 'jaya.gusain27@gmail.com',
        totalLoadGrid: '10 kW',
        gridLoadR: '3.5 kW',
        gridLoadY: '3 kW',
        gridLoadB: '3.4 kW',
        totalLoadDG: '8 kW',
        DGLoadR: '2.7 kW',
        DGLoadY: '2.6 kW',
        DGLoadB: '2.6 kW',
        installationDate: '22-06-2024',
        openingBalance: '100 units',
        consumptionReadingGrid: '250 units',
        consumptionReadingDG: '200 units',
        area: '1500',
        flatType: '3BHK'
    },
    {
        id: 'consumer_3_id',
        consumerName: {
            link: `/admin/consumers/${encodeURIComponent('Jaya Gusain')}`,
            label: 'Jaya Gusain'
        },
        address: 'Vasundhara enclave',
        connectionNo: 'CN123456',
        project: 'Project 3',
        panNo: 'A1B2C3D4E5',
        gstNo: '12ABCDE3456F7Z8',
        towerNo: 'Tower A',
        flatNo: '145',
        shopNo: 'S101',
        mobileNo: '+912255225522',
        emailId: 'jaya.gusain27@gmail.com',
        totalLoadGrid: '10 kW',
        gridLoadR: '3.5 kW',
        gridLoadY: '3 kW',
        gridLoadB: '3.4 kW',
        totalLoadDG: '8 kW',
        DGLoadR: '2.7 kW',
        DGLoadY: '2.6 kW',
        DGLoadB: '2.6 kW',
        installationDate: '22-06-2024',
        openingBalance: '100 units',
        consumptionReadingGrid: '250 units',
        consumptionReadingDG: '200 units',
        area: '1500',
        flatType: '3BHK'
    },
    {
        id: 'consumer_4_id',
        consumerName: {
            link: `/admin/consumers/${encodeURIComponent('Diganta Ray')}`,
            label: 'Diganta Ray'
        },
        address: 'Vasundhara enclave',
        connectionNo: 'CN123456',
        project: 'Project 1',
        panNo: 'A1B2C3D4E5',
        gstNo: '12ABCDE3456F7Z8',
        towerNo: 'Tower A',
        flatNo: '145',
        shopNo: 'S101',
        mobileNo: '+912255225522',
        emailId: 'jaya.gusain27@gmail.com',
        totalLoadGrid: '10 kW',
        gridLoadR: '3.5 kW',
        gridLoadY: '3 kW',
        gridLoadB: '3.4 kW',
        totalLoadDG: '8 kW',
        DGLoadR: '2.7 kW',
        DGLoadY: '2.6 kW',
        DGLoadB: '2.6 kW',
        installationDate: '22-06-2024',
        openingBalance: '100 units',
        consumptionReadingGrid: '250 units',
        consumptionReadingDG: '200 units',
        area: '1500',
        flatType: '3BHK'
    },
    {
        id: 'consumer_5_id',
        consumerName: {
            link: `/admin/consumers/${encodeURIComponent('Diganta Ray')}`,
            label: 'Diganta Ray'
        },
        address: 'Vasundhara enclave',
        connectionNo: 'CN123456',
        project: 'Project 2',
        panNo: 'A1B2C3D4E5',
        gstNo: '12ABCDE3456F7Z8',
        towerNo: 'Tower A',
        flatNo: '145',
        shopNo: 'S101',
        mobileNo: '+912255225522',
        emailId: 'jaya.gusain27@gmail.com',
        totalLoadGrid: '10 kW',
        gridLoadR: '3.5 kW',
        gridLoadY: '3 kW',
        gridLoadB: '3.4 kW',
        totalLoadDG: '8 kW',
        DGLoadR: '2.7 kW',
        DGLoadY: '2.6 kW',
        DGLoadB: '2.6 kW',
        installationDate: '22-06-2024',
        openingBalance: '100 units',
        consumptionReadingGrid: '250 units',
        consumptionReadingDG: '200 units',
        area: '1500',
        flatType: '3BHK'
    },
    {
        id: 'consumer_6_id',
        consumerName: {
            link: `/admin/consumers/${encodeURIComponent('Diganta Ray')}`,
            label: 'Diganta Ray'
        },
        address: 'Vasundhara enclave',
        connectionNo: 'CN123456',
        project: 'Project 1',
        panNo: 'A1B2C3D4E5',
        gstNo: '12ABCDE3456F7Z8',
        towerNo: 'Tower A',
        flatNo: '145',
        shopNo: 'S101',
        mobileNo: '+912255225522',
        emailId: 'jaya.gusain27@gmail.com',
        totalLoadGrid: '10 kW',
        gridLoadR: '3.5 kW',
        gridLoadY: '3 kW',
        gridLoadB: '3.4 kW',
        totalLoadDG: '8 kW',
        DGLoadR: '2.7 kW',
        DGLoadY: '2.6 kW',
        DGLoadB: '2.6 kW',
        installationDate: '22-06-2024',
        openingBalance: '100 units',
        consumptionReadingGrid: '250 units',
        consumptionReadingDG: '200 units',
        area: '1500',
        flatType: '3BHK'
    },
    {
        id: 'consumer_7_id',
        consumerName: {
            link: `/admin/consumers/${encodeURIComponent('Diganta Ray')}`,
            label: 'Diganta Ray'
        },
        address: 'Vasundhara enclave',
        connectionNo: 'CN123456',
        project: 'Project 2',
        panNo: 'A1B2C3D4E5',
        gstNo: '12ABCDE3456F7Z8',
        towerNo: 'Tower A',
        flatNo: '145',
        shopNo: 'S101',
        mobileNo: '+912255225522',
        emailId: 'jaya.gusain27@gmail.com',
        totalLoadGrid: '10 kW',
        gridLoadR: '3.5 kW',
        gridLoadY: '3 kW',
        gridLoadB: '3.4 kW',
        totalLoadDG: '8 kW',
        DGLoadR: '2.7 kW',
        DGLoadY: '2.6 kW',
        DGLoadB: '2.6 kW',
        installationDate: '22-06-2024',
        openingBalance: '100 units',
        consumptionReadingGrid: '250 units',
        consumptionReadingDG: '200 units',
        area: '1500',
        flatType: '3BHK'
    },
    {
        id: 'consumer_8_id',
        consumerName: {
            link: `/admin/consumers/${encodeURIComponent('Diganta Ray')}`,
            label: 'Diganta Ray'
        },
        address: 'Vasundhara enclave',
        connectionNo: 'CN123456',
        project: 'Project 1',
        panNo: 'A1B2C3D4E5',
        gstNo: '12ABCDE3456F7Z8',
        towerNo: 'Tower A',
        flatNo: '145',
        shopNo: 'S101',
        mobileNo: '+912255225522',
        emailId: 'jaya.gusain27@gmail.com',
        totalLoadGrid: '10 kW',
        gridLoadR: '3.5 kW',
        gridLoadY: '3 kW',
        gridLoadB: '3.4 kW',
        totalLoadDG: '8 kW',
        DGLoadR: '2.7 kW',
        DGLoadY: '2.6 kW',
        DGLoadB: '2.6 kW',
        installationDate: '22-06-2024',
        openingBalance: '100 units',
        consumptionReadingGrid: '250 units',
        consumptionReadingDG: '200 units',
        area: '1500',
        flatType: '3BHK'
    },
    {
        id: 'consumer_9_id',
        consumerName: {
            link: `/admin/consumers/${encodeURIComponent('Diganta Ray')}`,
            label: 'Diganta Ray'
        },
        address: 'Vasundhara enclave',
        connectionNo: 'CN123456',
        project: 'Project 1',
        panNo: 'A1B2C3D4E5',
        gstNo: '12ABCDE3456F7Z8',
        towerNo: 'Tower A',
        flatNo: '145',
        shopNo: 'S101',
        mobileNo: '+912255225522',
        emailId: 'jaya.gusain27@gmail.com',
        totalLoadGrid: '10 kW',
        gridLoadR: '3.5 kW',
        gridLoadY: '3 kW',
        gridLoadB: '3.4 kW',
        totalLoadDG: '8 kW',
        DGLoadR: '2.7 kW',
        DGLoadY: '2.6 kW',
        DGLoadB: '2.6 kW',
        installationDate: '22-06-2024',
        openingBalance: '100 units',
        consumptionReadingGrid: '250 units',
        consumptionReadingDG: '200 units',
        area: '1500',
        flatType: '3BHK'
    },
]



export const viewAllConsumersTableMock = (filters: any) => {
    const perPage = filters?.perPage ?? 1
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage - 1)
    let endIndex = startIndex + perPage
    let rows = [...allRows]
    if (startIndex > rows.length) {
        startIndex = 0
    }
    if (endIndex > rows.length) {
        endIndex = rows.length
    }
    const displayRows = rows.slice(startIndex, endIndex)
    return {
        config: {
            label: 'All Consumers',
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
                            value: 'consumerNameSearch',
                            description: 'Consumer Name Search'
                        },
                        {
                            value: 'q',
                            description: "Quick Search"
                        }
                    ]
                },
                filterValue: {
                    consumerNameSearch: {
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
                    "consumerName",
                    "address",
                    "connectionNo",
                    "project",
                    "panNo",
                    "gstNo",
                    "towerNo",
                    "flatNo",
                    "shopNo",
                    "mobileNo",
                    "emailId",
                    "totalLoadGrid",
                    "gridLoadR",
                    "gridLoadY",
                    "gridLoadB",
                    "totalLoadDG",
                    "DGLoadR",
                    "DGLoadY",
                    "DGLoadB",
                    "installationDate",
                    "openingBalance",
                    "consumptionReadingGrid",
                    "consumptionReadingDG",
                    "area",
                    "flatType"

                ],
                consumerName: {
                    label: "Consumer Name",
                    renderType: "link",
                },
                address: {
                    label: "Address",
                    renderType: "text"
                },
                connectionNo: {
                    label: "Connection No.",
                    renderType: "text"
                },
                project: {
                    label: "Project",
                    renderType: "text"
                },
                panNo: {
                    label: "Pan NO.",
                    renderType: "text"
                },
                gstNo: {
                    label: "GST NO.",
                    renderType: "text"
                },
                towerNo: {
                    label: "Tower NO.",
                    renderType: "text"
                },
                flatNo: {
                    label: "Flat NO.",
                    renderType: "text"
                },
                shopNo: {
                    label: "Shop NO.",
                    renderType: "text"
                },
                mobileNo: {
                    label: "Mobile No.",
                    renderType: "text"
                },
                emailId: {
                    label: "Email",
                    renderType: "text"
                },
                totalLoadGrid: {
                    label: "Total Load GRID",
                    renderType: "text"
                },
                gridLoadR: {
                    label: "GRID Load R",
                    renderType: "text"
                },
                gridLoadY: {
                    label: "GRID Load Y",
                    renderType: "text"
                },
                gridLoadB: {
                    label: "GRID Load B",
                    renderType: "text"
                },
                totalLoadDG: {
                    label: "Total Load DG",
                    renderType: "text"
                },
                DGLoadR: {
                    label: "DG Load R",
                    renderType: "text"
                },
                DGLoadY: {
                    label: "DG Load Y",
                    renderType: "text"
                },
                DGLoadB: {
                    label: "DG Load B",
                    renderType: "text"
                },
                installationDate: {
                    label: "Installation Date",
                    renderType: "text"
                },
                openingBalance: {
                    label: "Opening Balance",
                    renderType: "text"
                },
                consumptionReadingGrid: {
                    label: "Consumption Reading (For GRID)",
                    renderType: "text"
                },
                consumptionReadingDG: {
                    label: "Consumption Reading (For DG)",
                    renderType: "text"
                },
                area: {
                    label: "Area",
                    renderType: "text"
                },
                flatType: {
                    label: "Flat Type ",
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

export const viewConsumerDetailsMock = (id: any) => {
    return {
        config: {
            label: 'Consumer Details',
            actions: {
                order: [
                    "attachTarrifGroup",
                    "attachTarrif"
                ],
                attachTarrifGroup: {
                    label: 'Attach Tarrif Group',
                    fields: {
                        order: [
                            "tarrifGroup"
                        ],
                        tarrifGroup: {
                            label: "Tarrif Group",
                            columnSize: 6,
                            inputType: "selectInput",
                            isAutocomplete: true,
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'VAS 1',
                                    description: 'VAS 1'
                                },
                                {
                                    value: 'VAS 2',
                                    description: 'VAS 2'
                                },
                                {
                                    value: 'VAS 3',
                                    description: 'VAS 3'
                                },
                            ],
                            required: true
                        }
                    }
                },
                attachTarrif: {
                    label: 'Attach Tarrif',
                    fields: {
                        order: [
                            "tarrif"
                        ],
                        tarrif: {
                            label: "Tarrif",
                            columnSize: 6,
                            inputType: "selectInput",
                            isAutocomplete: true,
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'tarrif1',
                                    description: 'Tarrif 1'
                                },
                                {
                                    value: 'tarrif2',
                                    description: 'Tarrif 2'
                                },
                                {
                                    value: 'tarrif3',
                                    description: 'Tarrif 3'
                                },
                            ],
                            required: true
                        }
                    }
                }
            },
            fields: {
                order: [
                    "consumerName",
                    "address",
                    "connectionNo",
                    "panNo",
                    "gstNo",
                    "towerNo",
                    "flatNo",
                    "shopNo",
                    "mobileNo",
                    "emailId",
                    "totalLoadGrid",
                    "gridLoadR",
                    "gridLoadY",
                    "gridLoadB",
                    "totalLoadDG",
                    "DGLoadR",
                    "DGLoadY",
                    "DGLoadB",
                    "installationDate",
                    "openingBalance",
                    "consumptionReadingGrid",
                    "consumptionReadingDG",
                    "area",
                    "flatType"
                ],
                consumerName: {
                    label: "Consumer Name",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 15
                },
                address: {
                    label: "Address",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 17,
                    isSingleLineInput: true
                },
                connectionNo: {
                    label: "Connection No.",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                panNo: {
                    label: "Pan No.",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                gstNo: {
                    label: "GST No.",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 16,
                    isSingleLineInput: true
                },
                towerNo: {
                    label: "Tower No.",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                flatNo: {
                    label: "Flat No.",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                shopNo: {
                    label: "Shop No.",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                mobileNo: {
                    label: "Mobile No.",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                emailId: {
                    label: "Email",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 26,
                    isSingleLineInput: true
                },
                totalLoadGrid: {
                    label: "Total Load GRID",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                gridLoadR: {
                    label: "GRID Load R",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                gridLoadY: {
                    label: "GRID Load Y",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                gridLoadB: {
                    label: "GRID Load B",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                totalLoadDG: {
                    label: "Total Load DG",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                DGLoadR: {
                    label: "DG Load R",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                DGLoadY: {
                    label: "DG Load Y",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                DGLoadB: {
                    label: "DG Load B",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                installationDate: {
                    label: "Installation Date",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                openingBalance: {
                    label: "Opening Balance",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                consumptionReadingGrid: {
                    label: "Consumption Reading(GRID)",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                consumptionReadingDG: {
                    label: "Consumption Reading(DG)",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                area: {
                    label: "Area (Sq. ft)",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                flatType: {
                    label: "Flat Type",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },

            }
        },
        data: {
            consumerName: id,
            address: 'Vasundhara enclave',
            connectionNo: 'CN123456',
            panNo: 'A1B2C3D4E5',
            gstNo: '12ABCDE3456F7Z8',
            towerNo: 'Tower A',
            flatNo: '145',
            shopNo: 'S101',
            mobileNo: '+912255225522',
            emailId: 'jaya.gusain27@gmail.com',
            totalLoadGrid: '10 kW',
            gridLoadR: '3.5 kW',
            gridLoadY: '3 kW',
            gridLoadB: '3.4 kW',
            totalLoadDG: '8 kW',
            DGLoadR: '2.7 kW',
            DGLoadY: '2.6 kW',
            DGLoadB: '2.6 kW',
            installationDate: '22-06-2024',
            openingBalance: '100 units',
            consumptionReadingGrid: '250 units',
            consumptionReadingDG: '200 units',
            area: '1500',
            flatType: '3BHK'
        }
    }
}

export const viewMeterStatsMock = () => {
    return {
        config: {
            label: 'Meter Stats',
            fields: {
                order: [
                    "eBReading",
                    "dGReading",
                    "unit",
                    "meter",
                    "cutStatus",
                    "dG",
                    "currentLoad"
                ],
                eBReading: {
                    label: "EB Reading",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                dGReading: {
                    label: "DG Reading",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                unit: {
                    label: "Unit",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                meter: {
                    label: "Meter",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                cutStatus: {
                    label: "Cut Status",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                dG: {
                    label: "DG",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                currentLoad: {
                    label: "Current Load",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
            }
        },
        data: {
            eBReading: '6526.38kWh',
            dGReading: '302.46kWh',
            unit: 'LGF-01',
            meter: 'CPS-00001',
            cutStatus: 'Warning',
            dG: 'OFF',
            currentLoad: '0.0052kWh'
        }
    }
}

export const viewMeterSanctionedLoadMock = (id: any) => {
    console.log(id)
    return {
        config: {
            label: 'Sanctioned Load',
            fields: {
                order: [
                    "eBSanctionedLoad",
                    "dGSanctionedLoad",
                ],
                eBSanctionedLoad: {
                    label: "EB Sanctioned Load",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                dGSanctionedLoad: {
                    label: "DG Sanctioned Load",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                },
            }
        },
        data: {
            eBSanctionedLoad: '10.0KW',
            dGSanctionedLoad: '8.0KW'
        }
    }
}

export const viewMeterCurrentConsumptionMock = (id: any) => {
    console.log(id)
    return {
        config: {
            label: 'Current Consumption',
            fields: {
                order: [
                    "eBConsumption",
                    "dGConsumption",
                ],
                eBConsumption: {
                    label: "EB Consumption",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                dGConsumption: {
                    label: "DG Consumption",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                }
            }
        },
        data: {
            eBConsumption: '94.02kWh',
            dGConsumption: '0.09kWh'
        }
    }
}

const now = Date.now()
const oneMonth = 1000 * 60 * 60 * 24 * 31

let meterRecharges = [
    {
        id: 'meter_1_id',
        rechargeDate: '1 June 2024',
        rechargeAmount: '₹3000',
        rDate: now
    },
    {
        id: 'meter_2_id',
        rechargeDate: '1 May 2024',
        rechargeAmount: '₹3000',
        rDate: now - oneMonth
    },
    {
        id: 'meter_3_id',
        rechargeDate: '1 April 2024',
        rechargeAmount: '₹3000',
        rDate: now - (2 * oneMonth)
    },
    {
        id: 'meter_4_id',
        rechargeDate: '1 March 2024',
        rechargeAmount: '₹3000',
        rDate: now - (3 * oneMonth)
    },
    {
        id: 'meter_5_id',
        rechargeDate: '1 Feburary 2024',
        rechargeAmount: '₹3000',
        rDate: now - (4 * oneMonth)
    },
    {
        id: 'meter_6_id',
        rechargeDate: '1 January 2024',
        rechargeAmount: '₹3000',
        rDate: now - (5 * oneMonth)
    },
    {
        id: 'meter_7_id',
        rechargeDate: '1 December 2023',
        rechargeAmount: '₹3000',
        rDate: now - (6 * oneMonth)
    },
    {
        id: 'meter_8_id',
        rechargeDate: '1 November 2023',
        rechargeAmount: '₹3000',
        rDate: now - (7 * oneMonth)
    },
    {
        id: 'meter_9_id',
        rechargeDate: '1 October 2023',
        rechargeAmount: '₹3000',
        rDate: now - (8 * oneMonth)
    }
]

export const viewMeterRechargesTableMock = (id: any, filters: any) => {
    const perPage = filters?.perPage ?? 1
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage - 1)
    let endIndex = startIndex + perPage

    if (filters.additionalFilters && filters.additionalFilters.length > 0) {
        const additionalFilters = filters.additionalFilters
        const startDateFilter = additionalFilters.find((filter: any) => (filter.filterType === 'startDate'))
        if (startDateFilter) {
            meterRecharges = meterRecharges.filter(row => row.rDate > (1000 * startDateFilter.filterValue))
        }
        const endDateFilter = additionalFilters.find((filter: any) => (filter.filterType === 'endDate'))
        if (endDateFilter) {
            meterRecharges = meterRecharges.filter(row => row.rDate <= (1000 * endDateFilter.filterValue))
        }
    }
    let rows = []
    if (startIndex > meterRecharges.length) {
        startIndex = 0
    }
    if (endIndex > meterRecharges.length) {
        endIndex = meterRecharges.length
    }
    rows = meterRecharges.slice(startIndex, endIndex)
    return {
        config: {
            id,
            label: `Meter Recharges`,
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
                            value: 'startDate',
                            description: 'Start Date'
                        },
                        {
                            value: 'endDate',
                            description: 'End Date'
                        },
                    ]
                },
                filterValue: {
                    startDate: {
                        label: "Filter Value",
                        columnSize: 12,
                        inputType: "dateInput"
                    },
                    endDate: {
                        label: "Filter Value",
                        columnSize: 12,
                        inputType: "dateInput"
                    },
                    projectNameSearch: {
                        label: "Filter Value",
                        columnSize: 12,
                        inputType: "textInput"
                    }
                }
            },
            columns: {
                order: [
                    "rechargeDate",
                    "rechargeAmount"
                ],
                rechargeDate: {
                    label: "Recharge Date",
                    renderType: "text",
                },
                rechargeAmount: {
                    label: "Recharge Amount",
                    renderType: "text"
                }
            }
        },
        data: {
            totalRecords: meterRecharges.length,
            rows
        }
    }
}