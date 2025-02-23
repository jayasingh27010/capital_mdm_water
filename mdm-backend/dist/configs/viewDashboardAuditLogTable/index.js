"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "label": "Audit Log",
        "defaultFilters": {
            "currPage": 1,
            "perPage": 5
        },
        "filterConfig": {
            "filterType": {
                "label": "Filter Type",
                "columnSize": 12,
                "inputType": "selectInput",
                "selectOptions": [
                    {
                        "value": "-",
                        "description": "-"
                    },
                    {
                        "value": "q",
                        "description": "Quick Search"
                    },
                    {
                        "value": "project",
                        "description": "Project"
                    },
                    {
                        value: "startDate",
                        description: "Start Date",
                    },
                    {
                        value: "endDate",
                        description: "End Date",
                    },
                ]
            },
            "filterValue": {
                "project": {
                    "label": "Project",
                    "columnSize": 12,
                    "isAutocomplete": true,
                    "inputType": "selectInput",
                    "selectOptions": [
                        {
                            "value": "-",
                            "description": "-"
                        },
                    ]
                },
                "q": {
                    "label": "Quick Search",
                    "columnSize": 12,
                    "inputType": "textInput"
                },
                startDate: {
                    label: "Filter Value",
                    columnSize: 12,
                    inputType: "dateInput",
                },
                endDate: {
                    label: "Filter Value",
                    columnSize: 12,
                    inputType: "dateInput",
                },
            }
        },
        "columns": {
            "order": [
                "user",
                "module",
                "moduleAction",
                "time"
            ],
            "user": {
                "label": "User",
                "renderType": "link"
            },
            "module": {
                "label": "Module",
                "renderType": "text"
            },
            "moduleAction": {
                "label": "Action",
                "renderType": "text"
            },
            "activity": {
                "label": "activity",
                "renderType": "text"
            },
            "time": {
                "label": "Time",
                "renderType": "text"
            }
        }
    },
    "data": {
        "totalRecords": 9,
        "rows": [
            {
                "id": "user_1_id",
                "user": {
                    "label": "Diganta",
                    "link": "/admin/users/diganta"
                },
                "activity": "View Profile",
                "time": "2mins ago"
            },
            {
                "id": "user_2_id",
                "user": {
                    "label": "Harsh",
                    "link": "/admin/users/harsh"
                },
                "activity": "View Profile",
                "time": "2mins ago"
            },
            {
                "id": "user_3_id",
                "user": {
                    "label": "Diganta",
                    "link": "/admin/users/diganta"
                },
                "activity": "View Profile",
                "time": "2mins ago"
            },
            {
                "id": "user_4_id",
                "user": {
                    "label": "Diganta",
                    "link": "/admin/users/diganta"
                },
                "activity": "View Profile",
                "time": "2mins ago"
            },
            {
                "id": "user_5_id",
                "user": {
                    "label": "Diganta",
                    "link": "/admin/users/diganta"
                },
                "activity": "View Profile",
                "time": "2mins ago"
            }
        ]
    }
};
