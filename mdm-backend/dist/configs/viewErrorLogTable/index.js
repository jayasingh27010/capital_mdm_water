"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "label": "Error Log",
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
                        }
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
                "meterSerialNo",
                "errorType",
                "errorMsg",
                "time"
            ],
            "meterSerialNo": {
                "label": "Meter",
                "renderType": "text"
            },
            "errorType": {
                "label": "Error Type",
                "renderType": "text"
            },
            "errorMsg": {
                "label": "Error Message",
                "renderType": "text"
            },
            "time": {
                "label": "Time",
                "renderType": "text"
            }
        },
        "errorMappings": {
            "C-1": "Error Message For Code 1"
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
