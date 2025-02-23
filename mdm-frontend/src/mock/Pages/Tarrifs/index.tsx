
const allRows = [
    {
        id: 'user_1_id',
        name: {
            label: 'Tarrif 1',
            link: `/admin/tarrifs/${encodeURIComponent('tarrif 1')}`
        },
        tarrifType: 'Unit',
        project: {
            label: 'Vasundhara',
            link: `/admin/projects/Vasundhara`
        },
        tarrifGroup: {
            label: 'VAS 1',
            link: `/admin/tarrifGroups/${encodeURIComponent('VAS 1')}`
        }
    },
    {
        id: 'user_2_id',
        name: {
            label: 'Tarrif 2',
            link: `/admin/tarrifs/${encodeURIComponent('tarrif 2')}`
        },
        tarrifType: 'Unit + Fixed Charges',
        project: {
            label: 'Vardhaman',
            link: `/admin/projects/Vardhaman`
        },
        tarrifGroup: {
            label: 'VAR 1',
            link: `/admin/tarrifGroups/${encodeURIComponent('VAR 1')}`
        },
    },
    {
        id: 'user_3_id',
        name: {
            label: 'Tarrif 3',
            link: `/admin/tarrifs/${encodeURIComponent('tarrif 3')}`
        },
        tarrifType: 'Slab',
        project: {
            label: 'Vasundhara',
            link: `/admin/projects/Vasundhara`
        },
        tarrifGroup: {
            label: 'VAS 2',
            link: `/admin/tarrifGroups/${encodeURIComponent('VAS 2')}`
        },
    },
    {
        id: 'user_4_id',
        name: {
            label: 'Tarrif 4',
            link: `/admin/tarrifs/${encodeURIComponent('tarrif 4')}`
        },
        tarrifType: 'Slab + Fixed Charges',
        project: {
            label: 'Vardhaman',
            link: `/admin/projects/Vardhaman`
        },
        tarrifGroup: {
            label: 'VAR 2',
            link: `/admin/tarrifGroups/${encodeURIComponent('VAR 2')}`
        },
    },
    {
        id: 'user_5_id',
        name: {
            label: 'Tarrif 5',
            link: `/admin/tarrifs/${encodeURIComponent('tarrif 5')}`
        },
        tarrifType: 'Unit',
        project: {
            label: 'Vasundhara',
            link: `/admin/projects/Vasundhara`
        },
        tarrifGroup: {
            label: 'VAS 3',
            link: `/admin/tarrifGroups/${encodeURIComponent('VAS 3')}`
        },
    },
    {
        id: 'user_6_id',
        name: {
            label: 'Tarrif 6',
            link: `/admin/tarrifs/${encodeURIComponent('tarrif 6')}`
        },
        tarrifType: 'Unit + Fixed Charges',
        project: {
            label: 'Vardhaman',
            link: `/admin/projects/Vardhaman`
        },
        tarrifGroup: {
            label: 'VAR 3',
            link: `/admin/tarrifGroups/${encodeURIComponent('VAR 3')}`
        },
    },
    {
        id: 'user_7_id',
        name: {
            label: 'Tarrif 7',
            link: `/admin/tarrifs/${encodeURIComponent('tarrif 7')}`
        },
        tarrifType: 'Slab',
        project: {
            label: 'Vasundhara',
            link: `/admin/projects/Vasundhara`
        },
        tarrifGroup: {
            label: 'VAS 4',
            link: `/admin/tarrifGroups/${encodeURIComponent('VAS 4')}`
        },

    },
    {
        id: 'user_8_id',
        name: {
            label: 'Tarrif 8',
            link: `/admin/tarrifs/${encodeURIComponent('tarrif 8')}`
        },
        tarrifType: 'Slab + Fixed Charges',
        project: {
            label: 'Vardhaman',
            link: `/admin/projects/Vardhaman`
        },
        tarrifGroup: {
            label: 'VAR 4',
            link: `/admin/tarrifGroups/${encodeURIComponent('VAR 4')}`
        },
    },
    {
        id: 'user_9_id',
        name: {
            label: 'Tarrif 9',
            link: `/admin/tarrifs/${encodeURIComponent('tarrif 9')}`
        },
        tarrifType: 'Slab + Fixed Charges',
        project: {
            label: 'Vasundhara',
            link: `/admin/projects/Vasundhara`
        },
        tarrifGroup: {
            label: 'VAS 5',
            link: `/admin/tarrifGroups/${encodeURIComponent('VAS 5')}`
        },
    }
]

export const viewAllTarrifsTableMock = (filters: any) => {
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
            label: 'Tarrifs',
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
                            value: 'q',
                            description: "Quick Search"
                        }
                    ]
                },
                filterValue: {
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
                    "tarrifType",
                    "project",
                    "tarrifGroup",
                ],
                name: {
                    label: "Tarrif Name",
                    renderType: "link",
                },
                tarrifType: {
                    label: "Tarrif Type",
                    renderType: "text",
                },
                project: {
                    label: "Project",
                    renderType: "link"
                },
                tarrifGroup: {
                    label:"Tarrif Group",
                    renderType:"link",
                }
            }
        },
        data: {
            totalRecords: allRows.length,
            rows
        }
    }
}

const tarrifGroupRows = [
    {
        id: 'user_1_id',
        project: {
            label: 'Vasundhara',
            link: `/admin/projects/Vasundhara`
        },
        tarrifGroup: 'VAS 1'
    },
    {
        id: 'user_2_id',
        project: {
            label: 'Vardhaman',
            link: `/admin/projects/Vardhaman`
        },
        tarrifGroup: 'VAR 1'
    },
    {
        id: 'user_3_id',
        project: {
            label: 'Vasundhara',
            link: `/admin/projects/Vasundhara`
        },
        tarrifGroup: 'VAS 2'
    },
    {
        id: 'user_4_id',
        project: {
            label: 'Vardhaman',
            link: `/admin/projects/Vardhaman`
        },
        tarrifGroup: 'VAR 2'
    },
    {
        id: 'user_5_id',
        project: {
            label: 'Vasundhara',
            link: `/admin/projects/Vasundhara`
        },
        tarrifGroup: 'VAS 3'
    },
    {
        id: 'user_6_id',
        project: {
            label: 'Vardhaman',
            link: `/admin/projects/Vardhaman`
        },
        tarrifGroup: 'VAR 3'
    },
    {
        id: 'user_7_id',
        project: {
            label: 'Vasundhara',
            link: `/admin/projects/Vasundhara`
        },
        tarrifGroup: 'VAS 4'

    },
    {
        id: 'user_8_id',
        project: {
            label: 'Vardhaman',
            link: `/admin/projects/Vardhaman`
        },
        tarrifGroup: 'VAR 4'
    },
    {
        id: 'user_9_id',
        project: {
            label: 'Vasundhara',
            link: `/admin/projects/Vasundhara`
        },
        tarrifGroup: 'VAS 5'
    }
]

export const viewAllTarrifGroupsTableMock = (filters: any) => {
    const perPage = filters?.perPage ?? 5
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    let rows = []
    const allRows = [...tarrifGroupRows]
    if (startIndex > allRows.length) {
        startIndex = 0
    }
    if (endIndex > allRows.length) {
        endIndex = allRows.length
    }
    rows = allRows.slice(startIndex, endIndex)
    return {
        config: {
            label: 'Tarrif Groups',
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
                            value: 'q',
                            description: "Quick Search"
                        }
                    ]
                },
                filterValue: {
                    q: {
                        label: "Quick Search",
                        columnSize: 12,
                        inputType: "textInput"
                    }
                }
            },
            columns: {
                order: [
                    "tarrifGroup",
                    "project",
                ],
                project: {
                    label: "Project",
                    renderType: "link"
                },
                tarrifGroup: {
                    label:"Tarrif Group",
                    renderType:"text",
                }
            }
        },
        data: {
            totalRecords: allRows.length,
            rows
        }
    }
}

export const viewTarrifActionsMock = () => {
    return {
        config: {
            actions: {
                order: [
                    "addTarrifGroup",
                    "createTarrif",
                ],
                createTarrif: {
                    label: 'Create Tarrif',
                    fields: {
                        order: [
                            "tarrifName",
                            "tarrifDescription",
                            // "project",
                            "containsFixedCharges",
                        ],
                        tarrifName: {
                            label: "Tarrif Name",
                            columnSize: 6,
                            required: true,
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
                        },
                        project: {
                            label: "Project",
                            columnSize: 6,
                            inputType: "selectInput",
                            isAutocomplete: true,
                            required: true,
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
                                {
                                    value: 'project1',
                                    description: 'Project 1'
                                },
                                {
                                    value: 'project2',
                                    description: 'Project 2'
                                },

                            ]
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
                            inputType: "textInput",
                            required: true
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
                            required: true,
                            inputType: "selectInput",
                            selectOptions: [
                                {
                                    value: '',
                                    description: ''
                                },
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

export const viewTarrifDetailsMock = (id: any) => {
    return {
        config: {
            label: 'Tarrif Details',
            fields: {
                order: [
                    "name",
                    "tarrifType",
                    "project",
                    "tarrifGroup",
                ],
                name: {
                    label: "Tarrif Name",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                tarrifType: {
                    label: "Tarrif Type",
                    columnSize: 3,
                    inputType: "text",
                    isSingleLineInput: true,
                    maxLength: 10
                },
                project: {
                    label: "Project",
                    columnSize: 3,
                    inputType: "link",
                    maxLength: 10,
                    isSingleLineInput: true
                },
                tarrifGroup: {
                    label: "Tarrif Group",
                    columnSize: 3,
                    inputType: "text",
                    maxLength: 10,
                    isSingleLineInput: true
                }
            }
        },
        data: {
            name: id,
            tarrifType: 'Unit + Fixed Charges',
            tarrifGroup: 'VAR 1',
            project: {
                link: '/admin/projects/Vardhaman',
                value: 'Vardhaman'
            },
        }
    }
}