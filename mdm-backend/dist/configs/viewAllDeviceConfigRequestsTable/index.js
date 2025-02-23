"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "label": "All Device Config Requests",
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
                        "value": "project",
                        "description": "Project"
                    },
                    {
                        "value": "startDate",
                        "description": "Start Date"
                    },
                    {
                        "value": "endDate",
                        "description": "End Date"
                    },
                    {
                        "value": "q",
                        "description": "Quick Search"
                    }
                ]
            },
            "filterValue": {
                "q": {
                    "label": "Quick Search",
                    "columnSize": 12,
                    "inputType": "textInput"
                },
                "project": {
                    "label": "Filter Value",
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
                "startDate": {
                    "label": "Filter Value",
                    "columnSize": 12,
                    "inputType": "dateInput"
                },
                "endDate": {
                    "label": "Filter Value",
                    "columnSize": 12,
                    "inputType": "dateInput"
                }
            }
        },
        "columns": {
            "order": [
                "meterSerialNo",
                "project",
                "actionName",
                "value",
                "status",
                "lastReportedTime",
            ],
            "meterSerialNo": {
                "label": "Meter Serial No",
                "renderType": "link"
            },
            "project": {
                "label": "Project",
                "renderType": "link",
            },
            "actionName": {
                "label": "Action",
                "renderType": "text"
            },
            "value": {
                "label": "Value",
                "renderType": "text"
            },
            "status": {
                "label": "Status",
                "renderType": "text"
            },
            "lastReportedTime": {
                "label": "Last Reported Time",
                "renderType": "text"
            }
        }
    },
    "data": {
        "totalRecords": 9,
        "rows": []
    }
};
