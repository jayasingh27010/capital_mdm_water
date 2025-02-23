"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
                "tarrifName",
                "tarrifType",
                "project",
                //"tarrifGroup",
                "createdAt"
            ],
            tarrifName: {
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
            // tarrifGroup: {
            //     label: "Tarrif Group",
            //     renderType: "text",
            // },
            createdAt: {
                label: "Created At",
                renderType: "text"
            }
        }
    },
    data: {
        totalRecords: 9,
        rows: []
    }
};
