export default {
    config: {
        label: 'Attach Tariff History',
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
                    },
                    {
                        "value": "project",
                        "description": "Project"
                    },
                ]
            },
            filterValue: {
                q: {
                    label: "Quick Search",
                    columnSize: 12,
                    inputType: "textInput"
                },
                project: {
                    label: "Filter Value",
                    columnSize: 12,
                    inputType: "selectInput",
                    isAutocomplete: true,
                    selectOptions: [
                        {
                            value: '',
                            description: ''
                        }
                    ]
                },
            }
        },
        columns: {
            order: [
                "tariffGroup",                
                "attachment",
                // "project",
                "status",
                "tariff",
                "applicableDate"
                
            ],
            tariffGroup: {
                label: "Tariff Group",
                renderType: "text"
            },
            attachment: {
                label: "Attachment",
                renderType: "text",
            },
            // project: {
            //     label: "Project",
            //     renderType: "link",
            // },
            status: {
                label: "Status",
                renderType: "text",
            },
            tariff: {
                label: "Tariff",
                renderType: "text"
            },
            applicableDate:{
                label: "Applicable Date",
                renderType: "text",
            }
          
        }
    },
    data: {
        totalRecords: 9,
        rows: [
            {
                id: 'user_1_id',
                tariff: {
                    label: 'Vasundhara',
                    link: `/admin/projects/Vasundhara`
                },
                attachment: 'VAS 1',
                project: {
                    label: 'Vardhaman',
                    link: `/admin/projects/Vardhaman`
                },
                status: 'VAR 1',
                tariffGroup: {
                    label: 'Vardhaman',
                    link: `/admin/projects/Vardhaman`
                },
                applicableDate:"2025-01-15 17:14"
            },
            {
                id: 'user_2_id',
                tariff: {
                    label: 'Vasundhara',
                    link: `/admin/projects/Vasundhara`
                },
                attachment: 'VAS 1',
                project: {
                    label: 'Vardhaman',
                    link: `/admin/projects/Vardhaman`
                },
                status: 'VAR 1',
                tariffGroup: {
                    label: 'Vardhaman',
                    link: `/admin/projects/Vardhaman`
                },
                applicableDate:"2025-01-15 17:14"
            },
            {
                id: 'user_3_id',
                tariff: {
                    label: 'Vasundhara',
                    link: `/admin/projects/Vasundhara`
                },
                attachment: 'VAS 1',
                project: {
                    label: 'Vardhaman',
                    link: `/admin/projects/Vardhaman`
                },
                status: 'VAR 1',
                tariffGroup: {
                    label: 'Vardhaman',
                    link: `/admin/projects/Vardhaman`
                },
                applicableDate:"2025-01-15 17:14"
            },
            {
                id: 'user_4_id',
                tariff: {
                    label: 'Vasundhara',
                    link: `/admin/projects/Vasundhara`
                },
                attachment: 'VAS 1',
                project: {
                    label: 'Vardhaman',
                    link: `/admin/projects/Vardhaman`
                },
                status: 'VAR 1',
                tariffGroup: {
                    label: 'Vardhaman',
                    link: `/admin/projects/Vardhaman`
                },
                applicableDate:"2025-01-15 17:14"
            },
            {
                id: 'user_5_id',
                tariff: {
                    label: 'Vasundhara',
                    link: `/admin/projects/Vasundhara`
                },
                attachment: 'VAS 1',
                project: {
                    label: 'Vardhaman',
                    link: `/admin/projects/Vardhaman`
                },
                status: 'VAR 1',
                tariffGroup: {
                    label: 'Vardhaman',
                    link: `/admin/projects/Vardhaman`
                },
                applicableDate:"2025-01-15 17:14"
            }
        ]
    }
}