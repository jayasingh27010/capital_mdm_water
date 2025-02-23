"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
                "tarrifGroup",
                "tarrif",
                "tarrifGroupDescription",
                "project",
                "createdAt"
            ],
            project: {
                label: "Project",
                renderType: "link"
            },
            tarrifGroup: {
                label: "Tarrif Group",
                renderType: "text",
            },
            tarrifGroupDescription: {
                label: "Description",
                renderType: "text",
            },
            tarrif: {
                label: "Tarrif",
                renderType: "link",
            },
            createdAt: {
                label: "Created At",
                renderType: "text"
            }
        }
    },
    data: {
        totalRecords: 9,
        rows: [
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
            }
        ]
    }
};
